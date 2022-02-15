import { Link } from "remix"

interface IBreadCrumb {
  url: string
  text: string
}
function Breadcrumbs(props: { links?: IBreadCrumb[] }) {
  const { links } = props
  const lastElement = links?.pop()
  return (
    <div className="mt-8">
      <ul className="text-primary-500 flex flex-row text-xs tablet:text-base">
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