# CLAUDE.md

Guidance for AI coding agents working in this repository: Kindred (working name), a compatibility app where a member fills out a self-questionnaire, connects friends, and reveals how compatible they are with each. Interaction patterns are modeled on [222.place](https://222.place); the product direction and design are our own. What the app is lives in [README.md](README.md); house standards are vendored as skills (`.claude/skills/`, `.agents/skills/`); the rules and requirements live in `docs/`.

## Read first, in order

Must read: @README.md
Must read: @docs/prd/01-brief.md
Must read: @docs/prd/02-design-system.md
Must read: @docs/prd/06-matching.md
Must read: @docs/prd/07-architecture.md

The per-surface PRD docs ([profile](docs/prd/03-profile.md), [compatibility](docs/prd/04-compatibility.md), [add-friends](docs/prd/05-add-friends.md)) are read just in time.

## Decision framework

See the `decisions` skill for when and how to consult harness-engineering.

## Stack

pnpm 11 (never npm or yarn), Node >= 24, TypeScript strict, Next.js 16 App Router, Tailwind v4 (CSS-first `@theme`, no `tailwind.config`), CVA with `cn()` = `twMerge(clsx(...))`, shadcn/Radix primitives, `lucide-react`, `date-fns`, Vitest. The data layer is **oRPC**: user-specific data (profile, friends, compatibility reveals) flows through typed procedures in `src/server/`, validated with zod; seed data lives in `constants/`. Persistence targets Postgres via `docker compose` ([docs/prd/07-architecture.md](docs/prd/07-architecture.md)); procedures read seed constants until it lands, and the seed is the data contract.

## House rules

Component shape, CVA/styling, atomic-design layout, and server-components-by-default are covered by the vendored `components` and `nextjs` skills. Project-specific data-layer rules that aren't generic:

1. **oRPC boundary.** Dynamic, user-specific data (profile, friends, compatibility reveals) goes through typed oRPC procedures in `src/server/`, validated with zod, typed by `types/`. Static content lives in `constants/`, never inline in components; the seed data in `constants/` is the data contract until Postgres lands.
2. **Matching model status.** Compatibility scores are still authored seed data — the matching model is designed, not yet computed (see [docs/prd/06-matching.md](docs/prd/06-matching.md)).

## Working discipline

1. **Verification.** A change is done when `pnpm lint:check`, `pnpm type:check`, and `pnpm test` pass. A dev or start server spun up to verify runs on an explicit non-3000 port and is killed by its own pid; never `pkill` by name.
2. **Git.** Never push to `main`. Conventional Commits (`feat`, `fix`, `docs`, `refactor`, `chore`, ...), subject <= 72 chars, lowercase, no trailing period. No AI/agent attribution in commits or PRs.
3. **Docs and code change together.** A discovery that outlives the task is written back to the owning doc, not left in a commit message or the agent's memory. The repo is the memory.
