---
name: Timeline Save/Share behavior
description: Records the timeline action ordering and the suspected host mismatch for share-to-feed responses.
---

Selected Save/Share actions for timeline posts run after each `/media/seen` batch and before the next batch or feed page. Preserve the existing seen-request batches of up to four posts; do not split them into one request per post merely to interleave actions.

**Why:** The user approved running Save/Share during feed processing, while retaining the existing mobile API methods and Instagram-compatible seen batching.

**How to apply:** Keep per-post Save/Share chance checks in the timeline seen-batch callback. If changing the callback or pagination flow, preserve the order `seen batch → selected post actions → next seen batch/page`.

The private `/api/v1/media/{id}/re_share_to_feed/` route has returned HTML 404 responses through both the mobile and web origins in separate captured attempts. Neither origin is currently confirmed to work.

**Why:** Changing the origin from mobile to `www.instagram.com` did not resolve the HTML 404. The response does not establish that a share occurred or that the alternate origin is safe to retry.

**How to apply:** Require explicit JSON `status:"ok"` before recording a share as successful. Do not retry the same share on another origin after an unconfirmed response; obtain a fresh native/browser request capture to establish the supported route and host before changing routing again.

A 500 `Oops, an error occurred` from `/api/v1/media/seen/` is a real Instagram response, but it is non-fatal to timeline loading and does not by itself mean the mobile session is invalid. Keep that transport error visible; label the companion timeline summary as a best-effort seen signal, not confirmed success.

**Why:** Instagram has returned this 5xx while timeline-feed fetches continued successfully, and the seen marker is a best-effort signal.

**How to apply:** Do not treat the 500 as fabricated or silently convert it into confirmation. Keep feed success, session validity, and seen-marker success as separate states.