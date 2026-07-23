import postgres, { type Sql } from 'postgres'
import 'server-only'

/**
 * The single Postgres connection, or `null` when `DATABASE_URL` is unset. A null client is not an
 * error: the store modules fall back to an in-process map so the app runs without Docker. Bring
 * the database up with `docker compose up -d` and set `DATABASE_URL` (see `.env.example`).
 */
const url = process.env.DATABASE_URL
const sql: Sql | null = url
  ? postgres(url, { onnotice: () => {}, connect_timeout: 5, max: 5 })
  : null

/** Whether a Postgres connection is configured; the stores branch on this. */
const hasDb = sql !== null

/** Schema applied lazily on first access. Kept inline so no migration step or `.sql` asset is needed. */
const schema = `
  create table if not exists users (
    id uuid primary key default gen_random_uuid(),
    username text unique not null,
    created_at timestamptz not null default now()
  );
  create table if not exists profiles (
    user_id uuid primary key references users(id) on delete cascade,
    data jsonb not null,
    updated_at timestamptz not null default now()
  );
  create table if not exists reveals (
    user_id uuid not null references users(id) on delete cascade,
    friend_id text not null,
    score integer not null,
    dimensions jsonb not null,
    revealed_at timestamptz not null default now(),
    primary key (user_id, friend_id)
  );
`

let ensured: Promise<void> | null = null
let disabled = false

/**
 * Returns the connection with the schema guaranteed to exist, or `null` when no usable database is
 * configured. If the database is unreachable or rejects the credentials, the connection is disabled
 * for the process and the stores fall back to in-memory, so a bad `DATABASE_URL` degrades rather
 * than throwing. The schema check runs once. Store code: `const client = await db()`.
 */
const db = async (): Promise<Sql | null> => {
  if (!sql || disabled) return null
  try {
    ensured ??= sql.unsafe(schema).then(() => undefined)
    await ensured
    return sql
  } catch (error) {
    disabled = true
    ensured = null
    const message = error instanceof Error ? error.message : String(error)
    console.error(`[db] disabled, using in-memory store: ${message}`)
    return null
  }
}

export { db, hasDb }
