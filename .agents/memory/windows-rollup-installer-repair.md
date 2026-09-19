---
name: Windows pnpm optional dependency repair
description: Why the Windows installer must clean stale pnpm virtual stores before rebuilding native optional dependencies
---

The Windows installer must remove the root and direct workspace `node_modules` directories before reinstalling when a native optional dependency has been omitted. Rollup's Windows binding is also declared as a root-level optional dependency so Windows receives a guaranteed link while Linux skips the Windows-only package.

**Why:** pnpm's Rollup error can persist after the repository lockfile is corrected because an existing workspace virtual store retains the earlier platform-specific dependency graph, and the transitive optional binding may exist in the store without being linked where Rollup resolves it.

**How to apply:** For Windows installer dependency failures, clean the workspace dependency directories, run the forced install, verify the binding is linked inside Rollup's virtual-store directory, and keep the root optional dependency version aligned with the Rollup version.