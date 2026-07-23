import { seedProfile } from '@/constants/profile'
import { db } from '@/server/db/client'
import { type Profile } from '@/types/profile'
import 'server-only'

/** In-process fallback for anonymous visitors and for when no database is configured. */
const mem = new Map<string, Profile>()

/** The anonymous key: a not-signed-in visitor edits a single shared profile in-process. */
const ANON = 'anon'

/** A fresh copy of the seed questionnaire, stamped with the viewer's display name. */
const seededProfile = (displayName: string): Profile => {
  const profile = structuredClone(seedProfile)
  profile.displayName = displayName
  return profile
}

/** Whether this key should persist to Postgres (a real user id) versus the in-process map. */
const usesDb = (key: string) => key !== ANON

/** Load a member's profile, creating it from the seed on first read. */
const getProfile = async (key: string, displayName: string): Promise<Profile> => {
  const client = await db()
  if (client && usesDb(key)) {
    const rows = await client<{ data: Profile }[]>`select data from profiles where user_id = ${key}`
    if (rows[0]) return rows[0].data
    const seeded = seededProfile(displayName)
    await client`
      insert into profiles (user_id, data) values (${key}, ${client.json(seeded)})
      on conflict (user_id) do nothing
    `
    return seeded
  }
  const existing = mem.get(key)
  if (existing) return existing
  const seeded = seededProfile(displayName)
  mem.set(key, seeded)
  return seeded
}

/** Overwrite a member's stored profile. */
const saveProfile = async (key: string, profile: Profile): Promise<void> => {
  const client = await db()
  if (client && usesDb(key)) {
    await client`
      insert into profiles (user_id, data, updated_at) values (${key}, ${client.json(profile)}, now())
      on conflict (user_id) do update set data = excluded.data, updated_at = now()
    `
    return
  }
  mem.set(key, profile)
}

/** A single question edit: a text/enum answer, or a new score for a scale question. */
type AnswerEdit = {
  questionId: string
  answer?: string | null
  score?: number
}

/** Apply one answer edit to a member's profile and persist it, returning the updated profile. */
const setAnswer = async (key: string, displayName: string, edit: AnswerEdit): Promise<Profile> => {
  const current = await getProfile(key, displayName)
  const next = structuredClone(current)
  for (const category of next.categories) {
    for (const section of category.sections) {
      if (section.kind !== 'questions') continue
      for (const question of section.questions) {
        if (question.id !== edit.questionId) continue
        if (question.scale && typeof edit.score === 'number') {
          question.scale.score = Math.max(0, Math.min(question.scale.max, Math.round(edit.score)))
        } else {
          question.answer = edit.answer?.trim() ? edit.answer.trim() : null
        }
      }
    }
  }
  await saveProfile(key, next)
  return next
}

export { getProfile, saveProfile, setAnswer }
export type { AnswerEdit }
