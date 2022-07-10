import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getStaticPageMeta } from '@App/utils/pageUtils';
import { getHtmlMetadataTags } from '@App/utils/seo';
import { findCookie } from '@App/utils/loaderHelpers';
import type { IlfmMiniCourseCookie } from '../mini-course';
import { lfmMiniCourseCookie } from '@App/cookies.server';
import { isEmpty } from 'lodash';

export let meta: MetaFunction = (rootData): any => {

  /*
  rootData gets passed in from the root metadata function
   */
  const { data, location, parentsData } = rootData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }
  const page = getStaticPageMeta({
    title: `Learn Font Making: Mini Course SignUp - Every Tuesday`,
    desc: `Learn Font Making: Mini Course SignUp!`,
    slug: `mini-course`
  })

  /*
  Build Metadata tags for the page
   */
  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    page,
    location
  })
};

export let loader: LoaderFunction = async ({ request }) => {

  // check if there is a cookie from video 1/2/3
  const { hasCookie, data } = await findCookie<IlfmMiniCourseCookie>(request, lfmMiniCourseCookie)

  if (!isEmpty(data)) {
    return redirect('/learn-font-making/mini-course/video-1')
  } else {
    return redirect('/learn-font-making')
  }
};