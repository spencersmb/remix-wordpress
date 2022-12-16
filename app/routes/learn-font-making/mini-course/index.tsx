import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getStaticPageMeta } from '@App/utils/pageUtils';
import { getHtmlMetadataTags, mdxPageMetaV2 } from '@App/utils/seo';
import { findCookie } from '@App/utils/loaderHelpers';
import type { IlfmMiniCourseCookie } from '../mini-course';
import { lfmMiniCourseCookie } from '@App/cookies.server';
import { isEmpty } from 'lodash';

export let loader: LoaderFunction = async ({ request }) => {

  // check if there is a cookie from video 1/2/3
  const { hasCookie, data } = await findCookie<IlfmMiniCourseCookie>(request, lfmMiniCourseCookie)

  if (!isEmpty(data)) {
    return redirect('/learn-font-making/mini-course/video-1')
  } else {
    return redirect('/learn-font-making')
  }
};