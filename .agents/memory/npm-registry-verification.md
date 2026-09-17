---
name: Npm registry verification
description: Environment-specific npm registry overrides that can affect clean CI reproduction
---

Project `.npmrc` can specify the public npm registry while the Replit shell injects `npm_config_registry` for its package firewall. A clean CI-style check must remove that environment override and use an isolated user npm config before running `npm ci`. Existing lockfiles and npm's hidden `node_modules/.package-lock.json` can retain internal `resolved` URLs; `omit-lockfile-registry-resolved=true` makes the committed lockfile portable.

**Why:** A successful local install can otherwise exercise the internal firewall rather than the repository’s portable registry configuration, masking the failure mode the CI environment needs to validate. Reusing npm's hidden local lock metadata can also regenerate the same non-portable URLs.

**How to apply:** When validating portable npm lockfiles, confirm `npm config get registry` resolves to `https://registry.npmjs.org/` in the isolated process, omit registry URLs from the lockfile, then run the clean install and target production build.