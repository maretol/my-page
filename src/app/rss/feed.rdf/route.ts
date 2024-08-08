import { getContents } from '@/lib/api/accessor'
import { getHostname } from '@/lib/env'

export const dynamic = 'force-dynamic'

export async function GET() {
  const rdfTemplate = `<?xml version="1.0" encoding="UTF-8"?>`
  const host = getHostname()

  const articles = await getContents()

  const items = articles.map((article) => {
    return convertToRssItem(
      article.title,
      article.id,
      article.createdAt,
      article.content,
    )
  })

  const lastBuildDate = new Date(articles[0].createdAt)

  const rssTemplate = `${rdfTemplate}
  <rss xmlns:media="https://" version="2.0" xml:lang="ja">
    <channel>
      <language>ja</language>
      <title>Maretol Base</title>
      <link>${host}</link>
      <description>maretolの個人サイトです</description>
      <lastBuildDate>${lastBuildDate.toISOString()}</lastBuildDate>
      <copyright>© ${lastBuildDate.getFullYear()} Maretol</copyright>
      <generator>Maretol Base</generator>
      <pubDate>${new Date().toISOString()}</pubDate>
      <ttl>60</ttl>
      ${items.join('')}
    </channel>
  </rss>`

  return new Response(rssTemplate, {
    headers: { content_type: 'application/rss+xml' },
  })
}

function convertToRssItem(
  title: string,
  id: string,
  createdAt: string,
  content: string,
) {
  const host = getHostname()
  const removeDomContent = content
    .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
    .substring(0, 150)

  return `
      <item>
        <title>${title}</title>
        <link>${host}/blog/${id}</link>
        <description><![CDATA[${removeDomContent}]]></description>
        <pubDate>${new Date(createdAt).toISOString()}</pubDate>
      </item>`
}
