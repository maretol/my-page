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

export async function getContents() {
  if (apiKey === undefined) {
    throw new Error('API_KEY is undefined')
  }

  const response = await client
    .getList<contentsAPIResult>({
      endpoint: 'contents',
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

export async function getContentsByTag(tagIDs: string[]) {
  if (apiKey === undefined) {
    throw new Error('API_KEY is undefined')
  }

  const response = await client
    .getList<contentsAPIResult>({
      endpoint: 'contents',
      queries: { filters: `categories[contains]${tagIDs.join(',')}` },
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
