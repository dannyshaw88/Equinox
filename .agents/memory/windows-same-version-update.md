---
name: Windows same-version update rule
description: Why rebuilt Electron installers can appear unchanged when the semantic app version is not incremented
---

An Electron Windows rebuild must increment the semantic app version when it needs to replace an already-installed build. A new source commit with the same version is not a newer update for electron-updater, and same-version installers are not a reliable way to prove that the installed files were replaced.

**Why:** Windows update behavior compares the packaged application version, not the source commit. Reusing the same installer filename/version can leave the user running the previous installation or cause the updater to report that no update is available.

**How to apply:** Before producing a replacement installer, keep the root and Electron package versions synchronized and increment them together. Verify the exact versioned installer filename and the installed shortcut target.