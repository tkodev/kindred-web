import { z } from 'zod'
import { viewerScope } from '@/server/auth'
import { pub } from '@/server/orpc'
import { getProfile, setAnswer } from '@/server/store/profiles'
import { type Profile } from '@/types/profile'

/** The viewer's questionnaire: every category, section, and answer. Seeded on first read. */
const get = pub.handler(async (): Promise<Profile> => {
  const { key, displayName } = await viewerScope()
  return getProfile(key, displayName)
})

/** Save one question's answer (text/enum) or scale score, returning the updated profile. */
const setAnswerProc = pub
  .input(
    z.object({
      questionId: z.string().min(1),
      answer: z.string().nullable().optional(),
      score: z.number().int().min(0).optional()
    })
  )
  .handler(async ({ input }): Promise<Profile> => {
    const { key, displayName } = await viewerScope()
    return setAnswer(key, displayName, input)
  })

/** Procedures owning a member's questionnaire. */
const profileRouter = { get, setAnswer: setAnswerProc }

export { profileRouter }
