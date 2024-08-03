import { getContentsByTag, getTags } from '@/lib/api/accessor'
import { Article } from '@/src/components/large/article'
import { Button } from '@/src/components/ui/button'
import Link from 'next/link'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const rawTagIDs = searchParams['tag_id']
  let tagIDs: string[] = []
  if (rawTagIDs === undefined) {
    tagIDs = []
  } else if (typeof rawTagIDs === 'string') {
    tagIDs = [rawTagIDs]
  } else {
    tagIDs = rawTagIDs
  }

  const tags = await getTags()

  const selectedTags = tags.filter((tag) => tagIDs.includes(tag.id))
  return {
    title: `タグ検索：${selectedTags
      .map((t) => t.name)
      .join(', ')} | Maretol Base`,
    description: 'タグ検索ページ',
  }
}

export default async function TagPage({
  searchParams,
}: {
  searchParams: { [key: string]: string[] | string | undefined }
}) {
  const rawTagIDs = searchParams['tag_id']
  let tagIDs: string[] = []
  if (rawTagIDs === undefined) {
    tagIDs = []
  } else if (typeof rawTagIDs === 'string') {
    tagIDs = [rawTagIDs]
  } else {
    tagIDs = rawTagIDs
  }

  const rawTagNames = searchParams['tag_name']
  let tagNames: string[] = []
  if (rawTagNames === undefined) {
    tagNames = []
  } else if (typeof rawTagNames === 'string') {
    tagNames = [rawTagNames]
  } else {
    tagNames = rawTagNames
  }

  const tags = await getTags()

  const contents = await getContentsByTag(tagIDs)

  return (
    <div>
      <div>
        <div className="flex flex-row justify-left items-center mb-4">
          <div>
            <h2>Tag : </h2>
          </div>
          <div className="flex flex-row items-center ml-1 gap-x-1">
            {tags.map((t, i) => {
              const appendTagIDs = [...tagIDs, t.id]
              const appendTagNames = [...tagNames, t.name]
              const detachTagIDs = tagIDs.filter((id) => id !== t.id)
              const detachTagNames = tagNames.filter((name) => name !== t.name)
              return (
                <div key={`tag-${i}`}>
                  {tagIDs.includes(t.id) ? (
                    <Link
                      href={{
                        pathname: '/tag',
                        query: {
                          tag_id: detachTagIDs,
                          tag_name: detachTagNames,
                        },
                      }}
                    >
                      <Button disabled={tagIDs.includes(t.id)}>{t.name}</Button>
                    </Link>
                  ) : (
                    <Link
                      href={{
                        pathname: '/tag',
                        query: {
                          tag_id: appendTagIDs,
                          tag_name: appendTagNames,
                        },
                      }}
                    >
                      <Button disabled={tagIDs.includes(t.id)}>{t.name}</Button>
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
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
    </div>
  )
}
