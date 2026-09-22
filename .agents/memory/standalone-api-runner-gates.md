---
name: Standalone API runner gates
description: Durable rules for keeping standalone mobile actions runnable and preserving imported session state.
---

A configured-but-disabled Human Sessions tool is not an execution mode. Enabled standalone tools such as Follow must still launch through the mobile API when the Human Sessions master tool is off. Browser cookie files may omit `csrftoken`; merging them must preserve an existing mobile CSRF token rather than deleting it.

**Why:** Imported accounts use a mobile API session independently of the embedded browser, and the default profile schema includes disabled Human Sessions rows. Treating row existence as activation silently prevented Follow from running; destructive cookie merging caused generic API failures.

**How to apply:** Gate standalone runners on an enabled Human Sessions tool, and merge browser cookies into the mobile jar non-destructively. Keep genuine Instagram `login_required`/challenge responses separate from local dispatch or cookie-merge errors.