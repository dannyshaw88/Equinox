import { useState, useEffect } from "react";

// Route changes unmount pages, but they do not need to discard the newest
// renderer value. This also protects a freshly mounted page from applying an
// older asynchronous Electron settings response after a user has just changed
// the setting.
const rendererSettings = new Map<string, unknown>();
const rendererWriteVersions = new Map<string, number>();

/**
 * Like useState but persists to both localStorage AND the Electron settings
 * file (via IPC). Electron settings survive server port changes between
 * restarts, so column arrangements are never lost even if localStorage is
 * cleared due to a port change.
 *
 * In the browser (non-Electron), falls back to localStorage only.
 *
 * Usage:
 *   const [colWidths, setColWidths] = usePersistentSetting(
 *     "dashboard_col_widths_px",
 *     DEFAULT_COL_WIDTHS,
 *     (stored, defaults) => ({ ...defaults, ...stored })
 *   );
 */
export function usePersistentSetting<T>(
  key: string,
  defaultValue: T,
  merge?: (stored: T, defaults: T) => T,
): [T, (v: T) => void] {
  const resolve = (stored: T): T => merge ? merge(stored, defaultValue) : stored;
  const parse = (raw: string | null): T | null => {
    if (raw === null) return null;
    try {
      return resolve(JSON.parse(raw) as T);
    } catch {
      return null;
    }
  };

  const [value, setValue] = useState<T>(() => {
    if (rendererSettings.has(key)) {
      return resolve(rendererSettings.get(key) as T);
    }
    try {
      const stored = parse(localStorage.getItem(key));
      if (stored !== null) {
        rendererSettings.set(key, stored);
        return stored;
      }
      return defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    const api = (window as any).electronAPI;
    if (!api?.settingsGet) return;
    // localStorage is the renderer's latest value. Do not overwrite it with
    // an older Electron settings-file value when returning to a page.
    // Electron remains the fallback for a fresh renderer/cleared localStorage.
    try {
      if (rendererSettings.has(key) || parse(localStorage.getItem(key)) !== null) return;
    } catch {}

    let cancelled = false;
    const readVersion = rendererWriteVersions.get(key) ?? 0;
    api.settingsGet(key).then((v: unknown) => {
      // Never let a stale read overwrite a value changed while the request
      // was in flight or while this page was being remounted.
      if (
        cancelled ||
        v === null ||
        v === undefined ||
        (rendererWriteVersions.get(key) ?? 0) !== readVersion ||
        rendererSettings.has(key)
      ) return;
      const resolved = resolve(v as T);
      rendererSettings.set(key, resolved);
      setValue(resolved);
      try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
    }).catch(() => {});
    return () => { cancelled = true; };
  // key is a stable constant per hook instance — only run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (v: T) => {
    rendererSettings.set(key, v);
    rendererWriteVersions.set(key, (rendererWriteVersions.get(key) ?? 0) + 1);
    setValue(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
    const api = (window as any).electronAPI;
    if (api?.settingsSet) {
      api.settingsSet(key, v).catch(() => {});
    }
  };

  return [value, set];
}
