import { RPCHandler } from '@orpc/server/fetch'
import { router } from '@/server/router'

/** Fetch-adapter handler that serves the whole oRPC router under `/rpc`. */
const handler = new RPCHandler(router)

const handle = async (request: Request): Promise<Response> => {
  const { response } = await handler.handle(request, {
    prefix: '/rpc',
    context: {}
  })
  return response ?? new Response('Not found', { status: 404 })
}

export { handle as DELETE, handle as GET, handle as PATCH, handle as POST, handle as PUT }
