import { Link, Outlet } from "remix";
import ResourceLibraryNav from "~/components/resourceLibrary/resourceNav";
import RemixLogo from "~/components/svgs/remixLogo";

const ResourceLibrary = () => {
  return (
    <>
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <Link to="/" title="Remix" prefetch="intent" className="remix-app__header-home-link">
            <RemixLogo />
          </Link>
          <ResourceLibraryNav />
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default ResourceLibrary