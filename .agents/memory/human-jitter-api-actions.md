---
name: Human Jitter API actions
description: Durable endpoint and separation rules for the Human Jitter action queue.
---

The API Human Jitter queue must call the Instagram mobile-session client directly rather than using embedded-browser navigation or DOM clicks. The current action mapping is notifications → `news/inbox/`, own profile → `users/{ds_user_id}/info/`, settings → `accounts/account_security_info/`, Your Activity → `news/activities/`, and Saved → `feed/saved/`.

Followers and followings checks use `friendships/{ds_user_id}/followers/` and `friendships/{ds_user_id}/following/`. Their cadence is based on each profile's lifetime Human Session execution count, not a percentage chance; `0–0` disables a check. Persist each next-run target as engine-owned state, preserve it across settings edits/copy operations, and include due checks in Shuffle. Each interval check may be attempted only once per Human Session execution, including Jitter reruns.

**Why:** The API runner has no browser page, so browser-only code can fail before making a request and still produce misleading action logs. Interval cadence is account-specific and survives restarts; Human Sessions settings saves send a full snapshot, so engine-owned next-run state must not be overwritten by an older UI copy.

**How to apply:** Keep browser navigation in the dedicated EB-only runner. For API Human Jitter changes, use client methods that return false for missing/invalid responses, catch account-level session errors through the shared session-error handler, and log success only after the endpoint response is valid. Preserve the Human Jitter master enable/skip gate and non-Jitter tool order when changing Shuffle.