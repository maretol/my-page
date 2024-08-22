import { load } from 'cheerio'
import Image from 'next/image'

export default async function LinkCard({ link }: { link: string }) {
  let headerTitle = ''
  let ogpTitle = ''
  let ogpDescription = ''
  let ogpImage = ''
  let ogpUrl = ''
  let ogpSite = ''
  try {
    const linkResult = await fetch(link)

    const parsed = load(await linkResult.text())

    parsed('head title').each((_, elem) => {
      headerTitle = parsed(elem).text()
    })

    parsed('head > meta').each((_, elem) => {
      if (parsed(elem).attr('property') === 'og:title') {
        ogpTitle = parsed(elem).attr('content') || ''
      }
      if (parsed(elem).attr('property') === 'og:description') {
        ogpDescription = parsed(elem).attr('content') || ''
      }
      if (parsed(elem).attr('property') === 'og:image') {
        ogpImage = parsed(elem).attr('content') || ''
      }
      if (parsed(elem).attr('property') === 'og:url') {
        ogpUrl = parsed(elem).attr('content') || ''
      }
      if (parsed(elem).attr('property') === 'og:site_name') {
        ogpSite = parsed(elem).attr('content') || ''
      }
    })
  } catch (e) {
    console.error(e)
    ogpTitle = 'Error'
    ogpDescription = 'エラーが発生しました。データを表示できません。'
  }

  const title = ogpTitle !== '' ? ogpTitle : headerTitle
  const site = ogpSite !== '' ? ogpSite : title
  const image = ogpImage !== '' ? ogpImage : '' // noimageを用意する

  return (
    <div className="max-w-xl h-100 no-underline border-2">
      <a href={ogpUrl} target="_blank" className="hover:no-underline">
        <div className="flex flex-row h-24">
          <div className="row-span-3 w-36 h-24">
            <Image src={image} alt={ogpTitle} width={150} height={150} />
          </div>
          <div className="col-span-2 m-2">
            <h3>{title}</h3>
            <p className="line-clamp-3">{ogpDescription}</p>
          </div>
        </div>
        <div className="p-1 bg-gray-200">
          <p className="no-underline text-sm line-clamp-1">{site}</p>
          <p className="no-underline text-sm line-clamp-1">{link}</p>
        </div>
      </a>
    </div>
  )
}
