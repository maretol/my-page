import { HTMLRewriter } from 'htmlrewriter'

const pageRewriter = new HTMLRewriter()

const defaultSandbox =
  'allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-top-navigation'
const imageOption = 'format=auto,h=500'
const originImageOption = 'format=auto'

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
          const imgSrc =
            `https://www.maretol.xyz/cdn-cgi/image/${imageOption}/` + text.text
          const originImgSrc =
            `https://www.maretol.xyz/cdn-cgi/image/${originImageOption}/` +
            text.text
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
