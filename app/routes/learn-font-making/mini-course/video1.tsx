import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import { lfmMiniCourseCookie } from '@App/cookies.server'
import { findCookie } from '@App/utils/loaderHelpers'
import { getStaticPageMeta } from '@App/utils/pageUtils'
import { getHtmlMetadataTags } from '@App/utils/seo'
import type { IlfmMiniCourseCookie } from '../mini-course'
import { miniCourseVideoData } from '@App/utils/lfmUtils';
import useScript from '@App/hooks/useScript';
import VideoPageTemplate from '@App/components/lfm/mini-course/videoPageTemplate';

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
  console.log('data', location)

  const page = getStaticPageMeta({
    title: `Learn Font Making - Mini Course: Video 1`,
    desc: `Learn Font Making: Mini Course - Video 1: Choosing a Font Style that Sells`,
    slug: `video-1`
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
  if (!hasCookie || !data.video1) {
    return redirect('/learn-font-making')
  }

  return json({})
}



const LfmMiniCourseVideo1 = () => {
  // const data = useLoaderData()
  const context = useOutletContext()
  const video1 = miniCourseVideoData[0]
  const videoUrl = `https://fast.wistia.com/embed/medias/${video1.videoId}.jsonp`
  useScript(videoUrl)

  return (
    <VideoPageTemplate video={video1} />
  )
}

export default LfmMiniCourseVideo1
