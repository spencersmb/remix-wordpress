import { formatDate } from "@App/utils/posts"

/**
 * BlogDateAuthor component
 * 
 * @tested - 5/27/2022
 * @param props 
 * @returns 
 */
const BlogDateAuthor = (props: { date: string, author: string }) => {
  const { date, author } = props
  return (
    <div data-testid="blog-date" className="flex flex-row">
      <div>{formatDate(date)}</div>
      <div className="mx-1">—</div>
      <div>{author}</div>
    </div>
  )
}

export default BlogDateAuthor