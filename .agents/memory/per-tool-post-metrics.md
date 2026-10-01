---
name: Per-tool post metrics lookup
description: Product rule for scoping chance-based metadata lookups to tools that explicitly open posts
---

Each post-metrics lookup chance belongs to the tool or action that opens the post; never use one shared percentage across unrelated tools. Current supported actions are author-profile post opens, Explore post/profile opens, and Inject Profile Browsing clicked posts. Do not add this lookup to the main Timeline Feed scrolling or View Reels/autoplay paths without the user's explicit direction.

**Why:** The user rejected the global setting and explicitly excluded View Timeline Feed and View Reels; independent ranges prevent one tool's setting from affecting another.

**How to apply:** When adding a metadata lookup to a post-opening action, add that action's own Min/Max settings beside it and pass only those settings to the chance roll. Keep scroll-only and Reel-viewing paths free of these lookups.