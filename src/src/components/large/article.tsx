import { categoryAPIResult } from '@/lib/api/result'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import Link from 'next/link'
import { convertJST } from '@/lib/time'
import Tags from '../middle/tags'
import { Button } from '../ui/button'
import ShareButton from '../small/share'
import { BookIcon, HomeIcon } from 'lucide-react'
import { doRewrite } from '@/lib/dom'

type ArticleProps = {
  id: string
  title: string
  updatedAt: string
  categories: categoryAPIResult[]
  rawContent: string
}

type FullAtricleProps = ArticleProps & {
  createdAt: string
  type: 'blog' | 'info'
  shareURL: string
}

export async function Article({
  id,
  title,
  updatedAt,
  categories,
  rawContent,
}: ArticleProps) {
  const contentHTML = await doRewrite(rawContent)

  return (
    <Card key={id}>
      <CardHeader>
        <CardTitle>
          <Link href={`blog/${id}`} className="hover:underline">
            {title}
          </Link>
        </CardTitle>
        <CardDescription>{convertJST(updatedAt)}</CardDescription>
        <CardContent className="pl-0 pt-2 pb-0">
          <Tags tags={categories} />
        </CardContent>
      </CardHeader>
      <CardContent className="relative">
        <div
          className="space-y-5 content-sample line-clamp-6 "
          dangerouslySetInnerHTML={{
            __html: contentHTML,
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t to-opacity-100 from-10% via-opacity-30 from-opacity-0" />
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-1" asChild>
          <Link href={`/blog/${id}`}>
            <BookIcon className="w-4 h-4" />
            Read more...
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export async function FullArticle({
  title,
  createdAt,
  updatedAt,
  categories,
  rawContent,
  type,
  shareURL,
}: FullAtricleProps) {
  const contentHTML = await doRewrite(rawContent)
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {type === 'blog' ? (
            <>
              作成日{convertJST(createdAt)} <br />
              最終更新{convertJST(updatedAt)}
            </>
          ) : (
            <>最終更新日{convertJST(updatedAt)}</>
          )}
        </CardDescription>
        {type === 'blog' && (
          <CardContent className="pl-0 pt-2 pb-0">
            <Tags tags={categories} />
          </CardContent>
        )}
      </CardHeader>
      <CardContent>
        <div
          className="space-y-5 content"
          dangerouslySetInnerHTML={{
            __html: contentHTML,
          }}
        />
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <div className="flex gap-1 items-center">
            <p>Share : </p>
            <ShareButton variant="twitter" url={shareURL} title={title} />
            <ShareButton variant="facebook" url={shareURL} title={title} />
          </div>
          <div className="flex justify-center mt-2">
            <Button
              variant="secondary"
              className="w-96 flex justify-center gap-1"
              asChild
            >
              <Link href="/">
                <HomeIcon className="w-5 h-5" />
                <h2 className="text-xl">Home</h2>
              </Link>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
