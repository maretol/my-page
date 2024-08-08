import { HTMLRewriter } from 'htmlrewriter'

const pageRewriter = new HTMLRewriter()

// filenameの追加
pageRewriter.on('div[data-filename]', {
  element(element: any) {
    const filename = element.getAttribute('data-filename')
    element.prepend(`<p class="code-filename">${filename}</p>`, {
      html: true,
    })
  },
})

async function doRewrite(rawHTML: string) {
  return await pageRewriter.transform(new Response(rawHTML)).text()
}

export { doRewrite }
