import { Link, Outlet, useLoaderData } from "@remix-run/react";
import FooterPrimary from "@App/components/footer/FooterPrimary";
import Header from "@App/components/nav/header";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import ContextLoader from "@App/components/layoutTemplates/contextLoader";
import GlobalEvents from "@App/components/layoutTemplates/globalHooks";
import BasicModal from "@App/components/modals/BasicModal";

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
      <ContextLoader>
        <GlobalEvents />
        <Header />
        <Outlet />
        <FooterPrimary hideSignUp={url === "/tuesday-makers"} />
        <BasicModal />
      </ContextLoader>
    </>
  )
}

export default TuesdayMakers