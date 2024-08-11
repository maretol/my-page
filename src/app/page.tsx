import { getContents } from '@/lib/api/accessor'
import { pageLimit } from '@/lib/static'
import { Article } from '@/src/components/large/article'
import Pagenation from '@/src/components/middle/pagenation'

export default async function Mainpage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = searchParams['p']
  const pageNumber = isPage(page) ? Number(page) : 1
  const offset = (pageNumber - 1) * pageLimit
  const limit = pageLimit

  const { contents, total } = await getContents(offset, limit)
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
      <div className="flex justify-center">
        <Pagenation
          path="/"
          currentPage={pageNumber}
          totalPage={Math.ceil(total / limit)}
        />
      </div>
    </div>
  )
}

function isPage(page: string | string[] | undefined): boolean {
  if (page === undefined) {
    return false
  }
  if (typeof page === 'string') {
    // page が数字であれば true
    return !isNaN(Number(page))
  }
  return false
}
