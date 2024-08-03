import { JSDOM } from 'jsdom'

export function addCodeFilename(dom: JSDOM) {
  const codeElements =
    dom.window.document.querySelectorAll('div[data-filename]')
  codeElements.forEach((element) => {
    const filename = element.getAttribute('data-filename')
    const filenameElement = dom.window.document.createElement('p')
    filenameElement.className = 'code-filename'
    filenameElement.textContent = filename
    const childElement = element.querySelector('pre')
    childElement?.insertAdjacentElement('beforebegin', filenameElement)
  })
}
