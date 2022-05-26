import { json, LoaderFunction, MetaFunction, redirect } from '@remix-run/node';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import React from 'react'
import { lfmMiniCourseCookie } from '@App/cookies.server';
import { findCookie } from '@App/utils/loaderHelpers';
import { getStaticPageMeta } from '@App/utils/pageUtils';
import { getHtmlMetadataTags } from '@App/utils/seo';
import { IlfmMiniCourseCookie } from '../mini-course';

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
    title: `Learn Font Making - Mini Course: Video 2`,
    desc: `Learn Font Making: Mini Course - Video 2: Rookie Font Making Mistakes`,
    slug: `video-2`
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

export let loader: LoaderFunction = async ({ request, context, params }) => {
  /*
  * Find and get the cookie with its value
  */
  const { hasCookie, data } = await findCookie<IlfmMiniCourseCookie>(request, lfmMiniCourseCookie)
  if (!hasCookie || !data.video2) {
    return redirect('/learn-font-making/mini-course')
  }

  return json({})
}

function LfmMiniCourseVideo2() {
  const data = useLoaderData()
  const context = useOutletContext()

  return (
    <div>
      LFM Video 2
    </div>
  )
}

export default LfmMiniCourseVideo2
