---
name: Vendor transport evidence
description: Evidence boundary for claims about Jarvee/SU Social HTTP/TLS stacks and the repository's pre-CycleTLS history.
---

Official Jarvee and SU Social material found describes Instagram API calls, API emulation, proxies, and limits, but does not name the internal HTTP/TLS library. The earliest source snapshot available in this checkout already contains CycleTLS, so it cannot establish the earlier transport. Existing source comments are not primary evidence for vendor internals or older code.

The user reports that Jarvee offers options labeled “HTTPS” and “HTTPS 2.0”; the exact meaning and selected option are unverified. Treat “HTTPS 2.0” as possibly HTTP/2 over TLS, not as a confirmed library or TLS implementation.

**Why:** A prior diagnosis conflated the current native HTTPS branch with the historical pre-CycleTLS transport and attributed it to Jarvee without a verifiable source.

**How to apply:** State only what repository history, vendor documentation, or a captured request establishes. Distinguish HTTPS as a URL scheme from HTTP/1.1 versus HTTP/2; confirm the exact Jarvee option and its selection before drawing a protocol-parity conclusion. Do not guess a transport or change JA3 based on undocumented vendor behavior. If the old implementation must be identified, request its source, binary, or a network capture.