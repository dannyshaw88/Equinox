---
name: Human Session Reels attribution
description: How to distinguish the independent View Reels action from unrelated transport calls
---

The independent Human Session View Reels action uses `POST /api/v1/clips/discover/stream/` with the native seen/chaining payload for its initial page and pagination. Explore uses `GET /api/v1/discover/topical_explore/` with the Explore query parameters; `discover/ayml` is POST-only suggestions data, not an Explore fallback.

**Why:** The attached production capture showed `/discover/explore/` and `/clips/feed/` returning HTML 404s, while an AYML GET returned JSON 405. A captured Android route set identifies `topical_explore` and `clips/discover/stream` as the current mobile surfaces.

**How to apply:** Keep the independent action's execution-time enable check and visible failure row. Do not substitute `discover/ayml`, `clips/feed`, or `clips/home` for these routes without a new captured request proving the replacement.