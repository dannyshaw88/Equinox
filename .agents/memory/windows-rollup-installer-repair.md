---
name: Windows pnpm optional dependency repair
description: Why the Windows installer must clean stale pnpm virtual stores before rebuilding native optional dependencies
---

The Windows installer must remove the root and direct workspace `node_modules` directories before reinstalling when a native optional dependency has been omitted. Updating `pnpm-lock.yaml` and running a forced install can still leave stale virtual-store links in place.

**Why:** pnpm's Rollup error can persist after the repository lockfile is corrected because an existing workspace virtual store retains the earlier platform-specific dependency graph.

**How to apply:** For Windows installer dependency failures, clean the workspace dependency directories, run the forced install, and verify the expected native package exists before starting application builds.