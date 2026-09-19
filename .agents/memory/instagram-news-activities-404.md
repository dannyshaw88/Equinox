---
name: Instagram Your Activity endpoint retirement
description: Current Instagram mobile transport behavior for the Your Activity API action.
---

`GET /api/v1/news/activities/` on `i.instagram.com` returned an HTML HTTP 404 response during a run where the same stored cookies had already passed authenticated verification. The HTML included a `not-logged-in` class, but the account stayed `valid` afterward, so that page marker is not proof of logout.

**Why:** The endpoint is unavailable or unsupported for the current mobile API route/version. Treating its 404 as an authentication failure creates a false account status; treating the request timer as success also hides the real route failure.

**How to apply:** Do not use `/api/v1/news/activities/` in mobile Human Session API execution or session-health classification. If Your Activity remains a product requirement, implement it through a currently working web/embedded-browser flow rather than retrying this mobile route.