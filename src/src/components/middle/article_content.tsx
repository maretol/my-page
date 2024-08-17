import { load } from 'cheerio'
import P from './article_dom/p'
import Hn from './article_dom/h'
import ContentImage from './article_dom/image'
import YouTubeArea from './article_dom/youtube'

export default function ArticleContent({
  contentHTML,
}: {
  contentHTML: string
}) {
  const $ = load(contentHTML)

  return (
    <div className="space-y-9">
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

        if (tagName === 'p') {
          if (text.indexOf('content_image:::') === 0) {
            // 自前の画像URLを画像系コンポーネントで表示
            const [tag, src] = text.split(':::')
            return <ContentImage key={i} tag={tag} src={src} />
          } else if (
            text.indexOf('https://youtu.be/') === 0 ||
            text.indexOf('https://www.youtube.com/') === 0
          ) {
            // YouTubeの埋め込み
            return <YouTubeArea key={i} videoURL={text} />
          } else if (
            text.indexOf('https://twitter.com/') === 0 ||
            text.indexOf('https://www.twitter.com/') === 0 ||
            text.indexOf('https://x.com/') === 0
          ) {
            // Twitterの埋め込み
            return <p key={i}>これはTwitter : {text}</p>
          } else if (text.indexOf('https://') === 0) {
            // URLのみの場合、リンクカードに対応させる
            return <p key={i}>これはURL : {text}</p>
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
