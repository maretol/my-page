import { HTMLRewriter } from 'htmlrewriter'
import { rewriteImageURL } from './image'
import { defaultSandbox, imageOption, originImageOption } from './static'

const pageRewriter = new HTMLRewriter()

pageRewriter
  .on('div[data-filename]', {
    // codeの引用でのfilenameの追加
    element(element: any) {
      const filename = element.getAttribute('data-filename')
      element.prepend(`<p class="code-filename">${filename}</p>`, {
        html: true,
      })
    },
  })
  .on('p', {
    // pの中に入っているiframe要素を抜き出して入れ直す
    // ex. YouTube動画などの埋め込み。置換する記号はそこまで多くない
    text(text: any) {
      if (text.text.includes('&lt;iframe')) {
        const sandboxFlag = text.text.includes('sandbox')
        const sandboxAttr = sandboxFlag ? '' : `sandbox="${defaultSandbox}"`
        const replacedText = text.text
          .replaceAll('&lt;', '<')
          .replaceAll('&gt;', '>')
          .replaceAll('&quot;', '"')
          .replaceAll('&amp;', '&')
          .replaceAll('&apos;', "'")
          .replaceAll('<iframe', `<iframe ${sandboxAttr}`)
        text.replace(replacedText, {
          html: true,
        })
      }
    },
  })
  .on('p', {
    // 画像のURL挿入の場合imgタグに変換
    text(text: any) {
      if (text.text.includes('https://r2.maretol.xyz/')) {
        const t = text.text.split('.')
        const ext = t[t.length - 1]
        if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
          const imgSrc = rewriteImageURL(imageOption, text.text)
          const originImgSrc = rewriteImageURL(originImageOption, text.text)
          text.replace(
            `<a href=${originImgSrc}><img className="mrtl-img" src="${imgSrc}"></a>`,
            {
              html: true,
            },
          )
        }
      }
    },
  })

async function doRewrite(rawHTML: string) {
  return await pageRewriter.transform(new Response(rawHTML)).text()
}

export { doRewrite }
