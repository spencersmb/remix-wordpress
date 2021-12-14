import * as React from 'react'
import { Link } from 'remix'

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
const ResourceLibraryNav = ({ showLogout }: IProps) => {

  return (
    <nav>
      <ul className='flex flex-row'>

        {!showLogout &&
          <>
            <li>
              <Link to="/resource-library" title="Resource Library Home" prefetch="intent" className="remix-app__header-home-link">Resource Home</Link>
            </li>
            <li>
              <Link to="/resource-library/login" title="Remix Login" prefetch="intent" className="remix-app__header-home-link">
                Login
              </Link>
            </li>
          </>
        }
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
