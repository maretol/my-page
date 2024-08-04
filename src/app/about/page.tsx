import { getInfo } from '@/lib/api/accessor'
import { FullArticle } from '@/src/components/large/article'

export const runtime = 'edge'

export function generateMetadata() {
  return {
    title: 'このページについて | Maretol Base',
    description: 'このページについて',
  }
}

export default async function About() {
  const contents = await getInfo()

  const aboutPageContents = contents.filter(
    (c) => c.page_pathname === '/about' || c.page_pathname === 'about',
  )[0]

  const host = process.env.HOST
  const path = '/about'
  const url = `${host}${path}`

  return (
    <div className="flex flex-col justify-center gap-10">
      <FullArticle
        id={'about'}
        title="このページについて"
        createdAt={aboutPageContents.createdAt}
        updatedAt={aboutPageContents.updatedAt}
        categories={[]}
        rawContent={aboutPageContents.main_text}
        type="info"
        shareURL={url}
      />
    </div>
  )
}
