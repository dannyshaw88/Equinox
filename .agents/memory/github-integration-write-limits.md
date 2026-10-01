---
name: GitHub integration write limits
description: Observed GitHub connector capabilities and endpoint pitfalls in this workspace.
---

The connected GitHub integration is not equivalent to an authenticated local `git push`. In this workspace, its authenticated REST proxy can create Git Data blobs, trees, and commits, advance an existing branch ref, and dispatch an existing Actions workflow. Shell `git push` can still fail when HTTPS credentials are unavailable. Ref creation/deletion and workflow-file writes remain capability-specific; verify them rather than assuming they work or fail.

**Why:** An exact-history Git Data API sync succeeded after shell authentication failed. A 404 from `PATCH /git/ref/{ref}` was caused by using the singular read endpoint; updating a ref uses the plural `/git/refs/{ref}` endpoint.

**How to apply:** For an authorized push, compare blob, tree, and commit SHAs; confirm the remote ref is still the expected base; update it non-forcibly through the plural endpoint; then fetch and verify the remote head locally. Check the actual endpoint, method, and response before diagnosing a connector permission failure.