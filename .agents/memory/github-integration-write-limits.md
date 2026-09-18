---
name: GitHub integration write limits
description: Replit's connected GitHub client may allow file/tree creation while blocking branch ref mutations and GitHub Actions workflow writes.
---

The connected GitHub integration is not equivalent to an authenticated local `git push`. In this workspace, GitHub tree/blob creation and Contents API writes worked, while ref update/delete/create operations and writes under `.github/workflows/` were blocked by connector permissions.

**Why:** A repository sync can appear to build successfully but still fail to attach its clean commit to `main`, or can leave workflow files missing. Treat branch replacement and workflow publishing as separate capability checks.

**How to apply:** Verify the remote branch head and final file tree after every sync. For a true history replacement or GitHub Actions workflow upload, use an authenticated Git client or reconnect the GitHub integration with the required repository/workflow permissions; never assume a successfully created tree is reachable from the branch.