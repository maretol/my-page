'use server'
import { CustomRequestInit, createClient } from 'microcms-js-sdk'
import type {
  categoryAPIResult,
  contentsAPIResult,
  infoAPIResult,
  staticTextdata,
} from './result'
import { getCMSAPIKey, getHostname, getNodeEnv } from '../env'

const apiKey = getCMSAPIKey()
const host = getHostname()

const client = createClient({
  serviceDomain: 'maretol-blog',
  apiKey: apiKey,
})

const customRequest: CustomRequestInit = {
  next: {
    revalidate: 60,
  },
}

export async function getContents(offset: number, limit: number) {
  if (apiKey === undefined) {
    throw new Error('API_KEY is undefined')
  }

  const response = await client
    .getList<contentsAPIResult>({
      endpoint: 'contents',
      customRequestInit: customRequest,
      queries: { offset: offset, limit: limit },
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })

  if (response === undefined) {
    throw new Error('api access error')
  }
  const total = response.totalCount

  return { contents: response.contents, total: total }
}

export async function getContent(articleID: string) {
  if (apiKey === undefined) {
    throw new Error('API_KEY is undefined')
  }

  const response = await client
    .getList<contentsAPIResult>({
      endpoint: 'contents',
      queries: { ids: articleID },
      customRequestInit: customRequest,
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })

  if (response === undefined) {
    throw new Error('api access error')
  }
  return response.contents[0]
}

export async function getTags() {
  if (apiKey === undefined) {
    throw new Error('API_KEY is undefined')
  }

  const response = await client
    .getList<categoryAPIResult>({
      endpoint: 'categories',
      customRequestInit: customRequest,
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })

  if (response === undefined) {
    throw new Error('api access error')
  }
  return response.contents
}

export async function getContentsByTag(
  tagIDs: string[],
  offset: number,
  limit: number,
) {
  if (apiKey === undefined) {
    throw new Error('API_KEY is undefined')
  }

  if (tagIDs.length === 0) {
    return { contents: [], total: 0 }
  }

  const filters = tagIDs.map((id) => `categories[contains]${id}`)

  const response = await client
    .getList<contentsAPIResult>({
      endpoint: 'contents',
      queries: {
        filters: `${filters.join('[and]')}`,
        offset: offset,
        limit: limit,
      },
      customRequestInit: customRequest,
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })

  if (response === undefined) {
    throw new Error('api access error')
  }
  return { contents: response.contents, total: response.totalCount }
}

export async function getInfo() {
  if (apiKey === undefined) {
    throw new Error('API_KEY is undefined')
  }

  const response = await client
    .getList<infoAPIResult>({
      endpoint: 'info',
      customRequestInit: customRequest,
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })

  if (response === undefined) {
    throw new Error('api access error')
  }

  return response.contents
}

export async function getTextdata() {
  if (getNodeEnv() === 'development') {
    const response = await fetch(`${host}/textdata.json`)
      .then((res) => {
        return res.json()
      })
      .catch((err) => {
        console.log(err)
      })
    return response as staticTextdata
  }

  const response = await fetch(`https://r2.maretol.xyz/static/textdata.json`)
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log(err)
    })
  return response as staticTextdata
}
