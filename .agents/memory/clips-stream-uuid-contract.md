---
name: Clips stream UUID contract
description: The mobile Reels discover stream distinguishes the session UUID from the Android device identifier.
---

The `/api/v1/clips/discover/stream/` request must send the per-session UUID (`state.uuid`) as `_uuid`. The persisted Android device identifier (`state.deviceId`, typically `android-*`) is a different value and causes Instagram to return a generic application-level `status:"fail"` response even when the session itself remains usable.

**Why:** Instagram's Clips stream validates the request identity fields more strictly than ordinary feed reads, and its failure response does not identify the bad identifier.

**How to apply:** When changing Human Session Reels requests, preserve the dedicated Clips endpoint and native payload, use `state.uuid` for `_uuid`, and do not alter the Stories implementation.