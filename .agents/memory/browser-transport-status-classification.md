---
name: Browser transport status classification
description: How verification should classify browser navigation and proxy failures
---

Browser navigation failures such as Chrome ERR_HTTP_RESPONSE_CODE_FAILURE, proxy authentication errors, timeouts, and other network/connection failures are inconclusive transport failures. They must preserve the profile's pre-operation status rather than marking the account locked, logged out, or pending.

**Why:** A verification attempt classified a browser error as locked even though the account remained active in another client. That false status prevented recovery and incorrectly implied an Instagram account-level lock.

**How to apply:** Only classify locked, logged out, suspended, disabled, challenge, captcha, or human-verification states when Instagram returns explicit account-level evidence. Browser/API transport errors preserve both the existing status and session state; a previously valid account remains valid.