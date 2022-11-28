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
    <div data-testid="blog-date" className="flex flex-col">
      <div className='mb-2 text-xl leading-3 font-sentinel__SemiBoldItal'>{author}</div>
      <div className='text-sm font-semibold text-grey-500'>{formatDate(date)}</div>
    </div>
  )
}

export default BlogDateAuthor