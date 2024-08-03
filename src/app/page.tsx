import { getContents } from '@/lib/api/accessor'
import { contentsAPIResult } from '@/lib/api/result'
import { Article } from '@/src/components/large/article'

export default async function Mainpage() {
  const contents: contentsAPIResult[] = await getContents()
  return (
    <div className="flex flex-col justify-center gap-10">
      {contents.map((content) => (
        <Article
          key={content.id}
          id={content.id}
          title={content.title}
          updatedAt={content.updatedAt}
          categories={content.categories}
          rawContent={content.content}
        />
      ))}
    </div>
  )
}
