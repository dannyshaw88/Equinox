---
name: Reels endpoint account blocker
description: Live-test evidence for imported Human Session accounts whose mobile Clips requests fail independently of general session health.
---

For an imported account with valid `igApiCookies`, a successful session restore and successful notifications/settings calls do not prove that the mobile Clips surfaces are available. The Discover stream can return HTTP 200 with `status:"fail"`, the account-scoped Clips endpoint can return HTTP 400 with `status:"fail"`, and a timeline fallback can time out through the account proxy with HTTP 572 while the account still remains valid.

**Why:** Instagram may reject or proxy-block the Clips surface independently of authentication. Treating every generic Clips failure as a bad session leads to unnecessary credential recycling and can hide a proxy or endpoint rollout problem.

**How to apply:** When debugging Human Session Reels, verify general session health separately, capture the exact endpoint status/body and proxy transport status, and avoid marking the account logged out solely from a generic Clips failure. Re-test after a fresh session/proxy path before changing unrelated request contracts.