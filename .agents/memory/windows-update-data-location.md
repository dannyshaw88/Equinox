---
name: Windows update data location
description: Durable storage rules for packaged Electron updates on Windows
---

Packaged Electron application state must live in a dedicated subdirectory under `app.getPath("userData")`, never beside the executable. The updater can replace the install directory and remove the database, backups, or browser session files stored there. On first launch after this change, copy the legacy install-folder database and related state only when the new persistent destination does not already exist.

**Why:** The previous install-folder location allowed a Windows restart/update to start against a fresh SQLite database, making accounts and settings appear to vanish.

**How to apply:** Keep database, backups, browser data, and other writable state under the dedicated user-data directory. Preserve a one-time migration path from the old executable directory, and do not reuse an unrelated database left at the shared user-data root.