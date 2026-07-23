# Git

How change is recorded.

## Workflow

1. **Work on the branch the process defines for the task** ([process.md](process.md) §Branches and PRs). Never push directly to `main`.
2. **Create new commits rather than amending.** Never force-push or skip hooks without explicit permission.
3. **Task PRs target their milestone branch; milestone PRs target the latest `main`.** Work outside a milestone stays on a feature branch and PRs only when explicitly asked.

## Conventional Commits

1. All commit subjects follow [Conventional Commits](https://www.conventionalcommits.org/):

   ```text
   <type>(<optional scope>): <imperative summary>
   ```

   - **Allowed types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
   - **Scopes** match the affected area: the surface (`home`), the layer (`templates`, `tokens`, `constants`), or the docs (`prd`, `docs`). Omit when global.
   - **Subject:** ≤ 72 characters, lowercase, no trailing period.
   - **Body:** explain the *why* when the diff alone doesn't.
   - **Breaking changes:** `!` suffix and a `BREAKING CHANGE:` footer for route moves, renames, or behavior changes.

## Branch naming

1. Branches follow the same type vocabulary as commits:

   ```text
   <type>/<short-kebab-summary>
   ```

   - ≤ 40 characters, lowercase, hyphen-separated.
   - Milestone and task branches carry their identifiers per
     [process.md](process.md) §Branches and PRs: `feat/m02-works`,
     `feat/m02-t04-works-ledger`.
   - Branches outside a milestone reference the affected area:
     `fix/date-zoning`, `docs/initial-plan`.

## Attribution

1. **No AI/agent attribution** in commits, PRs, or issues: no `Co-Authored-By: Claude/Codex`, no "Generated with Claude Code" markers, no `claude.ai/code` session links.
