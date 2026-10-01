---
name: HTTP/2 request header normalization
description: Keep hop-by-hop headers out of HTTP/2 requests and derive Content-Length from transmitted bytes
---

## The rule

HTTP/2 requests must omit `Host` and hop-by-hop headers such as `Connection`; authority is carried by `:authority`. Derive `Content-Length` from the exact transmitted body instead of trusting a caller-provided value.

## Why

HTTP/2 has strict rules:

- **Host** is replaced by the `:authority` pseudo-header. Passing `Host` as a regular header alongside it can cause a conflict.
- **Connection** is a hop-by-hop header forbidden in HTTP/2.
- **Content-Length** must match the transmitted bytes. Binary uploads must use the Buffer byte length, not a string length or stale caller value.

An earlier HTTP/2 path sent headers that conflict with pseudo-headers or violate HTTP/2's hop-by-hop restrictions, causing generic request failures.

## How to apply

Normalize headers before building an HTTP/2 request. Keep valid end-to-end headers such as `User-Agent` and `Accept-Encoding`. Set Content-Length from the Buffer byte length for a non-empty body, and omit it for an empty body.