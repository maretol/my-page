import Modal from './modal'

// パラレルルート・セマンティクスルート機能で、ブログ内から画像をクリックしたときはこのモーダルが表示される
export default function ImageModal({
  params,
}: {
  params: { article_id: string; src: string }
}) {
  return <Modal imageSrc={params.src} />
}
