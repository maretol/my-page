'use server'
import { createClient } from 'microcms-js-sdk'
import type {
  categoryAPIResult,
  contentsAPIResult,
  infoAPIResult,
} from './result'
import { log } from 'console'

const API_INFO = {
  contents: {
    path: 'contents',
    result: {} as contentsAPIResult,
  },
  category: {
    path: 'category',
    result: {} as categoryAPIResult,
  },
}

export type API = keyof typeof API_INFO

const apiKey = process.env.CMS_API_KEY || ''

const client = createClient({
  serviceDomain: 'maretol-blog',
  apiKey: apiKey,
})

export async function getContents() {
  if (apiKey === undefined) {
    throw new Error('API_KEY is undefined')
  }

  const response = await client
    .getList<contentsAPIResult>({
      endpoint: 'contents',
      customRequestInit: {
        cache: 'no-cache',
      },
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      log(err)
    })

  if (response === undefined) {
    throw new Error('api access error')
  }

  return response.contents
}

export async function getContent(articleID: string) {
  if (apiKey === undefined) {
    throw new Error('API_KEY is undefined')
  }

  const response = await client
    .getList<contentsAPIResult>({
      endpoint: 'contents',
      queries: { ids: articleID },
      customRequestInit: {
        cache: 'no-cache',
      },
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      log(err)
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
      customRequestInit: {
        cache: 'no-cache',
      },
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      log(err)
    })

  if (response === undefined) {
    throw new Error('api access error')
  }
  return response.contents
}

export async function getContentsByTag(tagIDs: string[]) {
  if (apiKey === undefined) {
    throw new Error('API_KEY is undefined')
  }

  const response = await client
    .getList<contentsAPIResult>({
      endpoint: 'contents',
      queries: { filters: `categories[contains]${tagIDs.join(',')}` },
      customRequestInit: {
        cache: 'no-cache',
      },
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      log(err)
    })

  if (response === undefined) {
    throw new Error('api access error')
  }
  return response.contents
}

export async function getInfo() {
  if (apiKey === undefined) {
    throw new Error('API_KEY is undefined')
  }

  const response = await client
    .getList<infoAPIResult>({
      endpoint: 'info',
      customRequestInit: {
        cache: 'no-cache',
      },
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      log(err)
    })

  if (response === undefined) {
    throw new Error('api access error')
  }

  return response.contents
}
