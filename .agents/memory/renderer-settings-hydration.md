---
name: Renderer settings hydration precedence
description: How browser and Electron UI settings should reconcile when a page remounts
---

The renderer's valid localStorage value is the most recent page-local user choice and must take precedence during hydration. Read the Electron settings file only when localStorage has no valid value.

**Why:** Hydrating Electron settings unconditionally can overwrite a newly saved renderer value when navigating away and back, making UI preferences appear not to persist.

**How to apply:** For hooks that persist to both localStorage and Electron IPC, check and preserve a valid localStorage value before calling the asynchronous Electron fallback; cancel the fallback update if the component unmounts.