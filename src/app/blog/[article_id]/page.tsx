import { metadata } from '@/app/layout'
import { getContent } from '@/lib/api/accessor'
import { contentsAPIResult } from '@/lib/api/result'
import { getHostname } from '@/lib/env'
import { getOGPImage, rewriteImageURL } from '@/lib/image'
import { ogpImageOption } from '@/lib/static'
import { FullArticle } from '@/src/components/large/article'
import { Metadata } from 'next'

export const runtime = 'edge'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { article_id: string }
  searchParams: { [key: string]: string | undefined }
}) {
  const articleID = params.article_id
  const draftKey = searchParams['draftKey']

  const content: contentsAPIResult = await getContent(articleID, draftKey)
  const ogpImage = content.ogp_image
  const sumnail =
    ogpImage === null || ogpImage === undefined
      ? getOGPImage()
      : rewriteImageURL(ogpImageOption, ogpImage)
  const description = content.content
    .replaceAll(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
    .slice(0, 100)
  const twitterCard =
    ogpImage === null || ogpImage === undefined
      ? 'summary'
      : 'summary_large_image'

  return {
    ...metadata,
    title: content.title + ' | Maretol Base',
    description: content.title,
    twitter: {
      ...metadata.twitter,
      card: twitterCard,
      title: content.title + ' | Maretol Base',
      description: description,
      images: [sumnail],
    },
    openGraph: {
      ...metadata.openGraph,
      title: content.title + ' | Maretol Base',
      description: description,
      url: `${getHostname()}/blog/${articleID}`,
      images: [sumnail],
    },
  } as Metadata
}

export default async function BlogArticlePage({
  params,
  searchParams,
}: {
  params: { article_id: string }
  searchParams: { [key: string]: string | undefined }
}) {
  const articleID = params.article_id
  const draftKey = searchParams['draftKey']

  const host = getHostname()
  const path = `/blog/${articleID}`
  const url = `${host}${path}`

  const content: contentsAPIResult = await getContent(articleID, draftKey)

  return (
    <div>
      <FullArticle
        id={content.id}
        title={content.title}
        createdAt={content.createdAt}
        updatedAt={content.updatedAt}
        categories={content.categories}
        rawContent={content.content}
        type="blog"
        shareURL={url}
      />
    </div>
  )
}
