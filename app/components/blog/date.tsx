import { formatDate } from "@App/utils/posts"

const BlogDateAuthor = (props: { date: string, author: string }) => {
  const { date, author } = props
  return (
    <div className="flex flex-row">
      <div>{formatDate(date)}</div>
      <div className="mx-1">—</div>
      <div>{author}</div>
    </div>
  )
}

export default BlogDateAuthor