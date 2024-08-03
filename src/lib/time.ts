export function convertJST(datetime: string) {
  const date = new Date(datetime)
  return date.toLocaleString('ja-JP', {
    hour12: false,
    dateStyle: 'short',
    timeStyle: 'long',
  })
}
