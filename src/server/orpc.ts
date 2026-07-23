import { os } from '@orpc/server'

/**
 * Base builder for public procedures. Auth, session, and request context attach here as
 * middleware once the data layer lands (`pub.use(...)` / `os.$context<Ctx>()`); every
 * procedure derives from this so the cross-cutting rules live in one place.
 */
const pub = os

export { pub }
