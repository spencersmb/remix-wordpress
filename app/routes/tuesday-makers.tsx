import { Link, Outlet } from "@remix-run/react";
import FooterPrimary from "@App/components/footer/FooterPrimary";
import ResourceLibraryNav from "@App/components/resourceLibrary/resourceNav";
import Header from "@App/components/nav/header";

const TuesdayMakers = () => {
  return (
    <>
      <Header />
      <Outlet />
      <FooterPrimary hideSignUp={true} />
    </>
  )
}

export default TuesdayMakers