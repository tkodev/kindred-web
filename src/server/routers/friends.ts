import { z } from 'zod'
import {
  appFriends,
  buildFallbackNarrative,
  buildFallbackResult,
  compatibilityNarratives,
  compatibilityResults,
  friendRequests,
  friendSuggestions,
  offAppContacts
} from '@/constants/friends'
import { viewerScope } from '@/server/auth'
import { pub } from '@/server/orpc'
import { listRevealed, saveReveal } from '@/server/store/reveals'
import {
  type AppFriend,
  type CompatibilityInsight,
  type CompatibilityResult,
  type FriendRequest,
  type FriendSuggestion,
  type OffAppContact
} from '@/types/friends'

/**
 * The compatibility list: friends on the app plus invitable off-app contacts. For a signed-in
 * member, friends they have already revealed come back with `state: 'revealed'`.
 */
const list = pub.handler(async (): Promise<{ onApp: AppFriend[]; offApp: OffAppContact[] }> => {
  const { userId } = await viewerScope()
  const revealed = userId ? await listRevealed(userId) : new Set<string>()
  const onApp = appFriends.map((friend) =>
    revealed.has(friend.id)
      ? { ...friend, compatibility: { ...friend.compatibility, state: 'revealed' as const } }
      : friend
  )
  return { onApp, offApp: offAppContacts }
})

const resolveResult = (friendId: string): CompatibilityResult => {
  const authored = compatibilityResults[friendId]
  if (authored) return authored
  const friend = appFriends.find((entry) => entry.id === friendId)
  return buildFallbackResult(friendId, friend?.compatibility.score ?? 70)
}

/**
 * Reveal a pair's compatibility. Seed behavior returns an authored or derived breakdown; the
 * real procedure scores both questionnaires per docs/02-prd/06-matching.md and records the unlock.
 */
const reveal = pub
  .input(z.object({ friendId: z.string().min(1) }))
  .handler(async ({ input }): Promise<CompatibilityResult> => {
    const result = resolveResult(input.friendId)
    const { userId } = await viewerScope()
    if (userId) await saveReveal(userId, result)
    return result
  })

/**
 * The full compatibility read for the detail screen: headline, narrative, breakdown, and shared
 * quirks. Narrative and quirks are authored seed today; a later pass generates them per pair.
 */
const insight = pub
  .input(z.object({ friendId: z.string().min(1) }))
  .handler(async ({ input }): Promise<CompatibilityInsight | null> => {
    const friend = appFriends.find((entry) => entry.id === input.friendId)
    if (!friend) return null
    const result = resolveResult(input.friendId)
    const narrative =
      compatibilityNarratives[input.friendId] ?? buildFallbackNarrative(result.score)
    return {
      friendId: friend.id,
      name: friend.name,
      initials: friend.initials,
      score: result.score,
      headline: narrative.headline,
      narrative: narrative.narrative,
      dimensions: result.dimensions,
      sharedQuirks: narrative.quirks,
      source: 'authored'
    }
  })

/** Incoming friend requests awaiting a response. */
const requests = pub.handler(async (): Promise<FriendRequest[]> => {
  return friendRequests
})

/** People-you-may-know suggestions, optionally narrowed by a search query. */
const suggestions = pub
  .input(z.object({ query: z.string() }).optional())
  .handler(async ({ input }): Promise<FriendSuggestion[]> => {
    const query = input?.query?.trim().toLowerCase() ?? ''
    if (!query) return friendSuggestions
    return friendSuggestions.filter((entry) => entry.name.toLowerCase().includes(query))
  })

const respondRequest = pub
  .input(z.object({ requestId: z.string().min(1), action: z.enum(['accept', 'decline']) }))
  .handler(async ({ input }) => {
    return { requestId: input.requestId, action: input.action }
  })

const sendRequest = pub
  .input(z.object({ userId: z.string().min(1) }))
  .handler(async ({ input }) => {
    return { userId: input.userId, requested: true as const }
  })

const invite = pub.input(z.object({ contactId: z.string().min(1) })).handler(async ({ input }) => {
  return { contactId: input.contactId, invited: true as const }
})

/** Procedures owning the friend graph, compatibility reveals, and the add-friends flow. */
const friendsRouter = {
  list,
  reveal,
  insight,
  requests,
  suggestions,
  respondRequest,
  sendRequest,
  invite
}

export { friendsRouter }
