---
name: Instagram auth header capture
description: The custom CycleTLS transport must retain Instagram's full Bearer authorization response token for restored-session writes.
---

## Rule

Treat `ig-set-authorization` as the complete `Bearer IGT:2:...` value used by `instagram-private-api`, and find response headers case-insensitively before persisting it.

**Why:** A transport that only accepts the `IGT:` suffix silently discards a valid authorization response. The session cookie can still pass read/bootstrap checks while later mobile writes return HTTP 200 `status:"fail"` with a generic error. After preserving the token, the API-only friendship request returned `following: true`.

**How to apply:** Keep auth capture in both the patched IgApiClient transport and direct mobile response-header absorption. Accept only non-empty, non-terminal `Bearer IGT:2:`/`IGT:2:` values and never assume CycleTLS preserves header casing.