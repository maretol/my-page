const url = 'https://www.maretol.xyz/cdn-cgi/image/#{option}/#{origin}'

export function rewriteImageURL(option: string, origin: string): string {
  return url.replace('#{option}', option).replace('#{origin}', origin)
}
