import { Link, Outlet } from "@remix-run/react";
import FooterPrimary from "@App/components/footer/FooterPrimary";
import ResourceLibraryNav from "@App/components/resourceLibrary/resourceNav";

const TuesdayMakers = () => {
  return (
    <>
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <Link to="/" title="Remix" prefetch="intent" className="remix-app__header-home-link">
            LOGO
          </Link>
          <ResourceLibraryNav />
        </div>
      </header>
      <Outlet />
      <FooterPrimary />
    </>
  )
}

export default TuesdayMakers