import * as React from 'react'

/**
 * @Component ResourceLibraryNav
 *
 * Special Nav just for the Resource Library
 *
 * Form links to a route that is just an API to log user out on ServerSide
 *
 */

interface IProps {
  showLogout?: boolean
}
const ResourceLibraryNav = ({showLogout}: IProps) => {

  return(
    <nav>
      <ul>
        <li>Nav</li>
        {showLogout && <li>
          <form action="/resource-library/logout" method="post">
            <button type="submit" className="button">
              Logout
            </button>
          </form>
        </li>}
      </ul>
    </nav>
  )
}

export default ResourceLibraryNav
