---
name: Explore endpoint distinction
description: Keeps the mobile API route for the Explore post grid separate from the topic and activity-pill discovery surface
---

The current API-only Explore implementation uses `GET /api/v1/discover/topical_explore/` with the installed client’s feed contract: `is_prefetch=false`, `omit_cover_media=true`, `module=explore_popular`, `reels_configuration=hide_hero`, `use_sectional_payload=true`, `timezone_offset`, `cluster_id=explore_all:0`, `session_id`, and `include_fixed_destinations=true`. The response must be classified to confirm it contains media sections rather than only topic/pill sections.

**Why:** The user’s native mobile farm can visit the real Explore icon safely, while the hand-built `discover/topical_explore` request has caused bans in Equinox’s environment. The endpoint name alone cannot establish which surface Instagram returned. The installed `instagram-private-api` client implements its Explore media feed with `topical_explore`; `discover/explore` is not implemented there and returned HTML 404 in Equinox.

**How to apply:** When reviewing Explore browsing, verify the emitted path and parameters in the packaged bundle, then inspect the runtime `surface=...` diagnostic. `media_feed` means the response contains media entries; `topic_or_pill_only` means it did not return the desired post grid. Preserve endpoint/application errors instead of converting them to a successful empty feed. Do not use EB/browser automation as a substitute for the API path.