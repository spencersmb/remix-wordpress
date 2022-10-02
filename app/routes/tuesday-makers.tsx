import { Link, Outlet, useLoaderData } from "@remix-run/react";
import FooterPrimary from "@App/components/footer/FooterPrimary";
import ResourceLibraryNav from "@App/components/resourceLibrary/resourceNav";
import Header from "@App/components/nav/header";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  return json({
    url: url.pathname,
  })
}
const TuesdayMakers = (props: any) => {
  const { url } = useLoaderData()

  return (
    <>
      <Header />
      <Outlet />
      <FooterPrimary hideSignUp={url === "/tuesday-makers"} />
    </>
  )
}

export default TuesdayMakers