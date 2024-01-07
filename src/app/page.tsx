import getContents from '@/lib/api/accessor'
import { contentsAPIResult } from '@/lib/api/result'

export default async function Mainpage() {
  const contents: contentsAPIResult[] = await getContents()
  return (
    <div>
      <h1>Hello Next.js World!</h1>
      <ul>
        {contents.map((content) => (
          <li key={content.id}>{content.title}</li>
        ))}
      </ul>
    </div>
  )
}
