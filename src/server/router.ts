import { pub } from '@/server/orpc'
import { authRouter } from '@/server/routers/auth'
import { friendsRouter } from '@/server/routers/friends'
import { profileRouter } from '@/server/routers/profile'

/** Liveness probe: confirms the RPC layer is reachable. */
const health = pub.handler(async () => ({ ok: true as const }))

/** The application's root oRPC router: every procedure the client can reach hangs off this. */
const router = {
  health,
  auth: authRouter,
  profile: profileRouter,
  friends: friendsRouter
}

type Router = typeof router

export { router }
export type { Router }
