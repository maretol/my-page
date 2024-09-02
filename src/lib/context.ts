import { getRequestContext } from '@cloudflare/next-on-pages'

const { env } = getRequestContext()

export async function execCMSParser(req: Request) {
  return await env.CMS_DATA_PARSER.fetch(req)
}

export async function execOGPFetcher(req: Request) {
  return await env.OGP_FETCHER.fetch(req)
}
