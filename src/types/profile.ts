/** The fixed set of questionnaire categories a profile is organized into. */
type ProfileCategoryId =
  'self' | 'professional' | 'interests' | 'music' | 'screen' | 'going-out' | 'background'

/** A single answered question shown as a tappable row: a label with its answer beneath. */
type ProfileQuestion = {
  id: string
  label: string
  /** Free-text or enumerated answer, shown under the label; `null` when unanswered. */
  answer: string | null
  /** Present when the answer is a self-rating, rendered as `score / max` (e.g. `8 / 10`). */
  scale?: { score: number; max: number }
}

/** A selectable tag: an interest, hobby, artist, or occupation. A starred chip is a signal
    the matcher weights more heavily (a favorite or a dealbreaker), per the matching model. */
type ProfileChip = {
  id: string
  label: string
  isFavorite: boolean
}

/** A richer list item with a subtitle and optional year: a university, a film, a show. */
type ProfileEntry = {
  id: string
  title: string
  subtitle?: string
  isFavorite?: boolean
}

/** One titled block within a category, typed by how its items render. */
type ProfileSection =
  | { id: string; title: string; kind: 'questions'; questions: ProfileQuestion[] }
  | { id: string; title: string; kind: 'chips'; chips: ProfileChip[] }
  | { id: string; title: string; kind: 'entries'; entries: ProfileEntry[] }

/** A questionnaire category with its completion percentage and its sections. */
type ProfileCategory = {
  id: ProfileCategoryId
  name: string
  /** Completion as a whole percentage, 0 to 100. */
  completion: number
  sections: ProfileSection[]
}

/** A member's full questionnaire: identity plus every category. */
type Profile = {
  displayName: string
  categories: ProfileCategory[]
}

export type {
  Profile,
  ProfileCategory,
  ProfileCategoryId,
  ProfileChip,
  ProfileEntry,
  ProfileQuestion,
  ProfileSection
}
