import { createRouterClient } from '@orpc/server'
import { router } from '@/server/router'
import 'server-only'

/**
 * Server-side client that calls procedures in-process, with no HTTP round trip. Use in Server
 * Components and other server code; browser code uses the fetch client in `utils/orpc.ts`.
 */
const serverClient = createRouterClient(router)

export { serverClient }
