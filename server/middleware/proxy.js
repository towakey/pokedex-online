// server/middleware/proxy.js
import { defineEventHandler, readBody, sendProxy } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const targetUrl = config.apiProxyUrl
  
  if (event.node.req.url === '/api/proxy' && event.node.req.method === 'POST') {
    const body = await readBody(event)
    const url = body.url || targetUrl

    return sendProxy(event, url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
})
