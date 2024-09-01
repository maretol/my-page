import { getCMSParser, getCMSParserAPIKey } from '../env'

export async function parseCMSData(cmsContent: string) {
  // localの場合。一旦こっちで実装する。後で環境変数で分岐させる
  if (getCMSParser() === 'local') {
    return await localParseCMSData(cmsContent)
  } else {
    return await workerParseCMSData(cmsContent)
  }
}

async function localParseCMSData(cmsContent: string) {
  const req = new Request('http://localhost:8787', {
    headers: { 'Content-Type': 'application/json', 'x-api-key': 'hogehoge' },
    method: 'POST',
    body: JSON.stringify({ cms_content: cmsContent }),
  })
  try {
    const response = await fetch(req)
    const parsed = (await response.json()) as ParsedResult

    const resultArray = parsed.result
    return resultArray
  } catch (e) {
    console.log(e)
    throw e
  }
}

// 本当はworkerをコンテキスト経由でアクセスしたいが、コンテキストを扱えるように作ってなかったので、一旦直接アクセスする
async function workerParseCMSData(cmsContent: string) {
  const apiKey = getCMSParserAPIKey()
  const headers = { 'Content-Type': 'application/json', 'x-api-key': apiKey }
  const body = JSON.stringify({ cms_content: cmsContent })
  const req = new Request('https://cms-data-parser.maretol-ruha.workers.dev/', {
    headers,
    method: 'POST',
    body,
  })
  try {
    const response = await fetch(req)
    const parsed = (await response.json()) as ParsedResult

    const resultArray = parsed.result
    return resultArray
  } catch (e) {
    console.log(e)
    throw e
  }
}

export type ParsedResult = {
  result: ContentDetail[]
}

export type ContentDetail = {
  index: number
  tag_name: string
  class: string
  attributes: { [name: string]: string }
  inner_html: string | null
  text: string
  p_option: string | null // pタグの場合 not null で、 normal, image, comic, youtube, twitter, url, empty のいずれか
}
