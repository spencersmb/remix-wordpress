import { Link } from "@remix-run/react"


/**
 * Breadcrumbs component
 *  home page has link already by default
 *  first item in the array is the 2nd link in the breadcrumb
 *  manually set it here because of testing
 * @tested - 5/27/2020
 * @param {IBreadCrumb[]} array
 * 
 * 
 */

// TODO: test this function again for single item output
function removeLastItemFromArray(array: any[] | undefined) {
  if (!array) {
    return { lastElement: null, modifiedArray: null }
  }
  const newArray = [...array]
  const lastElement = newArray.pop()
  return {
    modifiedArray: newArray,
    lastElement
  }

}
function Breadcrumbs(props: { links?: IBreadCrumb[] }) {
  const { links } = props
  const { modifiedArray, lastElement } = removeLastItemFromArray(links)

  return (
    <div className="mt-8">
      <ul className="flex flex-row text-xs text-sage-700 tablet:text-base">
        <li>
          <Link to={'/'} className='font-semibold'>Home </Link>
          <span className="mr-1">/</span></li>
        {modifiedArray && modifiedArray.map((link, index) => {
          const linkText = `${link.text}`
          return (
            <li key={index}>
              <Link className='font-semibold' to={link.url}>{linkText}</Link>
              <span className="mx-1">/</span>
            </li>
          )
        })}
        {lastElement &&
          <li data-testid="last-element" className="">
            {lastElement.text}
          </li>}
      </ul>
    </div>
  )
}

export default Breadcrumbs