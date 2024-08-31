import Modal from './modal'

export default function ImageModal({
  params,
}: {
  params: { article_id: string; src: string }
}) {
  return <Modal imageSrc={params.src} />
}
