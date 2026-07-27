# Architecture

How the app is shaped: stack, the oRPC data layer, and the path from seed data to Postgres. The component rules are [components.md](../01-standards/components.md)'s; the tokens are [02-design-system.md](02-design-system.md)'s.

## Stack

| Layer | Choice |
| --- | --- |
| Package manager | pnpm 11, Node >= 24 |
| Framework | Next.js 16, App Router, TypeScript strict |
| Data layer | oRPC: typed procedures in `src/server/`, one fetch handler at `/rpc` |
| Validation | zod input schemas on every procedure that takes input |
| Styling | Tailwind v4 (CSS-first `@theme`), CVA with `cn()` |
| Persistence | Postgres 16 via Docker Compose (target; see §Data layer) |

## Data layer

Every user-specific read and write flows through oRPC, not ad-hoc fetches. The router is rooted in [`src/server/router.ts`](../../src/server/router.ts) and split by domain: `profile` and `friends`. Two clients consume it:

- **Server (in-process):** [`src/server/client.ts`](../../src/server/client.ts) calls procedures with no HTTP hop; Server Components use it to fetch initial state.
- **Browser (fetch):** [`src/utils/orpc.ts`](../../src/utils/orpc.ts) is the typed client for interactions (reveal, search, respond, invite).

The pattern is: a server page fetches the initial payload through the in-process client and passes it to a client organism, which handles interaction through the browser client. This keeps first paint static-fast and interactions typed end to end.

## From seed to Postgres

Today every procedure reads authored seed constants in `src/constants/`; the seed is the data contract. Persistence is intended to land as **Postgres via Docker Compose**, without changing the procedure signatures:

1. **Bring up the database** with `docker compose up -d`; the connection string is read from `DATABASE_URL` (see [`.env.example`](../../.env.example)).
2. **Introduce a typed data-access layer** under `src/server/db/` (schema plus queries); procedures call it instead of reading constants.
3. **Keep the seed as fixtures.** The constants become the seed script and the fixtures tests run against, so the contract this PRD describes stays the source of truth.

Because the boundary is the oRPC procedure, the swap is invisible to every component: they already depend only on the procedure's return type.

## Rendering model

- Marketing and shell content is static; user-specific data is fetched per request through oRPC.
- One root `app/layout.tsx` holds the persistent shell; each surface is a route under `app/` mirroring [01-brief.md](01-brief.md) §What is in scope now.
