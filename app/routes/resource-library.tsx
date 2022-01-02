import { json, Link, LoaderFunction, Outlet } from "remix";
import ResourceLibraryNav from "~/components/resourceLibrary/resourceNav";
import RemixLogo from "~/components/svgs/remixLogo";
import useSite from "~/hooks/useSite";

const ResourceLibrary = () => {
  const { state: { user } } = useSite()

  return (
    <>
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <Link to="/" title="Remix" prefetch="intent" className="remix-app__header-home-link">
            <RemixLogo />
          </Link>
          <ResourceLibraryNav showLogout={user?.resourceUser} />
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default ResourceLibrary