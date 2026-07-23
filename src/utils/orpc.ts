import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { type RouterClient } from '@orpc/server'
import { type Router } from '@/server/router'

/** Origin the RPC endpoint is served from; relative in the browser, localhost during SSR. */
const baseUrl = typeof window === 'undefined' ? 'http://localhost:3000' : window.location.origin

const link = new RPCLink({ url: `${baseUrl}/rpc` })

/**
 * Browser oRPC client: typed end-to-end against the server router, calling procedures over
 * fetch to `/rpc`. Server code uses the in-process `serverClient` in `server/client.ts` instead.
 */
const client: RouterClient<Router> = createORPCClient(link)

export { client }
