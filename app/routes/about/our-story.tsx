import Layout from "@App/components/layoutTemplates/layout";
import OurStoryTemplate from "@App/components/pageTemplates/ourStoryTemplate";
import { cacheControl } from "@App/lib/remix/loaders";
import { getBasicPageMetaTags } from "@App/utils/seo";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

const description = `Every-Tuesday is an education resource for ambitious graphic designers and hand letterers.`;
const title = 'About Every Tuesday'
const pageInfo = {
  title,
  slug: 'about',
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
  return json({ page: pageInfo }, {
    headers: {
      ...cacheControl
    }
  })
};

export default function About() {

  return (
    <Layout bgColor="bg-cream-100">
      <OurStoryTemplate />
    </Layout>
  )
}