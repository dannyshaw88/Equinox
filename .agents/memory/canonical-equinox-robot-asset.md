---
name: Canonical Equinox robot asset
description: Branding source-of-truth and packaging rule for the Equinox robot logo.
---

`artifacts/dannys-bot/public/bot-logo.png` is the canonical cyan robot used in the top-left of the software. Other raster logo aliases, Electron PNG assets, Windows ICO assets, tray assets, and SVG wrappers must derive from that image rather than introducing a separate robot variant.

**Why:** Multiple older assets existed, including an antenna-style logo and a simplified tray robot. Those variants made the web UI, installer, desktop shortcut, and system tray appear to belong to different products.

**How to apply:** When the robot branding changes, update the canonical PNG first, regenerate the Electron/Windows asset copies and ICO sizes from it, rebuild the frontend and Electron bundle, and verify the installer configuration still points to `assets/icon.ico`.