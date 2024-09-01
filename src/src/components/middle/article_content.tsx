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
import { parseCMSData } from '@/lib/parser/accessor'

export default async function ArticleContent({
  contentHTML,
  articleID,
  sample,
}: {
  contentHTML: string
  articleID: string
  sample?: boolean
}) {
  const parsed = await parseCMSData(contentHTML)

  const sampleFlag = sample || false
  const sampleClassName = 'content-sample line-clamp-6 max-h-72'
  const contentClassName = 'content'
  const className = sampleFlag ? sampleClassName : contentClassName

  return (
    <div className={cn('space-y-5', className)}>
      {parsed.map((elem, i) => {
        // sampleの場合はコンテンツは6つまででいい
        if (sampleFlag && i > 5) {
          return
        }
        const tagName = elem.tag_name
        const attrs = elem.attributes
        const text = elem.text
        const innerHTML = elem.inner_html

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
          const pOption = elem.p_option
          if (pOption === null || pOption === 'normal') {
            // 本来 p タグは p_option が入っているが、万が一の場合の抜け道
            // 通常テキストの場合と同じ扱い
            return <P key={i} innerHTML={innerHTML || text} attrs={attrs} />
          } else if (pOption === 'image') {
            // 自前の画像URLを画像系コンポーネントで表示
            const [tag, src] = text.split(':::')
            return (
              <ContentImage key={i} tag={tag} src={src} articleID={articleID} />
            )
          } else if (pOption === 'comic') {
            // 漫画系の場合、漫画ビューアを混ぜたコンポーネントを表示
            const [tag, src] = text.split(':::')
            return (
              <ContentImage key={i} tag={tag} src={src} articleID={articleID} />
            )
          } else if (pOption === 'youtube') {
            // YouTubeの埋め込み
            return <YouTubeArea key={i} videoURL={text} />
          } else if (pOption === 'twitter') {
            // Twitterの埋め込み
            return <TwitterArea key={i} twitterURL={text} />
          } else if (pOption === 'url') {
            // URLのみの場合、リンクカードに対応させる
            return <LinkCard key={i} link={text} />
          } else if (pOption === 'empty') {
            // 空行の場合。改行をいれる
            return <Br key={i} />
          }
          // どれにも該当しない場合。ほぼないはずだが、新規の p_option が追加された場合必要になる
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
