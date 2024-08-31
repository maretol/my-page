export default function ImageModal({
  params,
}: {
  params: { article_id: string; src: string }
}) {
  return <div>{params.src}</div>
}
