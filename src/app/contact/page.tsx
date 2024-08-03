import { getInfo } from '@/lib/api/accessor'
import { FullArticle } from '@/src/components/large/article'

export function generateMetadata() {
  return {
    title: '連絡先 | Maretol Base',
    description: '連絡先ページ',
  }
}

export default async function ContactPage() {
  const contents = await getInfo()

  const contactPageContents = contents.filter(
    (c) => c.page_pathname === '/contact' || c.page_pathname === 'contact',
  )[0]

  const host = process.env.HOST
  const path = '/contact'
  const url = `${host}${path}`

  return (
    <div className="flex flex-col justify-center gap-10">
      <FullArticle
        id={'contact'}
        title="連絡先"
        createdAt={contactPageContents.createdAt}
        updatedAt={contactPageContents.updatedAt}
        categories={[]}
        rawContent={contactPageContents.main_text}
        type="info"
        shareURL={url}
      />
    </div>
  )
}
