---
name: API source versus packaged build
description: Prevents validating API fixes against a stale Windows-distributed server build
---

API-server source changes must be rebuilt into the Windows distribution and shipped under a new application version before testing. A running packaged client can otherwise continue logging old method names and behavior even when the source and development workflow are fixed.

**Why:** A follow implementation was corrected in source, but the Windows log still showed the old fallback method because the distributed build had not been regenerated; a same-version package also cannot be relied on to replace an installed Electron build.

**How to apply:** After API changes, build the API distribution, increment the Electron/root version, publish the resulting release, and verify the packaged log contains the new path before judging the fix.