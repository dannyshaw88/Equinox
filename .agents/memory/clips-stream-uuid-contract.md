---
name: Clips stream UUID contract
description: The mobile Reels discover stream requires the session UUID plus its full prefetch/container request contract.
---

The `/api/v1/clips/discover/stream/` request must send the per-session UUID (`state.uuid`) as `_uuid`, not the persisted Android device identifier (`state.deviceId`, typically `android-*`). It must also preserve the native prefetch/container fields (`seen_reels:"[]"`, `viewer_session_id`, `container_module:"clips_viewer_clips_tab"`, cache/device fields) and headers (`X-Ig-Client-Endpoint: feed_timeline`, `X-Fb-Friendly-Name`, `x-ig-prefetch-request: foreground`).

**Why:** Instagram's Clips stream validates both identity and viewer-prefetch context more strictly than ordinary feed reads, and its generic application-level `status:"fail"` response does not identify which field is missing or invalid.

**How to apply:** When changing Human Session Reels requests, preserve the dedicated Clips endpoint and complete native payload/header contract, use `state.uuid` for `_uuid`, and do not alter the Stories implementation.