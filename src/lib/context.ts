import { getRequestContext } from '@cloudflare/next-on-pages'

export async function execCMSParser(req: Request) {
  const { env } = getRequestContext()
  return await env.CMS_DATA_PARSER.fetch(req)
}

export async function execOGPFetcher(req: Request) {
  const { env } = getRequestContext()
  return await env.OGP_FETCHER.fetch(req)
}
