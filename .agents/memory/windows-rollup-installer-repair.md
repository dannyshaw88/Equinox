---
name: Windows pnpm optional dependency repair
description: Why the Windows installer must clean stale pnpm virtual stores before rebuilding native optional dependencies
---

The Windows installer must remove the root and direct workspace `node_modules` directories before reinstalling when a native optional dependency has been omitted. Windows-native bindings such as Rollup and Lightning CSS are declared as root-level optional dependencies so Windows receives guaranteed links while Linux skips the Windows-only packages. Audit every platform-specific exclusion in workspace overrides, not just the first failing package.

**Why:** pnpm's native-module errors can persist after the repository lockfile is corrected because an existing workspace virtual store retains the earlier platform-specific dependency graph, and transitive optional bindings may exist in the store without being linked where their host package resolves them. Removing one exclusion can expose the next blocked native package.

**How to apply:** For Windows installer dependency failures, clean the workspace dependency directories, run the forced install, verify each binding is linked inside its host package's virtual-store directory, and create a junction to the installed package when pnpm leaves that nested link missing. Keep root optional-dependency versions aligned with their host package versions.