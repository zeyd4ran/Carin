---
name: GitHub publishing
description: Durable guidance for publishing this workspace to GitHub through Replit's attached connector.
---

When publishing from this workspace, the connector-specific helper may be unavailable in the execution sandbox. Use the attached GitHub connection's authenticated proxy instead, upload blobs, create a complete tree, create a commit, and advance the target branch without force-pushing.

**Why:** Direct credential handling is not allowed, and a partially assembled Git tree can create a misleading successful commit that is missing most project files.

**How to apply:** Build the manifest from tracked files, preserve binary assets with base64 blobs, create the final tree without inheriting stale paths when correcting an incomplete upload, then verify the branch tree count and representative frontend/API paths.