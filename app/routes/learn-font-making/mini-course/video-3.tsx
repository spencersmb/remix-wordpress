import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { lfmMiniCourseCookie } from '@App/cookies.server';
import { findCookie } from '@App/utils/loaderHelpers';
import { getStaticPageMeta } from '@App/utils/pageUtils';
import { getHtmlMetadataTags, mdxPageMetaV2 } from '@App/utils/seo';
import type { IlfmMiniCourseCookie } from '../mini-course';
import { miniCourseVideoData } from '@App/utils/lfmUtils';
import VideoPageTemplate from '@App/components/lfm/mini-course/videoPageTemplate';
import useScript from '@App/hooks/useScript';
import MiniCourseSupplies from '@App/components/lfm/mini-course/miniCourseSupplies';


const page = getStaticPageMeta({
  title: 'The tools I use to make hand lettered fonts: Learn Font Making',
  slug: 'learn-font-making/mini-course/video-3',
  desc: 'Over the last year and a half, I’ve had the opportunity to teach the basics of typography to undergraduate graphic design students. During this time, I’ve noticed some common mistakes that my students make when first learning how to work with type.',
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

const LfmMiniCourseVideo2 = () => {
  const context = useOutletContext<MiniCoursePageContext>()
  const video = miniCourseVideoData[2]
  const videoUrl = `https://fast.wistia.com/embed/medias/${video.videoId}.jsonp`
  useScript(videoUrl)

  return (
    <VideoPageTemplate video={video} products={context.products}>
      <MiniCourseSupplies />
    </VideoPageTemplate>
  )
}

export default LfmMiniCourseVideo2
