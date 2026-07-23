/** Whether a pair's compatibility score has been unlocked or is still hidden. */
type CompatibilityState = 'revealed' | 'locked'

/** A friend who is on the app: their identity and the pairwise compatibility with the viewer. */
type AppFriend = {
  id: string
  name: string
  /** One or two letters shown in the avatar when no photo is set. */
  initials: string
  compatibility: {
    /** Whole-number score, 0 to 100. */
    score: number
    state: CompatibilityState
  }
}

/** A contact who is not yet on the app and can be invited. */
type OffAppContact = {
  id: string
  name: string
  initials: string
  invited: boolean
}

/** An incoming friend request awaiting the viewer's response. */
type FriendRequest = {
  id: string
  name: string
  initials: string
  /** Count of friends in common, the trust signal shown on the row. */
  mutuals: number
}

/** A suggested person to connect with, surfaced on the add-friends screen. */
type FriendSuggestion = {
  id: string
  name: string
  initials: string
  mutuals: number
  /** Short human reason the suggestion surfaced, e.g. `2 dinners together`. */
  reason: string
  /** Whether the viewer has already sent this person a request. */
  requested: boolean
}

/** One axis of a compatibility result: how aligned a pair is on a single dimension. */
type CompatibilityDimension = {
  /** Human label, e.g. `Values`, `Lifestyle`, `Interests`. */
  label: string
  /** Whole-number sub-score, 0 to 100. */
  score: number
}

/** The result of revealing a pair's compatibility: the headline score and its breakdown. */
type CompatibilityResult = {
  friendId: string
  score: number
  dimensions: CompatibilityDimension[]
}

/** A trait the pair shares, surfaced on the detail screen as a small card. */
type SharedQuirk = {
  /** Short label, e.g. `Sunday cooks` or `Recovering over-planners`. */
  title: string
  /** One sentence on how the trait shows up for both of them. */
  detail: string
}

/**
 * The full compatibility read for a pair, shown on the detail screen: the headline score, a
 * short narrative, the per-dimension breakdown, and the quirks they share. The narrative and
 * quirks are authored seed today; a later pass generates them from both profiles.
 */
type CompatibilityInsight = {
  friendId: string
  name: string
  initials: string
  score: number
  /** One evocative line summing up the pair, e.g. `Kindred over a long table`. */
  headline: string
  /** Two or three sentences on why they fit. */
  narrative: string
  dimensions: CompatibilityDimension[]
  sharedQuirks: SharedQuirk[]
  /** Whether the narrative and quirks are hand-authored or model-generated. */
  source: 'authored' | 'generated'
}

export type {
  AppFriend,
  CompatibilityDimension,
  CompatibilityInsight,
  CompatibilityResult,
  CompatibilityState,
  FriendRequest,
  FriendSuggestion,
  OffAppContact,
  SharedQuirk
}
