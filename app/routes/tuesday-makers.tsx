import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
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
      {/* <ContextLoader> */}
      <UseMakersLibraryProvider defaultState={tuesdayMakersInitialState}>
        <>
          {/* <GlobalEvents /> */}
          {/* <Header /> */}
          <Outlet />
          {/* <FooterPrimary hideSignUp={url === "/tuesday-makers"} />
            <BasicModal />
            <SearchModal /> */}
        </>
      </UseMakersLibraryProvider>
      {/* </ContextLoader> */}
    </>
  )
}

export default TuesdayMakers