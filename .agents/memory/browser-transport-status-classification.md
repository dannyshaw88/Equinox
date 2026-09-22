---
name: Browser transport status classification
description: How verification should classify browser navigation and proxy failures
---

Browser navigation failures such as Chrome ERR_HTTP_RESPONSE_CODE_FAILURE, proxy authentication errors, timeouts, and other network/connection failures are inconclusive transport failures. They must leave the profile pending rather than marking the Instagram account locked.

**Why:** A verification attempt classified a browser error as locked even though the account remained active in another client. That false status prevented recovery and incorrectly implied an Instagram account-level lock.

**How to apply:** Only classify locked, suspended, disabled, challenge, captcha, or human-verification states when Instagram returns explicit account-level evidence. Keep browser/transport errors pending and preserve the account's existing session state.