import { HTMLRewriter } from 'htmlrewriter'

const rewriter = new HTMLRewriter()

// filenameの追加
rewriter.on('div[data-filename]', {
  element(element: any) {
    const filename = element.getAttribute('data-filename')
    element.prepend(`<p class="code-filename">${filename}</p>`, {
      html: true,
    })
  },
})

async function doRewrite(rawHTML: string) {
  return await rewriter.transform(new Response(rawHTML)).text()
}

export { doRewrite }
