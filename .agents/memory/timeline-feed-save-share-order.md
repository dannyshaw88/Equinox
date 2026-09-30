---
name: Timeline-feed Save/Share ordering
description: Keeps selected timeline saves and shares interleaved with feed processing without changing seen-request batching.
---

Selected Save/Share actions for timeline posts run after each `/media/seen` batch and before the next batch or feed page. Preserve the existing seen-request batches of up to four posts; do not split them into one request per post merely to interleave actions.

**Why:** The user approved running Save/Share during feed processing, while retaining the existing mobile API methods and Instagram-compatible seen batching.

**How to apply:** Keep per-post Save/Share chance checks in the timeline seen-batch callback. If changing the callback or pagination flow, preserve the order `seen batch → selected post actions → next seen batch/page`.