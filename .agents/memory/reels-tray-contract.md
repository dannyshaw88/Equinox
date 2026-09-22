---
name: Instagram reels tray contract
description: The mobile Stories tray endpoint uses the native POST request shape rather than the older GET surface query.
---

The Stories tray is endpoint-specific: a working mobile session can still receive a generic HTTP 200/status="fail" response when `/api/v1/feed/reels_tray/` is called with the obsolete GET `?surface=2` shape. The maintained mobile client uses POST with the session UUID, CSRF form value, cold-start reason, and supported capabilities.

**Why:** Timeline, Explore, and DMs can succeed in the same session, so this rejection does not by itself prove that cookies, transport, or authentication are dead.

**How to apply:** When Stories alone returns the generic error, compare the method and form contract against the current mobile client before changing session restoration or globally rotating the app version.