import * as React from 'react'


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
