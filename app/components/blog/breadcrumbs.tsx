import { Link } from "@remix-run/react"

interface IBreadCrumb {
  url: string
  text: string
}
function Breadcrumbs(props: { links?: IBreadCrumb[] }) {
  const { links } = props
  const lastElement = links?.pop()
  return (
    <div className="mt-8">
      <ul className="flex flex-row text-xs text-primary-500 tablet:text-base">
        <li><Link to={'/'} className='font-semibold'>Home </Link> <span className="mr-1">/</span></li>
        {links && links.map((link, index) => {
          const linkText = `${link.text}`
          return (
            <li key={index} ><Link className='font-semibold' to={link.url}>{linkText}</Link></li>
          )
        })}
        {lastElement && <li className=""><span className="mx-1">/</span>{lastElement.text}</li>}
      </ul>
    </div>
  )
}

export default Breadcrumbs