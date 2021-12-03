import * as React from 'react'


interface IProps {
  showLogout?: boolean
}
const ResourceLibraryNav = ({showLogout}: IProps) => {

  return(
    <nav>
      <li>Nav</li>
      {showLogout && <li>
        Logout
      </li>}
    </nav>
  )
}

export default ResourceLibraryNav
