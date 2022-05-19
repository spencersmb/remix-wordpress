import { Link, useFetcher, useNavigate } from '@remix-run/react'
import * as React from 'react'
import { userStateMatches } from '~/hooks/remixHooks'
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

const ResourceLibraryNav = () => {
  // Pass user directly using useMatches instead of waiting for context
  const { state } = userStateMatches()
  let navigate = useNavigate();
  const fetcher = useFetcher();
  const logout = () => {
    console.log('logout');
    localStorage.removeItem('makers_login')
    fetcher.submit(
      { redirectTo: '/tuesday-makers/login' },
      { method: "post", action: "/tuesday-makers/logout" }
    );
  }
  // const logout = React.useCallback(() => {
  //   fetcher.submit(
  //     // { redirectTo: '/tuesday-makers/login' },
  //     { method: "post", action: "/tuesday-makers/logout" }
  //   );
  // }, [fetcher]);

  return (
    <nav>
      <ul className='flex flex-row'>
        {!state?.user.resourceUser &&
          <>
            <li>
              <Link to="/tuesday-makers" title="Resource Library Home" prefetch="intent" className="remix-app__header-home-link">Resource Home</Link>
            </li>
            <li>
              <Link to="/tuesday-makers/login" title="Remix Login" prefetch="intent" className="remix-app__header-home-link">
                Login
              </Link>
            </li>
          </>
        }
        {state?.user.resourceUser && <li>
          <button type="button" onClick={logout} className="button">
            Logout
          </button>
          {/* <form action="/tuesday-makers/logout" method="post">
            <button type="submit" className="button">
              Logout
            </button>
          </form> */}
        </li>}
      </ul>
    </nav>
  )
}

export default ResourceLibraryNav
