import { IgNetworkError } from "instagram-private-api";
import type { IgApiClient } from "instagram-private-api";
import {
  requestHttp2ThroughProxy,
  type Http2ProxySession,
} from "./http2ProxyTransport.js";

/**
 * Parse Instagram JSON without rounding unsafe integer literals such as media
 * and user IDs. Native JSON.parse converts those values to imprecise Numbers;
 * quote only out-of-range integer tokens before parsing so callers can keep
 * using String(id) without losing digits.
 */
export function parseInstagramJson(rawBody: string): any {
  let output = "";
  let inString = false;
  let escaped = false;
  const maxSafeInteger = BigInt(Number.MAX_SAFE_INTEGER);

  for (let i = 0; i < rawBody.length;) {
    const char = rawBody[i];

    if (inString) {
      output += char;
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === "\"") inString = false;
      i++;
      continue;
    }

    if (char === "\"") {
      inString = true;
      output += char;
      i++;
      continue;
    }

    if (char === "-" || (char >= "0" && char <= "9")) {
      const start = i;
      if (rawBody[i] === "-") i++;

      if (rawBody[i] === "0") {
        i++;
      } else if (rawBody[i] >= "1" && rawBody[i] <= "9") {
        while (rawBody[i] >= "0" && rawBody[i] <= "9") i++;
      } else {
        output += rawBody[start];
        i = start + 1;
        continue;
      }

      if (rawBody[i] === ".") {
        i++;
        while (rawBody[i] >= "0" && rawBody[i] <= "9") i++;
      }
      if (rawBody[i] === "e" || rawBody[i] === "E") {
        i++;
        if (rawBody[i] === "+" || rawBody[i] === "-") i++;
        while (rawBody[i] >= "0" && rawBody[i] <= "9") i++;
      }

      const token = rawBody.slice(start, i);
      if (/^-?(?:0|[1-9]\d*)$/.test(token)) {
        const integer = BigInt(token);
        output += integer > maxSafeInteger || integer < -maxSafeInteger
          ? JSON.stringify(token)
          : token;
      } else {
        output += token;
      }
      continue;
    }

    output += char;
    i++;
  }

  return JSON.parse(output);
}

function proxyHost(proxyUrl: string): string {
  try {
    return new URL(proxyUrl).hostname;
  } catch {
    return "unknown";
  }
}

function responseCookies(headers: Record<string, string | string[]>): string[] {
  const raw = headers["set-cookie"];
  const values = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return values.map((cookie) => cookie.split(";")[0]);
}

function headerValue(
  headers: Record<string, string | string[]>,
  name: string,
): string | undefined {
  const value = headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

function getCookieString(options: any, url: string): string {
  if (!options.jar) return "";
  try {
    const innerJar = options.jar["_jar"];
    if (innerJar?.getCookiesSync) {
      return (innerJar.getCookiesSync(url) as any[])
        .map((cookie: any) => `${cookie.key}=${cookie.value}`)
        .join("; ");
    }
    if (typeof options.jar.getCookieStringSync === "function") {
      return options.jar.getCookieStringSync(url) ?? "";
    }
  } catch {
    // The SDK can still provide a Cookie header in options.headers.
  }
  return "";
}

function parseJsonOrRaw(rawBody: string): any {
  try {
    return parseInstagramJson(rawBody);
  } catch {
    return null;
  }
}

function logGenericFailure(
  label: string,
  method: string,
  path: string,
  status: number,
  json: any,
  body: string,
  cookieStr: string,
): void {
  if (
    status !== 200 ||
    !json ||
    typeof json !== "object" ||
    json.status !== "fail" ||
    ("spam" in json) ||
    ("feedback_required" in json) ||
    !/something went wrong|sorry/i.test(String(json.message ?? ""))
  ) {
    return;
  }

  const cookieCsrf = cookieStr.match(/csrftoken=([^;]+)/)?.[1];
  let signedCsrf: string | undefined;
  let signedUuid: string | undefined;
  const match = body.match(/signed_body=([^&]+)/);
  if (match) {
    const raw = match[1];
    const dotIndex = raw.indexOf(".");
    const jsonPart = dotIndex === -1 ? raw : raw.slice(dotIndex + 1);
    try {
      const payload = JSON.parse(jsonPart);
      signedCsrf = payload._csrftoken;
      signedUuid = payload._uuid;
    } catch {
      // Some signed bodies are percent-encoded; avoid logging the full payload.
    }
  }
  const csrfMismatch = signedCsrf != null && cookieCsrf != null && signedCsrf !== cookieCsrf;
  console.warn(
    `[${label}][DIAG] ${method} ${path} — generic rejection (HTTP 200, status:fail). ` +
    `cookie_csrf=${cookieCsrf ?? "MISSING"} signed_csrf=${signedCsrf ?? "n/a"} ` +
    `csrf_MISMATCH=${csrfMismatch} uuid=${signedUuid ?? "n/a"} ` +
    `req_body_preview=${body.slice(0, 300)}`,
  );
  if (csrfMismatch) {
    console.error(
      `[${label}][DIAG] CSRF token mismatch: signed body and Cookie header carry different values.`,
    );
  }
}

/**
 * Sends an Instagram API request through a configured HTTP proxy using
 * Node's standard TLS implementation and HTTP/2. No custom TLS fingerprint
 * is supplied. A missing proxy always fails closed.
 */
export async function tlsRequest(opts: {
  host?: string;
  path: string;
  method: "GET" | "POST";
  headers: Record<string, string>;
  body?: string;
  cookieJar?: string[];
  proxyUrl?: string;
  sessionOverride?: Http2ProxySession;
}): Promise<{
  status: number;
  cookies: string[];
  json: any;
  rawBody: string;
  responseHeaders: Record<string, string | string[] | undefined>;
}> {
  const {
    host = "www.instagram.com",
    path,
    method,
    headers,
    body,
    cookieJar = [],
    proxyUrl,
    sessionOverride,
  } = opts;
  if (!proxyUrl) {
    throw new Error(
      `[IP-LEAK BLOCKED] TLS request ${method} ${path} refused — no proxy configured. ` +
      "Assign a proxy to this account before performing any actions.",
    );
  }

  const url = new URL(path, `https://${host}`);
  const cookieStr = cookieJar.join("; ");
  const allHeaders: Record<string, string> = {
    ...headers,
    ...(cookieStr ? { Cookie: cookieStr } : {}),
  };
  const startedAt = Date.now();
  const isFriendshipCall = path.includes("/friendships/");
  try {
    const response = await requestHttp2ThroughProxy({
      url: url.href,
      method,
      headers: allHeaders,
      body: body ?? "",
      proxyUrl,
      timeoutMs: 30_000,
      session: sessionOverride,
      followRedirects: true,
    });
    const rawBody = response.body.toString("utf8");
    const json = parseJsonOrRaw(rawBody);
    const cookies = responseCookies(response.headers);
    if (Date.now() - startedAt > 10_000) {
      console.warn(
        `[tls:req] ${method} ${host}${path} SLOW ${Date.now() - startedAt}ms ` +
        `via proxy=${proxyHost(proxyUrl)} status=${response.status}`,
      );
    }
    if (isFriendshipCall) {
      console.warn(
        `[tls:WIRE] ${method} ${url.href} → HTTP ${response.status} ` +
        `elapsed=${Date.now() - startedAt}ms protocol=h2`,
      );
    }
    logGenericFailure("tls:req", method, path, response.status, json, body ?? "", cookieStr);
    return {
      status: response.status,
      cookies,
      json,
      rawBody,
      responseHeaders: response.headers,
    };
  } catch (error: any) {
    console.error(
      `[tls:req] ${method} ${host}${path} FAILED after ${Date.now() - startedAt}ms ` +
      `via proxy=${proxyHost(proxyUrl)} err=${error?.message ?? error}`,
    );
    throw error;
  }
}

/**
 * Patches a freshly-created IgApiClient so its requests use the same ordinary
 * TLS + HTTP/2 proxy transport as direct mobile API calls.
 */
export function patchIgClientTls(
  ig: IgApiClient,
  proxyUrl: string | undefined,
  sessionOverride?: Http2ProxySession,
): void {
  if (!proxyUrl) return;
  const requestObject = ig.request as any;

  requestObject.faultTolerantRequest = async function (options: any) {
    const baseUrl: string = options.baseUrl ?? "https://i.instagram.com/";
    const rawUrl: string = options.url ?? options.uri ?? "";
    let fullUrl: string;
    try {
      fullUrl = rawUrl.startsWith("http") ? rawUrl : new URL(rawUrl, baseUrl).toString();
    } catch {
      fullUrl = baseUrl.replace(/\/$/, "") + rawUrl;
    }
    if (options.qs && typeof options.qs === "object" && Object.keys(options.qs).length > 0) {
      const params = new URLSearchParams(
        Object.entries(options.qs as Record<string, any>)
          .filter(([, value]) => value != null)
          .map(([key, value]) => [key, String(value)]),
      );
      fullUrl += (fullUrl.includes("?") ? "&" : "?") + params.toString();
    }

    const cookieStr = getCookieString(options, fullUrl);
    const headers: Record<string, string> = {};
    if (options.headers) {
      for (const [key, value] of Object.entries(options.headers as Record<string, any>)) {
        if (value != null) headers[key] = String(value);
      }
    }
    if (cookieStr) headers.Cookie = cookieStr;

    const method = String(options.method ?? "GET").toUpperCase();
    let body = "";
    if (method !== "GET" && options.form && typeof options.form === "object") {
      // Preserve the signed_body bytes exactly; URLSearchParams would encode
      // the raw signed JSON and invalidate Instagram's signature.
      body = Object.entries(options.form as Record<string, any>)
        .filter(([, value]) => value != null)
        .map(([key, value]) => `${key}=${String(value)}`)
        .join("&");
      headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
    } else if (options.body) {
      body = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
    }

    const startedAt = Date.now();
    let response;
    try {
      response = await requestHttp2ThroughProxy({
        url: fullUrl,
        method,
        headers,
        body,
        proxyUrl,
        timeoutMs: 30_000,
        session: sessionOverride,
        followRedirects: true,
      });
    } catch (error: any) {
      console.error(
        `[tls:ig] ${method} ${rawUrl} FAILED after ${Date.now() - startedAt}ms ` +
        `err=${error?.message ?? error}`,
      );
      throw new IgNetworkError(error);
    }
    if (Date.now() - startedAt > 10_000) {
      console.warn(
        `[tls:ig] ${method} ${rawUrl} SLOW ${Date.now() - startedAt}ms status=${response.status}`,
      );
    }

    const setCookies = response.headers["set-cookie"];
    const cookieValues = Array.isArray(setCookies) ? setCookies : setCookies ? [setCookies] : [];
    if (options.jar) {
      try {
        const innerJar = options.jar["_jar"];
        if (innerJar?.setCookieSync) {
          for (const cookie of cookieValues) {
            try {
              innerJar.setCookieSync(cookie, fullUrl, {});
            } catch {
              // Ignore an invalid individual cookie, matching the old adapter.
            }
          }
        }
      } catch {
        // The request result remains usable even if the SDK cookie jar rejects a cookie.
      }
    }

    const getResponseHeader = (name: string): string | string[] | undefined =>
      response.headers[name.toLowerCase()];
    const firstHeader = (name: string): string | undefined => {
      const value = getResponseHeader(name);
      return Array.isArray(value) ? value[0] : value;
    };

    const authorization = firstHeader("ig-set-authorization");
    if (authorization && !authorization.endsWith(":") && /^(?:Bearer )?IGT:2:/i.test(authorization)) {
      (ig.state as any).authorization = authorization;
    }
    const claim = firstHeader("ig-set-www-claim");
    if (claim && claim !== "0") (ig.state as any).igWWWClaim = claim;
    const passwordKeyId = firstHeader("ig-set-password-encryption-key-id");
    if (passwordKeyId) (ig.state as any).passwordEncryptionKeyId = passwordKeyId;
    const passwordPublicKey = firstHeader("ig-set-password-encryption-pub-key");
    if (passwordPublicKey) (ig.state as any).passwordEncryptionPubKey = passwordPublicKey;

    const rawBody = response.body.toString("utf8");
    const parsedBody = parseJsonOrRaw(rawBody) ?? rawBody;
    logGenericFailure("tls:ig", method, rawUrl, response.status, parsedBody, body, cookieStr);

    return {
      statusCode: response.status,
      headers: response.headers,
      body: parsedBody,
      request: {
        method,
        uri: {
          path: (() => {
            try {
              const parsed = new URL(fullUrl);
              return parsed.pathname + parsed.search;
            } catch {
              return rawUrl;
            }
          })(),
        },
      },
    };
  };
}

/**
 * Sends binary multipart or rupload payloads without text conversion, through
 * the same standard TLS + HTTP/2 proxy transport.
 */
export async function tlsMultipartPost(
  host: string,
  path: string,
  headers: Record<string, string>,
  body: Buffer,
  proxyUrl: string | undefined,
  sessionOverride?: Http2ProxySession,
): Promise<{ json: any; cookies: string[] }> {
  if (!proxyUrl) {
    throw new Error(
      `[IP-LEAK BLOCKED] TLS multipart POST ${host}${path} refused — no proxy configured.`,
    );
  }
  try {
    const response = await requestHttp2ThroughProxy({
      url: new URL(path, `https://${host}`).href,
      method: "POST",
      headers,
      body,
      proxyUrl,
      timeoutMs: 90_000,
      session: sessionOverride,
      followRedirects: true,
    });
    const rawBody = response.body.toString("utf8");
    const json = parseJsonOrRaw(rawBody);
    const rawCookies = response.headers["set-cookie"];
    const cookies = Array.isArray(rawCookies) ? rawCookies : rawCookies ? [rawCookies] : [];
    if (json === null) {
      const preview = rawBody.slice(0, 400).replace(/[\r\n]+/g, " ").trim();
      console.warn(
        `[tls:multipart] POST ${host}${path} status=${response.status} — non-JSON response: ${preview}`,
      );
    }
    return { json, cookies };
  } catch (error: any) {
    console.error(`[tls:multipart] POST ${host}${path} FAILED — err=${error?.message ?? error}`);
    throw error;
  }
}

export type { Http2ProxySession } from "./http2ProxyTransport.js";
export { createHttp2ProxySession, closeHttp2ProxySession } from "./http2ProxyTransport.js";