import * as http from "node:http";
import * as https from "node:https";
import * as http2 from "node:http2";
import * as tls from "node:tls";
import * as zlib from "node:zlib";
import type { Duplex } from "node:stream";

export type Http2ProxySession = {
  readonly targetOrigin: string;
  readonly proxyUrl: string;
  readonly session: http2.ClientHttp2Session;
  readonly socket: tls.TLSSocket;
  closed: boolean;
};

export type Http2ProxyResponse = {
  status: number;
  headers: Record<string, string | string[]>;
  body: Buffer;
};

type RequestOptions = {
  url: string;
  method: string;
  headers: Record<string, string | string[] | undefined>;
  body?: string | Buffer;
  proxyUrl: string;
  timeoutMs?: number;
  session?: Http2ProxySession;
  followRedirects?: boolean;
};

const DEFAULT_TIMEOUT_MS = 30_000;
const MAX_REDIRECTS = 5;
const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-connection",
  "transfer-encoding",
  "upgrade",
  "host",
]);
const SENSITIVE_HEADERS = new Set([
  "authorization",
  "cookie",
  "proxy-authorization",
  "x-csrftoken",
]);

function parseProxyUrl(proxyUrl: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(proxyUrl);
  } catch {
    throw new Error("HTTP/2 transport requires a fully qualified HTTP proxy URL");
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(`HTTP/2 transport does not support proxy protocol ${parsed.protocol}`);
  }
  if (!parsed.hostname) throw new Error("HTTP proxy URL is missing a hostname");
  return parsed;
}

function proxyAuthorization(proxy: URL): string | undefined {
  if (!proxy.username && !proxy.password) return undefined;
  const username = decodeURIComponent(proxy.username);
  const password = decodeURIComponent(proxy.password);
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

function openConnectTunnel(
  proxyUrl: string,
  targetHost: string,
  targetPort: number,
  timeoutMs: number,
): Promise<Duplex> {
  const proxy = parseProxyUrl(proxyUrl);
  const isTlsProxy = proxy.protocol === "https:";
  const transport = isTlsProxy ? https : http;
  const auth = proxyAuthorization(proxy);
  const targetAuthority = `${targetHost}:${targetPort}`;

  return new Promise((resolve, reject) => {
    let settled = false;
    const request = transport.request({
      hostname: proxy.hostname,
      port: Number(proxy.port || (isTlsProxy ? 443 : 80)),
      method: "CONNECT",
      path: targetAuthority,
      headers: {
        Host: targetAuthority,
        ...(auth ? { "Proxy-Authorization": auth } : {}),
      },
      ...(isTlsProxy ? { rejectUnauthorized: false, servername: proxy.hostname } : {}),
    });

    const timer = setTimeout(
      () => request.destroy(new Error("proxy_connect_timeout")),
      timeoutMs,
    );
    const finish = (error?: Error, socket?: Duplex) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      request.removeAllListeners("connect");
      request.removeAllListeners("response");
      request.removeAllListeners("error");
      if (error) reject(error);
      else if (socket) resolve(socket);
      else reject(new Error("proxy CONNECT completed without a tunnel socket"));
    };

    request.once("connect", (response, socket, head) => {
      if (response.statusCode !== 200) {
        response.resume();
        socket.destroy();
        finish(new Error(`proxy_connect_http_${response.statusCode ?? 0}`));
        return;
      }
      if (head.length) socket.unshift(head);
      finish(undefined, socket);
    });
    request.once("response", (response) => {
      response.resume();
      finish(new Error(`proxy_connect_rejected_http_${response.statusCode ?? 0}`));
    });
    request.once("error", (error) => finish(error));
    request.end();
  });
}

function waitForSocketSecure(socket: tls.TLSSocket, timeoutMs: number): Promise<void> {
  return new Promise((resolve, reject) => {
    if (socket.alpnProtocol) {
      resolve();
      return;
    }
    const timer = setTimeout(() => {
      socket.destroy(new Error("target_tls_timeout"));
    }, timeoutMs);
    const cleanup = () => {
      clearTimeout(timer);
      socket.removeListener("secureConnect", onSecure);
      socket.removeListener("error", onError);
    };
    const onSecure = () => {
      cleanup();
      resolve();
    };
    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };
    socket.once("secureConnect", onSecure);
    socket.once("error", onError);
  });
}

function waitForHttp2Connect(
  session: http2.ClientHttp2Session,
  timeoutMs: number,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      session.destroy(new Error("http2_session_timeout"));
    }, timeoutMs);
    const cleanup = () => {
      clearTimeout(timer);
      session.removeListener("connect", onConnect);
      session.removeListener("error", onError);
    };
    const onConnect = () => {
      cleanup();
      resolve();
    };
    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };
    session.once("connect", onConnect);
    session.once("error", onError);
  });
}

export async function createHttp2ProxySession(
  targetUrl: string,
  proxyUrl: string,
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<Http2ProxySession> {
  const target = new URL(targetUrl);
  if (target.protocol !== "https:") {
    throw new Error("HTTP/2 proxy transport only supports HTTPS target URLs");
  }
  const targetPort = Number(target.port || 443);
  let tunnel: Duplex | undefined;
  let socket: tls.TLSSocket | undefined;
  let session: http2.ClientHttp2Session | undefined;

  try {
    tunnel = await openConnectTunnel(proxyUrl, target.hostname, targetPort, timeoutMs);
    socket = tls.connect({
      socket: tunnel,
      servername: target.hostname,
      ALPNProtocols: ["h2"],
      // Existing proxy paths permit inspection certificates. Keep that behavior
      // while using Node's default TLS implementation and protocol negotiation.
      rejectUnauthorized: false,
    });
    await waitForSocketSecure(socket, timeoutMs);
    if (socket.alpnProtocol !== "h2") {
      throw new Error(`HTTP/2 was not negotiated (ALPN=${socket.alpnProtocol || "none"})`);
    }

    session = http2.connect(target.origin, {
      createConnection: () => socket as tls.TLSSocket,
      settings: { enablePush: false },
    });
    // Requests attach their own error handlers; this listener also prevents a
    // late connection error from becoming an unhandled EventEmitter error.
    session.on("error", () => {});
    await waitForHttp2Connect(session, timeoutMs);
    return {
      targetOrigin: target.origin,
      proxyUrl,
      session,
      socket,
      closed: false,
    };
  } catch (error) {
    session?.destroy();
    socket?.destroy();
    tunnel?.destroy();
    throw error;
  }
}

export async function closeHttp2ProxySession(
  handle: Http2ProxySession | undefined,
): Promise<void> {
  if (!handle || handle.closed) return;
  handle.closed = true;
  if (handle.session.closed || handle.session.destroyed) return;
  await new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      handle.session.destroy();
      resolve();
    }, 1_500);
    handle.session.once("close", () => {
      clearTimeout(timer);
      resolve();
    });
    handle.session.close();
  });
}

function normalizedResponseHeaders(
  headers: http2.IncomingHttpHeaders,
): Record<string, string | string[]> {
  const normalized: Record<string, string | string[]> = {};
  for (const [name, value] of Object.entries(headers)) {
    if (name.startsWith(":") || value == null) continue;
    if (Array.isArray(value)) normalized[name] = value.map(String);
    else if (typeof value === "string" || typeof value === "number") normalized[name] = String(value);
  }
  return normalized;
}

function responseBodyBytes(body: Buffer, headers: Record<string, string | string[]>): Buffer {
  const rawEncoding = headers["content-encoding"];
  const encoding = (Array.isArray(rawEncoding) ? rawEncoding[0] : rawEncoding)
    ?.split(",")[0]
    .trim()
    .toLowerCase();
  try {
    if (encoding === "gzip") return zlib.gunzipSync(body);
    if (encoding === "deflate") {
      try {
        return zlib.inflateSync(body);
      } catch {
        return zlib.inflateRawSync(body);
      }
    }
    if (encoding === "br") return zlib.brotliDecompressSync(body);
  } catch {
    // Preserve the wire bytes if a server sends malformed compressed content;
    // higher-level JSON parsing will then report the response as non-JSON.
  }
  return body;
}

function makeRequestHeaders(
  url: URL,
  method: string,
  inputHeaders: RequestOptions["headers"],
  body: Buffer,
): http2.OutgoingHttpHeaders {
  const headers: http2.OutgoingHttpHeaders = {
    ":method": method.toUpperCase(),
    ":scheme": "https",
    ":authority": url.host,
    ":path": `${url.pathname}${url.search}`,
  };

  for (const [name, rawValue] of Object.entries(inputHeaders)) {
    if (rawValue == null) continue;
    const normalizedName = name.toLowerCase();
    if (normalizedName.startsWith(":") || HOP_BY_HOP_HEADERS.has(normalizedName)) continue;
    if (normalizedName === "te" && String(rawValue).toLowerCase() !== "trailers") continue;
    headers[normalizedName] = rawValue;
  }

  if (!headers["accept-encoding"]) headers["accept-encoding"] = "gzip, deflate, br";
  if (body.length > 0) headers["content-length"] = String(body.length);
  else delete headers["content-length"];
  return headers;
}

function requestOnSession(
  handle: Http2ProxySession,
  url: URL,
  method: string,
  inputHeaders: RequestOptions["headers"],
  body: Buffer,
  timeoutMs: number,
): Promise<Http2ProxyResponse> {
  return new Promise((resolve, reject) => {
    if (handle.closed || handle.session.closed || handle.session.destroyed) {
      reject(new Error("HTTP/2 proxy session is closed"));
      return;
    }

    let status = 0;
    let responseHeaders: Record<string, string | string[]> = {};
    const chunks: Buffer[] = [];
    let settled = false;
    const stream = handle.session.request(
      makeRequestHeaders(url, method, inputHeaders, body),
    );
    const timer = setTimeout(() => {
      stream.close(http2.constants.NGHTTP2_CANCEL);
      finish(new Error("request_timeout"));
    }, timeoutMs);
    const finish = (error?: Error, response?: Http2ProxyResponse) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      handle.session.removeListener("error", onSessionError);
      if (error) reject(error);
      else if (response) resolve(response);
      else reject(new Error("HTTP/2 request ended without a response"));
    };
    const onSessionError = (error: Error) => finish(error);
    handle.session.once("error", onSessionError);

    stream.once("response", (headers) => {
      status = Number(headers[":status"] ?? 0);
      responseHeaders = normalizedResponseHeaders(headers);
    });
    stream.on("data", (chunk: Buffer | string) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    stream.once("error", (error) => finish(error));
    stream.once("end", () => {
      const raw = Buffer.concat(chunks);
      finish(undefined, {
        status,
        headers: responseHeaders,
        body: responseBodyBytes(raw, responseHeaders),
      });
    });
    // Node can implicitly end bodyless GET/HEAD request streams as it writes
    // the initial headers. Do not call end(Buffer.alloc(0)) a second time.
    if (!stream.writableEnded) {
      if (body.length > 0) stream.end(body);
      else stream.end();
    }
  });
}

function headerString(
  headers: Record<string, string | string[]>,
  name: string,
): string | undefined {
  const value = headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

export async function requestHttp2ThroughProxy(
  options: RequestOptions,
): Promise<Http2ProxyResponse> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  let currentUrl = new URL(options.url);
  if (currentUrl.protocol !== "https:") {
    throw new Error("HTTP/2 proxy transport only supports HTTPS target URLs");
  }
  const headers = { ...options.headers };
  let method = options.method.toUpperCase();
  let body = options.body == null
    ? Buffer.alloc(0)
    : Buffer.isBuffer(options.body)
      ? options.body
      : Buffer.from(options.body, "utf8");
  const ownedSessions = new Set<Http2ProxySession>();

  try {
    for (let redirectCount = 0; ; redirectCount++) {
      let handle: Http2ProxySession | undefined;
      if (
        options.session &&
        options.session.proxyUrl === options.proxyUrl &&
        options.session.targetOrigin === currentUrl.origin &&
        !options.session.closed
      ) {
        handle = options.session;
      } else {
        handle = await createHttp2ProxySession(currentUrl.href, options.proxyUrl, timeoutMs);
        ownedSessions.add(handle);
      }

      const response = await requestOnSession(
        handle,
        currentUrl,
        method,
        headers,
        body,
        timeoutMs,
      );
      const location = headerString(response.headers, "location");
      if (
        !options.followRedirects ||
        !location ||
        ![301, 302, 303, 307, 308].includes(response.status) ||
        redirectCount >= MAX_REDIRECTS
      ) {
        return response;
      }

      let nextUrl: URL;
      try {
        nextUrl = new URL(location, currentUrl);
      } catch {
        return response;
      }
      if (nextUrl.protocol !== "https:") return response;
      if (nextUrl.origin !== currentUrl.origin) {
        for (const name of Object.keys(headers)) {
          if (SENSITIVE_HEADERS.has(name.toLowerCase())) delete headers[name];
        }
      }

      if (
        response.status === 303 ||
        ((response.status === 301 || response.status === 302) && method === "POST")
      ) {
        method = "GET";
        body = Buffer.alloc(0);
        for (const name of Object.keys(headers)) {
          if (name.toLowerCase() === "content-length" || name.toLowerCase() === "content-type") {
            delete headers[name];
          }
        }
      }
      currentUrl = nextUrl;
    }
  } finally {
    await Promise.all([...ownedSessions].map(closeHttp2ProxySession));
  }
}