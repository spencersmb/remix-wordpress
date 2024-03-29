
import Layout from '@App/components/layoutTemplates/layout'
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import PatternDz from '@App/components/patternPlayground/dzBackgroundPattern';
import UsePatternProvider from '@App/components/patternPlayground/usePatternProvider/patternProvider';
import { patternPlaygroundInitialState } from '@App/components/patternPlayground/usePatternProvider';
import PatternNav from '@App/components/patternPlayground/dzPatternNav';
import { mdxPageMetaV2 } from '@App/utils/seo';
import { getStaticPageMeta } from '@App/utils/pageUtils';

export let meta = mdxPageMetaV2
const page = getStaticPageMeta({
  title: `Pattern Playground`,
  desc: `'Pattern Playground: the must-have app for any Procreate artist who loves making patterns. Experiment with different layouts and colors to bring your designs to life.'`,
  slug: `pattern-playground`,
})
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  // let searchData = {}
  // searchData = await getBrush(url.origin, 'E-T_Custom_Flat_Marker.brush');
  return json({
    page,
    brush: {}
  });
}

export default function BrushPreview() {
  let data = useLoaderData()

  return (
    <Layout>
      <>
        <UsePatternProvider defaultState={patternPlaygroundInitialState} >
          <>
            <PatternDz />
            <PatternNav />
          </>
        </UsePatternProvider>
      </>

    </Layout>
  )
}











