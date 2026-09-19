---
name: Human Jitter API actions
description: Durable endpoint and separation rules for the Human Jitter action queue.
---

The API Human Jitter queue must call the Instagram mobile-session client directly rather than using embedded-browser navigation or DOM clicks. The current action mapping is notifications → `news/inbox/`, own profile → `users/{ds_user_id}/info/`, settings → `accounts/account_security_info/`, Your Activity → `news/activities/`, and Saved → `feed/saved/`.

**Why:** The API runner has no browser page. Browser-only code can fail before making a request and can still produce misleading action logs.

**How to apply:** Keep browser navigation in the dedicated EB-only runner. For API Human Jitter changes, use client methods that return false for missing/invalid responses, catch account-level session errors through the shared session-error handler, and log success only after the endpoint response is valid.