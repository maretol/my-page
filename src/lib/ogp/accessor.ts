import { getOGPFetcher, getOGPFetcherAPIKey } from '../env'

export async function getOGPData(targetURL: string) {
  if (getOGPFetcher() === 'local') {
    return await localGetOGPData(targetURL)
  } else {
    return await workerGetOGPData(targetURL)
  }
}

async function localGetOGPData(targetURL: string) {
  const apiKey = getOGPFetcherAPIKey()
  const headers = { 'Content-Type': 'application/json', 'x-api-key': apiKey }
  const url = new URL('http://localhost:45678')
  url.searchParams.append('target', targetURL)
  const req = new Request(url, {
    headers,
    method: 'GET',
  })
  try {
    const response = await fetch(req)
    const parsed = (await response.json()) as OGPResult

    return parsed
  } catch (e) {
    console.log(e)
    throw e
  }
}

// 本当はworkerをコンテキスト経由でアクセスしたいが、コンテキストを扱えるように作ってなかったので、一旦直接アクセスする
async function workerGetOGPData(targetURL: string) {
  const apiKey = getOGPFetcherAPIKey()
  const headers = { 'Content-Type': 'application/json', 'x-api-key': apiKey }
  const url = new URL('https://fetch-ogp-data.maretol-ruha.workers.dev/')
  url.searchParams.append('target', targetURL)
  const req = new Request(url, {
    headers,
    method: 'GET',
  })
  try {
    const response = await fetch(req)
    const parsed = (await response.json()) as OGPResult

    return parsed
  } catch (e) {
    console.log(e)
    throw e
  }
}

export type OGPResult = {
  success: boolean
  header_title: string
  og_title: string
  og_description: string
  og_image: string
  og_url: string
  og_site_name: string
}
