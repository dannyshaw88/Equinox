const STORAGE_KEY      = "equinox_ipLoginEvents_v1";
const PRUNE_MS         = 30 * 24 * 60 * 60 * 1000; // keep 30 days so we can check "established" status
const WINDOW_MS        = 60 * 60 * 1000;             // one browser login and one API login per IP per hour

interface LoginEvent {
  proxyKey: string;
  ts: number;
  profileId?: number;
  source?: "browser" | "api";
}

function makeKey(host: string, port?: number | null): string {
  return port ? `${host}:${port}` : host;
}

function readAll(): LoginEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr    = JSON.parse(raw) as LoginEvent[];
    const cutoff = Date.now() - PRUNE_MS;
    return arr.filter(e => e.ts > cutoff);
  } catch {
    return [];
  }
}

function writeAll(events: LoginEvent[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {}
}

export function recordLoginEvent(
  host: string | null | undefined,
  port?: number | null,
  profileId?: number,
  source: "browser" | "api" = "api",
): void {
  if (!host) return;
  const now = Date.now();
  const proxyKey = makeKey(host, port);
  const events = readAll();
  // Browser and API logins are separate IP-budget events.  Only deduplicate
  // repeated reports from the same source for the same account.
  if (
    profileId != null &&
    events.some(event =>
      event.proxyKey === proxyKey &&
      event.profileId === profileId &&
      event.source === source &&
      event.ts > now - WINDOW_MS
    )
  ) {
    return;
  }
  events.push({ proxyKey, ts: now, profileId, source });
  writeAll(events);
}

export interface LoginRateLimitWarning {
  browserMinutesAgo: number | null;
  apiMinutesAgo: number | null;
}

/** Return the recent per-source login activity for this IP. */
export function getLoginRateLimitWarning(
  host: string | null | undefined,
  port: number | null | undefined,
): LoginRateLimitWarning | null {
  if (!host) return null;
  const now = Date.now();
  const recent = readAll().filter(e => e.proxyKey === makeKey(host, port) && e.ts > now - WINDOW_MS);
  const latest = (source: "browser" | "api") => {
    const event = recent
      .filter(e => e.source === source)
      .sort((a, b) => b.ts - a.ts)[0];
    return event ? Math.max(0, Math.floor((now - event.ts) / 60_000)) : null;
  };
  const warning = { browserMinutesAgo: latest("browser"), apiMinutesAgo: latest("api") };
  return warning.browserMinutesAgo !== null || warning.apiMinutesAgo !== null ? warning : null;
}
