---
name: Explore endpoint distinction
description: Keeps the mobile API route for the Explore post grid separate from the topic and activity-pill discovery surface
---

The View Explore post grid uses `GET /api/v1/discover/explore/`. Do not substitute `discover/topical_explore`; that route represents the interests/topics and activity-pill surface.

**Why:** Treating `discover/topical_explore` as the Explore grid caused the wrong high-risk discovery request to be called for accounts.

**How to apply:** When implementing or reviewing Explore browsing, verify the request path in the human-session client and packaged Electron bundle is `discover/explore`; retain topical references only for historical analytics or the library's unrelated feed implementation.