---
name: API source versus packaged build
description: Prevents validating API fixes against a stale Windows-distributed server build
---

API-server source changes must be rebuilt into the Windows distribution under a new application version before a packaged client can use them. A running packaged client can otherwise continue logging old method names and behavior even when the source and development workflow are fixed.

**Why:** A follow implementation was corrected in source, but the Windows log still showed the old fallback method because the distributed build had not been regenerated; a same-version package also cannot be relied on to replace an installed Electron build.

**How to apply:** Verify source changes with the API build and workflow. Only when the user explicitly asks to push, ship, or release: rebuild the API distribution, increment the Electron/root version together, use the existing installer workflow, and verify the packaged log. Never push proactively.