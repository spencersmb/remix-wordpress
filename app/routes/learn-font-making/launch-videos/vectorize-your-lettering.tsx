import Breadcrumbs from "@App/components/blog/breadcrumbs"
import LazyImgix from "@App/components/images/lazyImgix"
import Layout from "@App/components/layoutTemplates/layout"
import useScript from "@App/hooks/useScript"
import useSite from "@App/hooks/useSite"
import { staticImages } from "@App/lib/imgix/data"
import { breakpointConvertPX } from "@App/utils/appUtils"
import { miniCourseVideoData } from "@App/utils/lfmUtils"
import { getStaticPageMeta } from "@App/utils/pageUtils"
import { getHtmlMetadataTags, mdxPageMetaV2 } from "@App/utils/seo"
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node"

const page = getStaticPageMeta({
  title: 'How to Vectorize Lettering for Font Making',
  slug: 'learn-font-making/launch-videos/vectorize-your-lettering',
  desc: 'Over the last year and a half, I’ve had the opportunity to teach the basics of typography to undergraduate graphic design students. During this time, I’ve noticed some common mistakes that my students make when first learning how to work with type.'
})
export let meta = mdxPageMetaV2

export let loader: LoaderFunction = async ({ request, context, params }) => {
  /*
  * Find and get the cookie with its value
  */

  return json({ page })
}

function VectorizeYourLettering() {
  const video = {
    videoId: 'jt56yr9cam',
  }
  const { state: { breakpoint } } = useSite()
  const wistaScript2 = `https://fast.wistia.com/assets/external/E-v1.js`
  const videoUrl = `https://fast.wistia.com/embed/medias/${video.videoId}.jsonp`
  useScript(wistaScript2)
  useScript(videoUrl)

  const links = [
    {
      url: '/learn-font-making',
      text: 'Learn Font Making'
    },
    {
      url: '/learn-font-making/launch-videos/vectorize-your-lettering',
      text: 'Vectorize Your Letternig'
    }
  ]
  return (
    <Layout>
      <div className='bg-[#F7F6F7] flex flex-col'>

        <div className='et-grid-basic'>

          <div className="relative col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 tablet:mt-8 tablet:pl-5 desktop:col-start-4 desktop:col-span-8">
            <Breadcrumbs links={links} />
          </div>


          <div className='relative col-span-2 col-start-2 my-4 tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 tablet:mt-2 tablet:pl-5 desktop:col-start-4 desktop:col-span-6'>

            <h1 className='text-5xl font-sentinel__SemiBoldItal'>
              {page.title}
            </h1>
          </div>
        </div>

        <div className='et-grid-basic'>

          <div className='col-span-2 col-start-2 mb-12 pt-[40px] tablet:col-start-2 tablet:col-span-12 tablet:px-5 laptop:col-start-3 laptop:col-span-10 laptop:px-5 desktop:col-start-4 desktop:col-span-8'>

            {/* VIDEO */}
            <div className="relative w-full mb-8 content">
              <div className="embed-responsive-16by9 relative pb-[56.25%] h-0 block mx-auto text-center z-2">
                <div className="wistia_responsive_padding">
                  <div className="wistia_responsive_wrapper"
                    style={{ height: '100%', left: '0', position: 'absolute', top: '0', width: '100%' }}>
                    <div
                      data-testid='wistia-video'
                      className={`wistia_embed wistia_async_${video.videoId} videoFoam=true`} style={{ height: ' 100%', width: ' 100%' }}>
                      &nbsp;
                    </div>
                  </div>
                </div>
              </div>


              {
                breakpointConvertPX(breakpoint) >= 1200 && <>
                  {/* Alphabet Img */}
                  <div className="absolute top-[-50px] left-[-300px] max-w-[850px] w-full h-full z-1">
                    <LazyImgix
                      id={'alphabet'}
                      image={{
                        width: staticImages.lettering.alphabet.width,
                        height: staticImages.lettering.alphabet.height,
                        alt: 'Learn Font Making Free Mini Course Alphabet Sketch',
                        src: staticImages.lettering.alphabet.src,
                        placeholder: staticImages.lettering.alphabet.placeholder
                      }} />
                  </div>

                  <div className="absolute top-[50px] left-[300px] max-w-[850px] w-full h-full z-1 desktopXl:top-[100px]">
                    <LazyImgix
                      id={'alphabet'}
                      image={{
                        width: staticImages.lettering.alphabet.width,
                        height: staticImages.lettering.alphabet.height,
                        alt: '',
                        src: staticImages.lettering.alphabet.src,
                        placeholder: staticImages.lettering.alphabet.placeholder
                      }} />
                  </div>
                </>
              }

            </div>

            {/* DESCRIPTION */}
            <p className='text-lg tablet:text-xl'>
              {page.seo.metaDesc}
            </p>

          </div>

        </div>

      </div>

    </Layout>
  )
}
export default VectorizeYourLettering