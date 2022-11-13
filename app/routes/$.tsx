import Layout from "@App/components/layoutTemplates/layout";
import { getBasicPageMetaTags } from "@App/utils/seo";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import { Link } from "@remix-run/react";

export let meta: MetaFunction = (metaData): any => {

  /*
  metaData gets passed in from the root metadata function
   */
  const { data, location, parentsData } = metaData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  /*
  Build Metadata tags for the page
   */
  return getBasicPageMetaTags(metaData, {
    title: `Oops! Page Not Found`,
    desc: `We couldn't find the page you were looking for.`,
    slug: location.pathname
  }, { googleIndex: false })
};
export const loader: LoaderFunction = async ({ request }) => {
  return json("Not Found", {
    status: 404
  })
}

export default function NotFound() {
  return (
    <Layout bgColor="bg-cream-100">
      <div className="et-grid-basic">
        <div className="flex flex-col col-span-2 col-start-2 my-12 mb-20 text-center tablet:col-start-3 tablet:col-span-10">
          <h1 className="mb-4 text-5xl font-sentinel__SemiBoldItal">Page not Found</h1>
          <p className="mb-8">
            If you encountered this in error, please contact us.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-[300px] mx-auto">
            <Link
              className="btn btn-lg btn-primary"
              to={'/'} key={'homepage'} prefetch={"intent"} >Homepage</Link>

            <Link
              className="btn btn-lg btn-outline"
              to={'contact'} key={'contact'} prefetch={"intent"} >Contact Us</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}