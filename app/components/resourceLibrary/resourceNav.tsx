import * as React from 'react'
import { Link, useMatches } from 'remix'
import useSite from '~/hooks/useSite'
import { ISelectedMatch } from '~/interfaces/remix'

/**
 * @Component ResourceLibraryNav
 *
 * Special Nav just for the Resource Library
 *
 * Form links to a route that is just an API to log user out on ServerSide
 *
 */

interface IProps {
  resourceUser: IResourceUser | null
}
const ResourceLibraryNav = () => {
  const matches = useMatches()
  let selectedMatchUser: undefined | ISelectedMatch = matches.find(match => match.data?.user)
  console.log('selectedMatchUser', selectedMatchUser);
  let resourceUser = selectedMatchUser?.data.user.resourceUser
  // const { state: { user: { resourceUser } } } = useSite()

  return (
    <nav>
      <ul className='flex flex-row'>

        {!resourceUser &&
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
        {resourceUser && <li>
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
