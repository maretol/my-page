import { rewriteImageURL } from '@/lib/image'
import { imageOption } from '@/lib/static'
import Image from 'next/image'

export default function ContentImage({
  tag,
  src,
}: {
  tag: string
  src: string
}) {
  const imageSrc = rewriteImageURL(imageOption, src)

  if (tag === 'content_image') {
    return <Image src={imageSrc} alt="" width={300} height={400} />
  } else if (tag === 'content_comic') {
    // 将来実装予定
    return <p>{src}</p>
  } else {
    // 本来ないはずだけどなにか来たとき
    return <p>{src}</p>
  }
}
