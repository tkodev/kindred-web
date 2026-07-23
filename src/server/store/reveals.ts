import { db } from '@/server/db/client'
import { type CompatibilityResult } from '@/types/friends'
import 'server-only'

/** In-process fallback: userId -> (friendId -> result). */
const mem = new Map<string, Map<string, CompatibilityResult>>()

/** The set of friend ids this member has already revealed. */
const listRevealed = async (userId: string): Promise<Set<string>> => {
  const client = await db()
  if (client) {
    const rows = await client<{ friend_id: string }[]>`
      select friend_id from reveals where user_id = ${userId}
    `
    return new Set(rows.map((row) => row.friend_id))
  }
  return new Set(mem.get(userId)?.keys() ?? [])
}

/** Record a revealed compatibility result so the pair stays unlocked across sessions. */
const saveReveal = async (userId: string, result: CompatibilityResult): Promise<void> => {
  const client = await db()
  if (client) {
    await client`
      insert into reveals (user_id, friend_id, score, dimensions)
      values (${userId}, ${result.friendId}, ${result.score}, ${client.json(result.dimensions)})
      on conflict (user_id, friend_id) do update
        set score = excluded.score, dimensions = excluded.dimensions, revealed_at = now()
    `
    return
  }
  const byFriend = mem.get(userId) ?? new Map()
  byFriend.set(result.friendId, result)
  mem.set(userId, byFriend)
}

export { listRevealed, saveReveal }
