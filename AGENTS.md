# AGENTS.md

Guidance for AI coding agents working in this repository: Kindred (working name), a compatibility app where a member fills out a self-questionnaire, connects friends, and reveals how compatible they are with each. Interaction patterns are modeled on [222.place](https://222.place); the product direction and design are our own. What the app is lives in [README.md](README.md); the rules and requirements live in `docs/`.

## Read first, in order

@README.md
@docs/01-standards/process.md
@docs/01-standards/writing.md
@docs/01-standards/nextjs.md
@docs/01-standards/components.md
@docs/01-standards/data.md
@docs/02-prd/01-brief.md
@docs/02-prd/02-design-system.md
@docs/02-prd/06-matching.md
@docs/02-prd/07-architecture.md

The remaining standards ([testing](docs/01-standards/testing.md), [performance](docs/01-standards/performance.md), [accessibility](docs/01-standards/accessibility.md), [seo](docs/01-standards/seo.md), [git](docs/01-standards/git.md)) and the per-surface PRD docs ([profile](docs/02-prd/03-profile.md), [compatibility](docs/02-prd/04-compatibility.md), [add-friends](docs/02-prd/05-add-friends.md)) are read just in time.

## Decision framework

When a choice is not settled by this repo's own code, README, or an obvious default, apply [harness-engineering](https://github.com/tkodev/harness-engineering) as the decision maker: read the target's local truth first, name the one unresolved decision, route to the single relevant thesis, and let this repo's contracts govern over any imported guidance. Do not preload the corpus; follow its links just in time.

## Stack

pnpm 11 (never npm or yarn), Node >= 24, TypeScript strict, Next.js 16 App Router, Tailwind v4 (CSS-first `@theme`, no `tailwind.config`), CVA with `cn()` = `twMerge(clsx(...))`, shadcn/Radix primitives, `lucide-react`, `date-fns`, Vitest. The data layer is **oRPC**: user-specific data (profile, friends, compatibility reveals) flows through typed procedures in `src/server/`, validated with zod; seed data lives in `constants/`. Persistence targets Postgres via `docker compose` ([docs/02-prd/07-architecture.md](docs/02-prd/07-architecture.md)); procedures read seed constants until it lands, and the seed is the data contract.

## House rules

These come from `docs/01-standards/` (the tkodev standards); the load-bearing ones:

1. **Component shape.** Every component is a single `styles` object of `cva()` calls on top, then `XxxRef` / `XxxProps` types, then the component; named exports only, no default exports. Props destructure, then hooks, then render vars, then jsx composed with `cn()`.
2. **Styling.** CVA for all visual variants, never ad-hoc className conditionals. Semantic tokens only: no raw hex, no palette utilities (`text-zinc-400`), no arbitrary sizes. Layout utilities (`w-full`, margins, grid placement) live at the call site; color, radius, type, borders live in the CVA.
3. **Atomic design.** Components live under `components/` as `atoms/` (buttons, badges), `molecules/` (cards, forms), `organisms/` (dialogs, menus), `templates/` (header, footer, layout, section). shadcn CLI imports land in `atoms/` and are reformatted to the house shape on arrival.
4. **Data discipline.** Dynamic, user-specific data goes through oRPC procedures, typed by `types/`. Static content lives in `constants/`, never inline in components. Keep client state local (`useState`, URL params); no speculative global state. Dates zone through `date-fns-tz`, never bare `new Date()`.
5. **Server components by default.** `'use client'` only where state or browser APIs demand it, and as low in the tree as possible.

## Working discipline

1. **Verification.** A change is done when `pnpm lint:check`, `pnpm type:check`, and `pnpm test` pass. A dev or start server spun up to verify runs on an explicit non-3000 port and is killed by its own pid; never `pkill` by name.
2. **Git.** Never push to `main`. Conventional Commits (`feat`, `fix`, `docs`, `refactor`, `chore`, ...), subject <= 72 chars, lowercase, no trailing period. No AI/agent attribution in commits or PRs.
3. **Docs and code change together.** A discovery that outlives the task is written back to the owning doc, not left in a commit message or the agent's memory. The repo is the memory.
