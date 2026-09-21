---
name: Human Session Reels attribution
description: How to distinguish an intentional Reels action from an unexplained clips/home request in Human Session runs
---

An HTTP failure in the independent Human Session View Reels action can occur before the high-level session-action row is written, making the `/api/v1/clips/home` request look unrelated to the session. Independent queued actions should re-check their persisted enable flag at execution time and log failures as visible action rows.

**Why:** The queue is created from a settings snapshot, while the UI can change settings during a long-running earlier action; transport errors were previously only written to the server warning log.

**How to apply:** When investigating a raw API call with no dashboard row, check the action's catch path and the queue order/settings snapshot before looking for a second caller or process.