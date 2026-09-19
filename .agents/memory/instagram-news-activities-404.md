---
name: Instagram Your Activity endpoint retirement
description: Current Instagram mobile transport behavior for the Your Activity API action.
---

`GET /api/v1/news/activities/` on `i.instagram.com` returned an HTML HTTP 404 response during one run where the same stored cookies had already passed authenticated verification. The HTML included a `not-logged-in` class, but the account stayed `valid` afterward, so that page marker is not proof of logout. This evidence does not prove the feature is globally retired; it may be unavailable for this mobile route/version/request shape while still working through another path.

**Why:** The endpoint was unavailable or unsupported for that particular mobile request. Treating its 404 as an authentication failure creates a false account status; treating the request timer as success also hides the real route failure.

**How to apply:** Never use a `/api/v1/news/activities/` response as session-health evidence. Before removing or replacing the Human Session action, verify whether the same feature works through the embedded browser or a corrected mobile host/route/version.