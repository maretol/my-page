import { metadata } from '@/app/layout'
import { getContent } from '@/lib/api/accessor'
import { contentsAPIResult } from '@/lib/api/result'
import { FullArticle } from '@/src/components/large/article'

export async function generateMetadata({
  params,
}: {
  params: { article_id: string }
}) {
  const articleID = params.article_id
  const content: contentsAPIResult = await getContent(articleID)

  return {
    ...metadata,
    title: content.title + ' | Maretol Base',
    description: content.title,
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: { article_id: string }
}) {
  const articleID = params.article_id
  const host = process.env.HOST
  const path = `/blog/${articleID}`
  const url = `${host}${path}`

  const content: contentsAPIResult = await getContent(articleID)

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
