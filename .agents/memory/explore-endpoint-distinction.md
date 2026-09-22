---
name: Explore endpoint distinction
description: Keeps the mobile API route for the Explore post grid separate from the topic and activity-pill discovery surface
---

The View Explore post grid uses `GET /api/v1/discover/explore/` with the native feed query contract: `is_prefetch`, `is_auto_paginate`, `omit_cover_media`, `module=explore_popular`, `reels_configuration`, `use_sectional_payload`, `timezone_offset`, `cluster_id=explore_all:0`, `session_id`, and `include_fixed_destinations`. Do not substitute `discover/topical_explore`; that route represents the interests/topics and activity-pill surface.

**Why:** Treating `discover/topical_explore` as the Explore grid caused the wrong high-risk discovery request to be called for accounts.

**How to apply:** When implementing or reviewing Explore browsing, verify the request path and full query in the human-session client and packaged Electron bundle, then live-test the endpoint. A valid mobile session can load `/api/v1/feed/timeline/` while `/api/v1/discover/explore/` returns Instagram's HTML `not-logged-in` 404, so code references and a valid session do not prove this route is currently served. Do not reduce it to a bare `session_id`; that can be rejected as an incomplete feed request. Preserve endpoint/application errors instead of converting them to a successful empty feed. Retain topical references only for historical analytics or the library's unrelated feed implementation.