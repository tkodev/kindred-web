import { ORPCError } from '@orpc/server'
import { z } from 'zod'
import { clearSession, currentUser, setSession } from '@/server/auth'
import { pub } from '@/server/orpc'
import { createUser, getUserByUsername } from '@/server/store/users'
import { type User } from '@/types/user'

/** Username rule: 2-24 chars, letters/numbers/underscore, stored lowercase. */
const usernameInput = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, 'Username must be at least 2 characters')
    .max(24, 'Username must be at most 24 characters')
    .regex(/^[a-z0-9_]+$/, 'Use letters, numbers, and underscores only')
})

/** Create a member and start their session. Rejects a taken username. */
const signup = pub.input(usernameInput).handler(async ({ input }): Promise<User> => {
  const existing = await getUserByUsername(input.username)
  if (existing) throw new ORPCError('CONFLICT', { message: 'That username is taken' })
  const user = await createUser(input.username)
  await setSession(user.id)
  return user
})

/** Start a session for an existing member. Rejects an unknown username. */
const login = pub.input(usernameInput).handler(async ({ input }): Promise<User> => {
  const user = await getUserByUsername(input.username)
  if (!user) throw new ORPCError('NOT_FOUND', { message: 'No member with that username' })
  await setSession(user.id)
  return user
})

/** End the current session. */
const logout = pub.handler(async () => {
  await clearSession()
  return { ok: true as const }
})

/** The signed-in member, or `null`. */
const me = pub.handler(async (): Promise<User | null> => {
  return currentUser()
})

/** Username-only authentication: no passwords, no email. */
const authRouter = { signup, login, logout, me }

export { authRouter }
