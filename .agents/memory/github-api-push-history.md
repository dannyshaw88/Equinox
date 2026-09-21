---
name: GitHub push fallback
description: How to synchronize this repository when shell git push authentication is unavailable but the GitHub connector works
---

When shell-based HTTPS authentication fails, the authorized GitHub connector can publish the repository through Git Data API blobs, trees, commits, and a ref update. To preserve Replit's Git-panel history, recreate the local commit chain with its exact tree, parent, author, committer, and message bytes; then update the local origin/main tracking ref only after the remote head is verified.

**Why:** A remote commit containing the right files but a different commit history still appears in Replit as local commits that are not pushed. Replit's Git panel compares commit ancestry, not only file contents.

**How to apply:** Use the connector's authenticated GitHub API when the shell remote rejects credentials. Include commit-message trailers and the final newline when matching local SHAs, verify the remote ref equals local HEAD, and then refresh the local remote-tracking ref.

**How to apply:** GitHub's Git Data commit endpoint omits the final commit-message newline unless the `message` payload includes one explicitly. Add `\n` and compare the returned commit SHA before updating the branch ref.

For large tracked text files, do not source commit content from `shellExec` output: its returned text can be truncated even when a larger limit is requested. Use the workspace file reader and verify the blob SHA before creating the tree.

**Why:** A truncated blob can still create successfully on GitHub, but it produces a different tree and commit and leaves misleading orphaned Git objects.

**How to apply:** Read the complete file with `readFile` within its byte limit, upload it as UTF-8 through the connector, and compare the returned blob and tree SHAs with local Git before updating the branch ref.

If Replit's Git panel reports an unknown Git error after a history reconciliation, run `git fsck --full` and `git rev-list --all` before changing refs. A missing parent/tree object can break the panel even when `main` points at the correct commit. Restore missing commit objects from GitHub using their original timezone offset and trailing message newline, then restore referenced trees by SHA; do not rewrite branch refs just to hide the gap.

**Why:** Git history can contain locally missing objects after an automated reconcile, and Git's commit API normalizes dates to UTC even when the original commit hash used a local offset. Rebuilding with the normalized date creates a different SHA.

**How to apply:** Confirm each reconstructed commit and tree SHA against GitHub, then rerun `git fsck --full` and `git rev-list --all`. Dangling objects from failed reconstruction attempts are safe to leave alone unless cleanup is explicitly requested.

GitHub's create-commit API rejects Git's raw timezone suffix (`+0000`); serialize author and committer dates as RFC3339 with a colon (`+00:00`) while preserving the original instant, then verify the returned commit SHA matches local Git.

**Why:** The first exact-history publish attempt was rejected before the ref update solely because the API date parser requires the colonized offset format.

**How to apply:** Convert `±HHMM` to `±HH:MM` for the JSON request, keep the original commit message newline, and compare every returned commit SHA before moving the branch ref.