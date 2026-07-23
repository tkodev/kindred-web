import { randomUUID } from 'node:crypto'
import { db } from '@/server/db/client'
import { type User } from '@/types/user'
import 'server-only'

/** In-process fallback used when no database is configured. Survives within one server process. */
const mem = new Map<string, User>()

/** Look up a member by their (case-normalized) username. */
const getUserByUsername = async (username: string): Promise<User | null> => {
  const client = await db()
  if (client) {
    const rows = await client<User[]>`select id, username from users where username = ${username}`
    return rows[0] ?? null
  }
  for (const user of mem.values()) {
    if (user.username === username) return user
  }
  return null
}

/** Look up a member by id. */
const getUserById = async (id: string): Promise<User | null> => {
  const client = await db()
  if (client) {
    const rows = await client<User[]>`select id, username from users where id = ${id}`
    return rows[0] ?? null
  }
  return mem.get(id) ?? null
}

/** Create a member. Callers check {@link getUserByUsername} first; the unique index is the backstop. */
const createUser = async (username: string): Promise<User> => {
  const client = await db()
  if (client) {
    const rows = await client<User[]>`
      insert into users (username) values (${username})
      returning id, username
    `
    return rows[0]
  }
  const user: User = { id: randomUUID(), username }
  mem.set(user.id, user)
  return user
}

export { createUser, getUserById, getUserByUsername }
