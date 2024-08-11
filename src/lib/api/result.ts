export type contentsAPIResult = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
  ogp_image: string | undefined | null
  categories: categoryAPIResult[]
  publish: boolean
}

export type categoryAPIResult = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
}

export type infoAPIResult = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  page_pathname: string
  main_text: string
}

export type staticTextdata = {
  footer: string
}
