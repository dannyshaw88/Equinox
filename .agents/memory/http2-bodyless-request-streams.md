---
name: Node HTTP/2 bodyless stream lifecycle
description: Avoid writing to already-ended bodyless HTTP/2 request streams
---

For Node HTTP/2 requests with no body, check `writableEnded` before calling `.end()`. Send a body only when its byte length is non-zero; do not unconditionally pass an empty Buffer.

**Why:** Local testing through an HTTP CONNECT proxy produced `ERR_STREAM_WRITE_AFTER_END` on a bodyless request after an earlier request reused the same HTTP/2 session.

**How to apply:** When building or changing a Node HTTP/2 transport, test multiple bodyless GET/HEAD requests on one session and guard against ending a stream that Node has already ended while sending headers.