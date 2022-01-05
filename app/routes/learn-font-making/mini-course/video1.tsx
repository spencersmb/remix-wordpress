import { json, LoaderFunction, MetaFunction, redirect, useLoaderData, useOutletContext } from 'remix'
import { lfmMiniCourseCookie } from '~/cookies.server'
import { findCookie } from '~/utils/loaderHelpers'
import { getStaticPageMeta } from '~/utils/pageUtils'
import { getHtmlMetadataTags } from '~/utils/seo'
import { IlfmMiniCourseCookie } from '../mini-course'

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
    post: null,
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
    return redirect('/learn-font-making/mini-course')
  }

  return json({})
}
const LfmMiniCourseVideo1 = () => {
  const data = useLoaderData()
  const context = useOutletContext()

  return (
    <div>
      LFM HOME Video 1
    </div>
  )
}

export default LfmMiniCourseVideo1
