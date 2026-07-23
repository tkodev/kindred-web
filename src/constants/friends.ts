import {
  type AppFriend,
  type CompatibilityInsight,
  type CompatibilityResult,
  type FriendRequest,
  type FriendSuggestion,
  type OffAppContact
} from '@/types/friends'

/** Seed friends already on the app, with pairwise compatibility. Locked scores reveal on tap. */
const appFriends: AppFriend[] = [
  {
    id: 'nadia',
    name: 'Nadia Rahman',
    initials: 'NR',
    compatibility: { score: 91, state: 'revealed' }
  },
  {
    id: 'marcus',
    name: 'Marcus Lindqvist',
    initials: 'ML',
    compatibility: { score: 84, state: 'locked' }
  },
  {
    id: 'priya',
    name: 'Priya Anand',
    initials: 'PA',
    compatibility: { score: 78, state: 'locked' }
  },
  {
    id: 'thomas',
    name: 'Thomas Beaulieu',
    initials: 'TB',
    compatibility: { score: 73, state: 'locked' }
  },
  {
    id: 'yuki',
    name: 'Yuki Tanaka',
    initials: 'YT',
    compatibility: { score: 69, state: 'locked' }
  },
  { id: 'dana', name: 'Dana Okafor', initials: 'DO', compatibility: { score: 62, state: 'locked' } }
]

/** Seed contacts not yet on the app, invitable from the compatibility list. */
const offAppContacts: OffAppContact[] = [
  { id: 'contact-sam', name: 'Sam Whitfield', initials: 'SW', invited: false },
  { id: 'contact-lea', name: 'Léa Moreau', initials: 'LM', invited: true },
  { id: 'contact-ade', name: 'Adeola Balogun', initials: 'AB', invited: false }
]

/** Seed incoming friend requests for the add-friends screen. */
const friendRequests: FriendRequest[] = [
  { id: 'req-omar', name: 'Omar Haddad', initials: 'OH', mutuals: 4 },
  { id: 'req-claire', name: 'Claire Devereux', initials: 'CD', mutuals: 2 }
]

/** Seed people-you-may-know suggestions for the add-friends screen. */
const friendSuggestions: FriendSuggestion[] = [
  {
    id: 'sug-ravi',
    name: 'Ravi Menon',
    initials: 'RM',
    mutuals: 6,
    reason: '2 dinners together',
    requested: false
  },
  {
    id: 'sug-ingrid',
    name: 'Ingrid Sørensen',
    initials: 'IS',
    mutuals: 3,
    reason: 'both know Nadia',
    requested: false
  },
  {
    id: 'sug-julien',
    name: 'Julien Fontaine',
    initials: 'JF',
    mutuals: 5,
    reason: 'same neighborhood',
    requested: true
  },
  {
    id: 'sug-amara',
    name: 'Amara Nwosu',
    initials: 'AN',
    mutuals: 2,
    reason: 'matched interests',
    requested: false
  }
]

/**
 * Seed compatibility breakdowns keyed by friend id, returned by `friends.reveal`. The real
 * procedure computes these from both questionnaires per the model in docs/02-prd/06-matching.md.
 */
const compatibilityResults: Record<string, CompatibilityResult> = {
  nadia: {
    friendId: 'nadia',
    score: 91,
    dimensions: [
      { label: 'Values', score: 94 },
      { label: 'Lifestyle', score: 88 },
      { label: 'Interests', score: 90 },
      { label: 'Social energy', score: 86 },
      { label: 'Ambition', score: 95 }
    ]
  },
  marcus: {
    friendId: 'marcus',
    score: 84,
    dimensions: [
      { label: 'Values', score: 80 },
      { label: 'Lifestyle', score: 82 },
      { label: 'Interests', score: 91 },
      { label: 'Social energy', score: 79 },
      { label: 'Ambition', score: 88 }
    ]
  }
}

/** Fallback breakdown for a friend without an authored one, derived from the headline score. */
const buildFallbackResult = (friendId: string, score: number): CompatibilityResult => ({
  friendId,
  score,
  dimensions: [
    { label: 'Values', score: Math.min(100, score + 3) },
    { label: 'Lifestyle', score: Math.max(0, score - 4) },
    { label: 'Interests', score: Math.min(100, score + 6) },
    { label: 'Social energy', score: Math.max(0, score - 2) },
    { label: 'Ambition', score }
  ]
})

/**
 * Seed narratives and shared quirks keyed by friend id, returned by `friends.insight`. Authored
 * placeholders until generation lands; the detail screen renders these alongside the breakdown.
 */
const compatibilityNarratives: Record<
  string,
  { headline: string; narrative: string; quirks: CompatibilityInsight['sharedQuirks'] }
> = {
  nadia: {
    headline: 'Kindred over a long table',
    narrative:
      'You two want the same night: a slow dinner, a handful of people, a conversation that runs past midnight. You match almost perfectly on what you value and how hard you push yourselves, and you balance each other on energy, so neither of you has to perform.',
    quirks: [
      {
        title: 'Sunday cooks',
        detail: 'You both treat cooking as the week winding down, not a chore.'
      },
      {
        title: 'Recovering over-planners',
        detail: 'Each of you rates high on ambition but low on needing the night scripted.'
      },
      {
        title: 'Quietly competitive',
        detail: 'Put you at a trivia table together and it stops being casual.'
      }
    ]
  },
  marcus: {
    headline: 'Same taste, different tempo',
    narrative:
      'Your interests overlap more than almost anyone on your list, especially around music and the way you both talk about work. Where you differ is pace: Marcus runs a little hotter socially, which tends to pull your quieter evenings somewhere more interesting.',
    quirks: [
      {
        title: 'Record-store energy',
        detail: 'You could lose an afternoon comparing favorite artists.'
      },
      {
        title: 'Talks shop for fun',
        detail: 'Both of you actually enjoy work talk when you meet new people.'
      }
    ]
  }
}

/** Fallback narrative for a friend without an authored one, phrased from the headline score. */
const buildFallbackNarrative = (
  score: number
): { headline: string; narrative: string; quirks: CompatibilityInsight['sharedQuirks'] } => ({
  headline: score >= 75 ? 'A lot to build on' : 'Worth an evening',
  narrative:
    'You share more than the score alone suggests, especially around how you like to spend a night out and what you look for in the people around you. Reveal the breakdown to see where you line up and where you pull each other somewhere new.',
  quirks: [
    {
      title: 'Shared table',
      detail: 'You gravitate to the same kind of small, unhurried gatherings.'
    },
    {
      title: 'Curious by default',
      detail: 'Both of you would rather ask a real question than make small talk.'
    }
  ]
})

export {
  appFriends,
  buildFallbackNarrative,
  buildFallbackResult,
  compatibilityNarratives,
  compatibilityResults,
  friendRequests,
  friendSuggestions,
  offAppContacts
}
