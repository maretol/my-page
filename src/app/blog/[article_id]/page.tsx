export default function BlogArticlePage({
  params,
}: {
  params: { article_id: string }
}) {
  return (
    <div>
      <h1>ブログページ</h1>
      <p>{params.article_id}</p>
    </div>
  )
}
