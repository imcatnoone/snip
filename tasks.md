# Task List for Snips

## Critical Tasks Before Going Live
- [ ] 🚨 Address Next.js moderate severity vulnerability (DoS with Server Actions)
  - Run `npm audit fix --force` to update to next@14.2.23
  - Test thoroughly after update to ensure no breaking changes
  - Current vulnerability: [GHSA-7m27-7ghc-44w9](https://github.com/advisories/GHSA-7m27-7ghc-44w9)