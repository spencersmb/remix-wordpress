import Layout from "@App/components/layoutTemplates/layout";
import { getBasicPageMetaTags } from "@App/utils/seo";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

const description = `Every-Tuesday is sad to see you go. We hope you enjoyed the content and found it useful. If you have any feedback, please let us know.`;
const title = 'Every-Tuesday Unsubscribe'
const pageInfo = {
  title,
  slug: 'tuesday-makers/unsubscribe',
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

export default function About() {

  return (
    <Layout bgColor="bg-cream-100">
      <div>
        Unsubscirbe
      </div>
    </Layout>
  )
}