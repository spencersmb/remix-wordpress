import React from 'react'
import { json, LoaderFunction, MetaFunction, redirect, useLoaderData, useOutletContext } from 'remix'
import { lfmMiniCourseCookie } from '~/cookies.server';
import { findCookie } from '~/utils/loaderHelpers';
import { getHtmlMetadataTags } from '~/utils/seo';
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

  const page: IPage = {
    id: '25',
    title: 'Procreate 5x Bonus Downloads',
    author: {
      id: '25',
      name: 'Teela',
      avatar: {
        url: '',
        width: 24,
        height: 24
      },
      slug: 'teela'
    },
    slug: 'bl',
    content: '',
    date: '',
    seo: {
      title: 'Procreate 5x Bonus Downloads - Every Tuesday',
      metaDesc: 'Procreate 5x Bonus Downloads members only access!',
      opengraphModifiedTime: '',
      opengraphPublishedTime: '',
      readingTime: '3min'
    }
  }

  /*
  Build Metadata tags for the page
   */
  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: null,
    page,
    location
  })
};

export let loader: LoaderFunction = async ({ request, context, params }) => {
  // check for video 1 cookie
  const { hasCookie, data }: IlfmMiniCourseCookie = await findCookie(request, lfmMiniCourseCookie)
  if (!hasCookie || !data.video3) {
    return redirect('/learn-font-making/mini-course')
  }

  return json({})
}

function LfmMiniCourseVideo3() {
  const data = useLoaderData()
  const context = useOutletContext()

  return (
    <div>
      LFM Video 3
    </div>
  )
}

export default LfmMiniCourseVideo3
