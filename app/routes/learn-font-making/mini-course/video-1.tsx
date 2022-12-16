import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import { lfmMiniCourseCookie } from '@App/cookies.server'
import { findCookie } from '@App/utils/loaderHelpers'
import { getStaticPageMeta } from '@App/utils/pageUtils'
import { getHtmlMetadataTags, mdxPageMetaV2 } from '@App/utils/seo'
import type { IlfmMiniCourseCookie } from '../mini-course'
import { miniCourseVideoData } from '@App/utils/lfmUtils';
import useScript from '@App/hooks/useScript';
import VideoPageTemplate from '@App/components/lfm/mini-course/videoPageTemplate';

const page = getStaticPageMeta({
  title: '3 Steps to choosing a font style that sells: Learn Font Making',
  slug: 'learn-font-making/mini-course/video-1',
  desc: 'Learn the 3 steps to choosing fonts that look good and make a lot of money'
})
export let meta = mdxPageMetaV2

export let loader: LoaderFunction = async ({ request, context, params }) => {
  /*
  * Find and get the cookie with its value
  */
  const { hasCookie, data } = await findCookie<IlfmMiniCourseCookie>(request, lfmMiniCourseCookie)
  if (!hasCookie || !data.video1) {
    return redirect('/learn-font-making')
  }

  return json({ page })
}

const LfmMiniCourseVideo1 = () => {
  const context = useOutletContext<MiniCoursePageContext>()
  const video1 = miniCourseVideoData[0]
  const videoUrl = `https://fast.wistia.com/embed/medias/${video1.videoId}.jsonp`
  useScript(videoUrl)

  return (
    <VideoPageTemplate video={video1} products={context.products} />
  )
}

export default LfmMiniCourseVideo1
