import Layout from "@App/components/layoutTemplates/layout";
import NavPaddingLayout from "@App/components/layoutTemplates/navPaddingLayout";
import RedWreathSvg from "@App/components/svgs/redWreathSvg";
import { getBasicPageMetaTags } from "@App/utils/seo";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";

const description = `Your preferences have been updated on Every-Tuesday.com`;
const title = 'Preferences updated'
const pageInfo = {
  title,
  slug: 'tuesday-makers/updated',
  description,
  seo: {
    title,
    opengraphModifiedTime: '',
    metaDesc: description
  }
}

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
    title,
    desc: description,
    slug: pageInfo.slug
  })
};

export let loader: LoaderFunction = async ({ request }) => {
  return json({ page: pageInfo }, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate" } })
};

export default function Updated() {

  return (
    <NavPaddingLayout bgColor='bg-cream-100'>
      <div className='relative overflow-hidden et-grid-basic'>
        <div className='w-[1000px] absolute bottom-[250px] laptop:bottom-[-520px] left-1/2 -translate-x-1/2 z-1 laptop:w-[1170px] desktop:bottom-[-600px]'>
          <RedWreathSvg />
        </div>
        <div className='relative col-span-2 col-start-2 px-12 py-12 my-16 text-center bg-white shadow-2xl z-2 tablet:col-start-5 tablet:col-span-6 laptop:my-60 desktop:col-span-4 desktop:col-start-6 desktop:my-40'>

          {/* TEXT */}
          <div className='mb-4 text-5xl font-sentinel__SemiBoldItal text-sage-700'>
            Preferences Updated
          </div>
          <div className='mb-10 text-xl text-sage-700'>
            You’re preferences been successfully updated.
          </div>

          {/* BUTTON */}
          <Link to={'/'} className="btn btn-primary btn-lg" prefetch="intent">
            Back to the Homepage
          </Link>
        </div>
      </div>
    </NavPaddingLayout>
  )
}