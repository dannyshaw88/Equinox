---
name: GitHub push fallback
description: How to synchronize this repository when shell git push authentication is unavailable but the GitHub connector works
---

When shell-based HTTPS authentication fails, the authorized GitHub connector can publish the repository through Git Data API blobs, trees, commits, and a ref update. To preserve Replit's Git-panel history, recreate the local commit chain with its exact tree, parent, author, committer, and message bytes; then update the local origin/main tracking ref only after the remote head is verified.

**Why:** A remote commit containing the right files but a different commit history still appears in Replit as local commits that are not pushed. Replit's Git panel compares commit ancestry, not only file contents.

**How to apply:** Use the connector's authenticated GitHub API when the shell remote rejects credentials. Include commit-message trailers and the final newline when matching local SHAs, verify the remote ref equals local HEAD, and then refresh the local remote-tracking ref.