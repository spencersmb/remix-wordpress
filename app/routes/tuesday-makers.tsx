import { Link, Outlet, useLoaderData } from "@remix-run/react";
import FooterPrimary from "@App/components/footer/FooterPrimary";
import Header from "@App/components/nav/header";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import ContextLoader from "@App/components/layoutTemplates/contextLoader";
import GlobalEvents from "@App/components/layoutTemplates/globalHooks";
import BasicModal from "@App/components/modals/BasicModal";
import SearchModal from "@App/components/modals/searchModal";
import UseMakersLibraryProvider from "@App/hooks/useFreebies/useFreebiesPaginateProvider";
import { tuesdayMakersInitialState } from "@App/hooks/useFreebies";

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
        <UseMakersLibraryProvider defaultState={tuesdayMakersInitialState}>
          <>
            <GlobalEvents />
            <Header />
            <Outlet />
            <FooterPrimary hideSignUp={url === "/tuesday-makers"} />
            <BasicModal />
            <SearchModal />
          </>
        </UseMakersLibraryProvider>
      </ContextLoader>
    </>
  )
}

export default TuesdayMakers