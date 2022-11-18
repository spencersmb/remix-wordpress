import Layout from "@App/components/layoutTemplates/layout";
import OurStoryTemplate from "@App/components/pageTemplates/ourStoryTemplate";
import { cacheControl } from "@App/lib/remix/loaders";
import { getStaticPageMeta } from "@App/utils/pageUtils";
import { getBasicPageMetaTags, mdxPageMeta } from "@App/utils/seo";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

const page = getStaticPageMeta({
  title: `Our Story`,
  desc: `Every-Tuesday is an education resource for ambitious graphic designers and hand letterers.`,
  slug: `Our Story`,
})
export let meta = mdxPageMeta

export let loader: LoaderFunction = async ({ request }) => {
  return json({ page }, {
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