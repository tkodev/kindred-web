# Testing

What gets tested and how. The current strategy: **none**. No tests are
written until a strategy is settled here; coverage is never a goal in itself.

1. **Don't test everything.** Tests earn their place under the strategy this
   doc will define; until then, don't add them speculatively.
2. **The plumbing stays warm.** Vitest stays wired and `pnpm test` stays
   green (it passes with no tests), so a strategy can land without
   re-plumbing.
3. **When tests exist, they are colocated** with what they test.
