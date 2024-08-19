import { load } from 'cheerio'
import P from './article_dom/p'
import Hn from './article_dom/h'
import ContentImage from './article_dom/image'
import YouTubeArea from './article_dom/youtube'
import TwitterArea from './article_dom/twitter'
import Div from './article_dom/div'
import LinkCard from './article_dom/linkcard'

export default function ArticleContent({
  contentHTML,
}: {
  contentHTML: string
}) {
  const $ = load(contentHTML)

  return (
    <div className="space-y-9 content">
      {$('body > *').map((i, elem) => {
        const tagName = elem.tagName
        const attrs = elem.attribs
        const attrStr = Object.keys(attrs).map((key) => {
          return `${key}="${attrs[key]}"`
        })
        const text = $(elem).text()
        const innerHTML = $(elem).html()

        const firstChild = $(elem).children()
        const firstChildTagName = firstChild[0]?.tagName

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

        // p
        if (tagName === 'p') {
          if (isImage(text)) {
            // 自前の画像URLを画像系コンポーネントで表示
            const [tag, src] = text.split(':::')
            return <ContentImage key={i} tag={tag} src={src} />
          } else if (isComic(text)) {
            // 将来の実装：漫画系の場合、漫画ビューアを起動させる
            const [tag, src] = text.split(':::')
            return <ContentImage key={i} tag={tag} src={src} />
          } else if (isYouTube(text)) {
            // YouTubeの埋め込み
            return <YouTubeArea key={i} videoURL={text} />
          } else if (isTwitter(text)) {
            // Twitterの埋め込み
            return <TwitterArea key={i} twitterURL={text} />
          } else if (isURL(text)) {
            // URLのみの場合、リンクカードに対応させる
            return <LinkCard key={i} link={text} />
          }
          return <P key={i} innerHTML={innerHTML || text} attrs={attrs} />
        }

        return (
          <div key={i}>
            <p key={i}>{'tagName: ' + tagName}</p>
            <p key={i} className="pl-10">
              {'attrStr: ' + attrStr}
            </p>
            <p key={i} className="pl-10">
              {'text: ' + text}
            </p>
            <p key={i} className="pl-10">
              {'innerHTML: ' + innerHTML}
            </p>
            <p key={i} className="pl-10">
              {'firstChildTagName: ' + firstChildTagName}
            </p>
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
