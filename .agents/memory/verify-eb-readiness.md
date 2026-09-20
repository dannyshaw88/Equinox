---
name: Verify EB readiness
description: The readiness contract between the API Verify flow and the Electron browser window
---

The Verify flow must not treat a successful `/eb/open` response as proof that the browser toolbar exists. General `/eb/open` calls intentionally return before `openEbWindow` finishes setup, so Verify must opt into an awaited-open response and only then dismiss the page cookie banner and click the native toolbar Login button.

**Why:** A Verify run that waited a fixed three seconds received `Browser toolbar is not ready`; its cleanup closed the window and the normal failure mapping changed the account to `locked`, even though the browser never reached the login click.

**How to apply:** Keep the normal fire-and-forget behavior for interactive browser opens, but use an explicit readiness flag for Verify (including bulk Verify). The toolbar click endpoint should still retry until the toolbar DOM is loaded, and the caller should distinguish browser-open failure from Instagram login failure.