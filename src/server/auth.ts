import { cookies } from 'next/headers'
import { getUserById } from '@/server/store/users'
import { type User } from '@/types/user'
import 'server-only'

/** Name of the session cookie holding the signed-in user's id. */
const COOKIE = 'kindred_uid'

/** The id of the signed-in member, or `null`. Readable in any server context. */
const getSessionUserId = async (): Promise<string | null> => {
  const store = await cookies()
  return store.get(COOKIE)?.value ?? null
}

/** Start a session for a member. Writable only in a Route Handler or Server Action. */
const setSession = async (userId: string): Promise<void> => {
  const store = await cookies()
  store.set(COOKIE, userId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30
  })
}

/** End the current session. Writable only in a Route Handler or Server Action. */
const clearSession = async (): Promise<void> => {
  const store = await cookies()
  store.delete(COOKIE)
}

/** The signed-in member, or `null`. */
const currentUser = async (): Promise<User | null> => {
  const id = await getSessionUserId()
  if (!id) return null
  return getUserById(id)
}

/**
 * The storage key and display name for the viewer: their id and username when signed in, or the
 * shared anonymous profile otherwise. Lets profile and friends work before a member signs up.
 */
const viewerScope = async (): Promise<{
  key: string
  displayName: string
  userId: string | null
}> => {
  const user = await currentUser()
  if (user) return { key: user.id, displayName: user.username, userId: user.id }
  return { key: 'anon', displayName: 'You', userId: null }
}

export { clearSession, currentUser, getSessionUserId, setSession, viewerScope }
