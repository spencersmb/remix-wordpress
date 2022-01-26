const BlogDateAuthor = (props: { date: string, author: string }) => {
  const { date, author } = props
  const blogDate = new Date(date)
  var noTime = new Date(blogDate.getFullYear(), blogDate.getMonth(), blogDate.getDate());
  const monthIndex: number = blogDate.getMonth()
  const day: number = blogDate.getDay()
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const formattedDate = `${months[monthIndex]} ${day}, ${blogDate.getFullYear()}`
  return (
    <div className="flex flex-row">
      <div>{formattedDate}</div>
      <div className="mx-1">—</div>
      <div>{author}</div>
    </div>
  )
}

export default BlogDateAuthor