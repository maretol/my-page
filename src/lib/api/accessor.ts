'use server'
import { createClient } from 'microcms-js-sdk'
import type { categoriesAPIResult, contentsAPIResult } from './result'
import { log } from 'console'

const API_INFO = {
  contents: {
    path: 'contents',
    result: {} as contentsAPIResult,
  },
  category: {
    path: 'category',
    result: {} as categoriesAPIResult,
  },
}

export type API = keyof typeof API_INFO

const apiKey = process.env.CMS_API_KEY

export default async function getContents(revalidate: number = 60) {
  if (apiKey === undefined) {
    throw new Error('API_KEY is undefined')
  }

  const response = await createClient({
    serviceDomain: 'maretol-blog',
    apiKey: apiKey,
  })
    .getList<contentsAPIResult>({
      endpoint: 'contents',
      customRequestInit: {
        next: {
          revalidate: revalidate,
        },
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
