# Kindred

A compatibility app for the people already in your life. You fill out a questionnaire about yourself, connect your friends, and reveal how compatible you are with each of them across the dimensions that actually predict a good relationship. Built for adults in their 30s and 40s who want depth over volume: close friendships first, dating where it fits.

**Status: working prototype.** Every surface renders end to end over a typed oRPC layer. Username-only sign-in and profile editing persist to Postgres, with an in-memory fallback so the app runs without Docker. Compatibility scores are still authored seed data (the matching model in [docs/prd/06-matching.md](docs/prd/06-matching.md) is designed, not yet computed). `Kindred` is a working name.

> The compatibility and questionnaire interaction patterns are modeled on [222.place](https://222.place); the color language and product direction are our own.

## Surfaces

| Route | Surface | What it does |
| --- | --- | --- |
| [`/`](src/app/page.tsx) | Home | The premise, plus username-only sign-in |
| [`/profile`](src/app/profile/page.tsx) | Profile | The self-questionnaire; every question edits and saves in a dialog |
| [`/friends`](src/app/friends/page.tsx) | Compatibility | Your friends, with pairwise scores that animate on reveal |
| [`/friends/[id]`](src/app/friends/[id]/page.tsx) | Detail | One pair: the score, the breakdown, and shared quirks |
| [`/friends/add`](src/app/friends/add/page.tsx) | Add friends | Search, requests, and suggestions |

## Tech stack

| Layer | Choice |
| --- | --- |
| Package manager | pnpm 11, Node >= 24 |
| Framework | Next.js 16, App Router, TypeScript strict |
| Data layer | oRPC (typed procedures at `/rpc`) with zod input validation |
| Auth | Username-only (no passwords), httpOnly cookie session |
| Persistence | Postgres 16 via Docker Compose, `postgres.js`; in-memory fallback when unset |
| Styling | Tailwind v4 (`@theme`), CVA with `cn()`, an editorial serif over Geist |
| Testing | Vitest |

The authoritative stack, data-layer, and seed-to-Postgres notes are [docs/prd/07-architecture.md](docs/prd/07-architecture.md).

## Getting started

```bash
pnpm install      # install deps
pnpm dev          # local dev server
pnpm build        # production build
pnpm lint:check   # eslint
pnpm type:check   # typescript
pnpm test         # vitest

docker compose up -d   # Postgres on :5433 for persistence, then set DATABASE_URL (.env.example)
```

Without `DATABASE_URL` set (or if the database is unreachable) the app runs against an in-process store, so `pnpm dev` works out of the box; bring up Docker for real persistence.

## Repo structure

```text
.
├── CLAUDE.md               # agent orientation (CLAUDE.md symlinks here)
├── docker-compose.yml      # Postgres 16 for the persistence target
├── .claude/skills/         # vendored house-standard skills (symlink)
├── .agents/skills/         # same skills, agent-agnostic path (symlink)
├── docs/
│   └── prd/                # the numbered product docs, read in order
└── src/
    ├── app/                # routes: /, /profile, /friends, /friends/[id], /friends/add, /rpc
    ├── components/         # atoms · molecules · organisms · templates
    ├── server/             # oRPC routers, auth, db client + schema, stores
    ├── constants/          # seed data + site config
    ├── types/              # domain types (profile, friends, user)
    ├── themes/             # Tailwind v4 token files
    └── utils/              # cn/cva, dates, browser oRPC client
```

## Docs

House standards (component shape, data discipline, Next.js conventions, accessibility, performance, testing, seo, git, writing, process) are vendored as skills, symlinked at `.claude/skills/` and `.agents/skills/`. The PRD ([docs/prd/](docs/prd/)) is the product pipeline:

| Doc | Owns |
| --- | --- |
| [01-brief](docs/prd/01-brief.md) | What Kindred is, the audience, the aesthetic |
| [02-design-system](docs/prd/02-design-system.md) | Color, type, and the component inventory |
| [03-profile](docs/prd/03-profile.md) | The self-questionnaire surface |
| [04-compatibility](docs/prd/04-compatibility.md) | The friends list and reveal |
| [05-add-friends](docs/prd/05-add-friends.md) | The add-friends surface (our own, not in the source) |
| [06-matching](docs/prd/06-matching.md) | Preliminary compatibility-scoring model |
| [07-architecture](docs/prd/07-architecture.md) | Stack, oRPC data layer, seed-to-Postgres path |

For AI-agent orientation see [CLAUDE.md](CLAUDE.md); `CLAUDE.md` symlinks to it.
