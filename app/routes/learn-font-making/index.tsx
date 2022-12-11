import { lfmMiniCourseSignUpAction } from '@App/actions/lfmMiniCourseActions';
import Layout from '@App/components/layoutTemplates/layout';
import LfmClosedPage from '@App/components/lfm/closedPage';
import LfmHomeMiniCourse from '@App/components/pageTemplates/lfm/lfmHomeMiniCourse';
import useSite from '@App/hooks/useSite'
import { cacheControl } from '@App/lib/remix/loaders';
import { shuffleArray } from '@App/utils/lfmUtils';
import { getStaticPageMeta } from '@App/utils/pageUtils';
import { formatDate } from '@App/utils/posts'
import { getBasicPageMetaTags, mdxPageMeta } from '@App/utils/seo';
import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import gridItemsJson from '../../server/fonts/gridItems.json'

const page = getStaticPageMeta({
  title: 'Learn Font Making: Mini-Course SignUp',
  desc: 'The proven step-by-step process to create professional and profitable hand lettered fonts.',
  slug: 'learn-font-making',
})
export let meta = mdxPageMeta
export let loader: LoaderFunction = async ({ request, params }) => {

  const gridItems = gridItemsJson
  return json({
    page,
    gridItems: shuffleArray(gridItems.items)
  })
};

export let action: ActionFunction = async ({ request }): Promise<MiniCourseSignUpActionData | Response> =>
  (lfmMiniCourseSignUpAction(request));

interface Props { }

function LfmLandingPage(props: Props) {
  let data = useLoaderData<any>();


  return (
    <Layout>
      <LfmHomeMiniCourse data={data} />
    </Layout>
  )
}

export default LfmLandingPage
