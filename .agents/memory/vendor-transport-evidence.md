---
name: Vendor transport evidence
description: Evidence boundary for claims about Jarvee/SU Social HTTP/TLS stacks and the repository's pre-CycleTLS history.
---

Official Jarvee and SU Social material found describes Instagram API calls, API emulation, proxies, and limits, but does not name the internal HTTP/TLS library. The earliest source snapshot available in this checkout already contains CycleTLS, so it cannot establish the earlier transport. Existing source comments are not primary evidence for vendor internals or older code.

The user reports that Jarvee offers options labeled “HTTPS” and “HTTPS 2.0” and confirmed that “HTTPS 2.0” was selected for the calls in the supplied export. Its exact wire semantics are still unverified; it likely means HTTP/2 over TLS, not a confirmed library or TLS implementation.

**Why:** A prior diagnosis conflated the current native HTTPS branch with the historical pre-CycleTLS transport and attributed it to Jarvee without a verifiable source.

**How to apply:** State only what repository history, vendor documentation, a user-confirmed setting, or a captured request establishes. Distinguish HTTPS as a URL scheme from HTTP/1.1 versus HTTP/2; a selected setting is useful but does not prove the negotiated protocol, client library, or JA3. Do not guess a transport or change JA3 based on undocumented vendor behavior. If the old implementation must be identified, request its source, binary, or a network capture.