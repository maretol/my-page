import { load } from 'cheerio'
import P from './article_dom/p'
import Hn from './article_dom/h'
import ContentImage from './article_dom/image'
import YouTubeArea from './article_dom/youtube'
import TwitterArea from './article_dom/twitter'
import Div from './article_dom/div'
import LinkCard from './article_dom/linkcard'
import { cn } from '@/src/lib/utils'
import Br from './article_dom/br'
import Blockquote from './article_dom/blockquote'

export default function ArticleContent({
  contentHTML,
  articleID,
  sample,
}: {
  contentHTML: string
  articleID: string
  sample?: boolean
}) {
  const $ = load(contentHTML)
  const sampleFlag = sample || false

  const sampleClassName = 'content-sample line-clamp-6 max-h-72'
  const contentClassName = 'content'

  const className = sampleFlag ? sampleClassName : contentClassName

  return (
    <div className={cn('space-y-5', className)}>
      {$('body > *').map((i, elem) => {
        // sampleの場合はコンテンツは6つまででいい
        if (sampleFlag && i > 5) {
          return
        }
        const tagName = elem.tagName
        const attrs = elem.attribs
        const text = $(elem).text()
        const innerHTML = $(elem).html()

        // h1 ~ h5
        // 正規表現でヒットさせる
        if (tagName.match(/h[1-5]/)) {
          return <Hn key={i} tag={tagName} text={text} />
        }

        // hr
        if (tagName === 'hr') {
          return <hr key={i} />
        }

        // table。面倒なのでそのままにするができれば適当なコンポーネントに
        if (tagName === 'table') {
          if (innerHTML) {
            return (
              <table key={i} dangerouslySetInnerHTML={{ __html: innerHTML }} />
            )
          }
        }

        // div
        if (tagName === 'div') {
          if (innerHTML) {
            return <Div key={i} innerHTML={innerHTML} attrs={attrs} />
          }
        }

        // list
        if (tagName === 'ul') {
          return (
            <ul key={i} dangerouslySetInnerHTML={{ __html: innerHTML || '' }} />
          )
        }
        if (tagName === 'ol') {
          return (
            <ol key={i} dangerouslySetInnerHTML={{ __html: innerHTML || '' }} />
          )
        }

        // blockquote
        if (tagName === 'blockquote') {
          return <Blockquote key={i} innerHTML={innerHTML || ''} />
        }

        // p
        if (tagName === 'p') {
          if (isImage(text)) {
            // 自前の画像URLを画像系コンポーネントで表示
            const [tag, src] = text.split(':::')
            return (
              <ContentImage key={i} tag={tag} src={src} articleID={articleID} />
            )
          } else if (isComic(text)) {
            // 漫画系の場合、漫画ビューアを混ぜたコンポーネントを表示
            const [tag, src] = text.split(':::')
            return (
              <ContentImage key={i} tag={tag} src={src} articleID={articleID} />
            )
          } else if (isYouTube(text)) {
            // YouTubeの埋め込み
            return <YouTubeArea key={i} videoURL={text} />
          } else if (isTwitter(text)) {
            // Twitterの埋め込み
            return <TwitterArea key={i} twitterURL={text} />
          } else if (isURL(text)) {
            // URLのみの場合、リンクカードに対応させる
            return <LinkCard key={i} link={text} />
          } else if (text === '') {
            // 空行の場合。改行をいれる
            return <Br key={i} />
          }
          return <P key={i} innerHTML={innerHTML || text} attrs={attrs} />
        }

        return (
          <div key={i}>
            <p>known tag error : {tagName}</p>
            <div dangerouslySetInnerHTML={{ __html: innerHTML || '' }} />
          </div>
        )
      })}
    </div>
  )
}

function isImage(text: string) {
  return text.indexOf('content_image:::') === 0
}

function isComic(text: string) {
  return text.indexOf('content_comic:::') === 0
}

function isYouTube(text: string) {
  return (
    text.indexOf('https://youtu.be/') === 0 ||
    text.indexOf('https://www.youtube.com/') === 0
  )
}

function isTwitter(text: string) {
  return (
    text.indexOf('https://twitter.com/') === 0 ||
    text.indexOf('https://www.twitter.com/') === 0 ||
    text.indexOf('https://x.com/') === 0
  )
}

function isURL(text: string) {
  return text.indexOf('https://') === 0
}
