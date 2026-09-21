---
name: Human Session Reels attribution
description: How to distinguish the independent View Reels action from unrelated transport calls
---

The independent Human Session View Reels action uses `POST /api/v1/clips/feed/` for its initial page and pagination. `GET /api/v1/clips/home/` is not its request route; it is retained only in the Explore safety guard and diagnostic attribution text. Independent queued actions should re-check their persisted enable flag at execution time and log failures as visible action rows.

**Why:** The queue is created from a settings snapshot, while the UI can change settings during a long-running earlier action; transport errors were previously only written to the server warning log. The clips-home route also returned an HTML 404 for the mobile session/request shape.

**How to apply:** When investigating a raw API call with no dashboard row, check the action's catch path and the queue order/settings snapshot before looking for a second caller or process. Do not change View Reels back to `clips/home`; preserve the `clips/feed` POST contract for both page loads.