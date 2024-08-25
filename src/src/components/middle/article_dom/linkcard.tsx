import { rewriteImageURL } from '@/lib/image'
import { originImageOption } from '@/lib/static'
import { load } from 'cheerio'
import ClientImage from '../../small/client_image'

export default async function LinkCard({ link }: { link: string }) {
  let headerTitle = 'No Page Title'
  let ogpTitle = ''
  let ogpDescription = ''
  let ogpImage = getNoImage()
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
  const image = ogpImage

  return (
    <div className="max-w-xl h-100 no-underline border-2 border-gray-500 rounded-md">
      <a href={ogpUrl} target="_blank" className="hover:no-underline">
        <div className="flex flex-row h-24">
          <div className="row-span-3 w-36 h-24">
            <ClientImage
              src={image}
              alt={ogpTitle}
              width={200}
              height={200}
              className="object-contain w-36 h-24"
            />
          </div>
          <div className="col-span-2 w-96 flex-auto mr-2">
            <p className="text-lg line-clamp-1 font-semibold pt-1">{title}</p>
            <p className="text-sm line-clamp-3">{ogpDescription}</p>
          </div>
        </div>
        <div className="p-1 bg-gray-200 rounded-b-md">
          <p className="no-underline text-sm line-clamp-1">{site}</p>
          <p className="no-underline text-sm line-clamp-1">{link}</p>
        </div>
      </a>
    </div>
  )
}

function getNoImage() {
  return rewriteImageURL(
    originImageOption,
    'https://r2.maretol.xyz/assets/no_image.png',
  )
}
