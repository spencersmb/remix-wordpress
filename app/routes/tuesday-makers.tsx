import { Link, Outlet } from "remix";
import FooterPrimary from "~/components/footer/FooterPrimary";
import ResourceLibraryNav from "~/components/resourceLibrary/resourceNav";

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