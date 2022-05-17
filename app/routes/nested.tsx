import { Outlet } from "@remix-run/react"

const Nested = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>one nav</li>
          <li>two nav</li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default Nested