import { useState, useEffect } from "react";

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
  const parse = (raw: string | null): T | null => {
    if (raw === null) return null;
    try {
      const parsed = JSON.parse(raw) as T;
      return merge ? merge(parsed, defaultValue) : parsed;
    } catch {
      return null;
    }
  };

  const [value, setValue] = useState<T>(() => {
    try {
      return parse(localStorage.getItem(key)) ?? defaultValue;
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
      if (parse(localStorage.getItem(key)) !== null) return;
    } catch {}

    let cancelled = false;
    api.settingsGet(key).then((v: unknown) => {
      if (cancelled || v === null || v === undefined) return;
      const resolved = merge ? merge(v as T, defaultValue) : (v as T);
      setValue(resolved);
      try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
    }).catch(() => {});
    return () => { cancelled = true; };
  // key is a stable constant per hook instance — only run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (v: T) => {
    setValue(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
    const api = (window as any).electronAPI;
    if (api?.settingsSet) {
      api.settingsSet(key, v).catch(() => {});
    }
  };

  return [value, set];
}
