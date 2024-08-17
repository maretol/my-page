import { defaultSandbox } from '@/lib/static'

export default function YouTubeArea({ videoURL }: { videoURL: string }) {
  const videoId = videoURL.match(
    /(?:https:\/\/youtu.be\/|https:\/\/www.youtube.com\/watch\?v=)([a-zA-Z0-9_-]+)/,
  )
  if (!videoId) {
    return <p>YouTubeの埋め込みがありましたがURLが不正ですなようです</p>
  }
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId[1]}`}
      frameBorder="0"
      sandbox={defaultSandbox}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      width={560}
      height={315}
    ></iframe>
  )
}
