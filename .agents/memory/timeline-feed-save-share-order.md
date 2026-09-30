---
name: Timeline Save/Share behavior
description: Records the timeline action ordering and the suspected host mismatch for share-to-feed responses.
---

Selected Save/Share actions for timeline posts run after each `/media/seen` batch and before the next batch or feed page. Preserve the existing seen-request batches of up to four posts; do not split them into one request per post merely to interleave actions.

**Why:** The user approved running Save/Share during feed processing, while retaining the existing mobile API methods and Instagram-compatible seen batching.

**How to apply:** Keep per-post Save/Share chance checks in the timeline seen-batch callback. If changing the callback or pagination flow, preserve the order `seen batch → selected post actions → next seen batch/page`.

When `sharePostToFeed` returns Instagram website HTML with Page Not Found through the mobile host, suspect the request origin before changing the private route string. Prefer the authenticated `www.instagram.com` web session when available and retain the mobile route for mobile-only sessions; verify against a real account before treating the routing change as confirmed.

**Why:** The HTML response is not the expected mobile API JSON, and this project has encountered host-dependent behavior on other feed actions.

**How to apply:** Do not retry the same side-effecting share against a second host after an ambiguous response, since the first request may have succeeded without confirmation.