import { useFonts } from "@App/hooks/useFonts"
import { lfmTestimonialData } from "@App/lib/lfm/testimonials/lfmTestimonialData"
import { fontAssetsFile } from "@App/server/fonts/fontPreviewUtils"
import { lfmImgRoot } from "@App/utils/lfmUtils"
import LfmMiniCourseSignUpForm from "../forms/lfm/miniCourseSignUp"
import LazyImgix from "../images/lazyImgix"
import AboutMe from "./aboutMe"
import CmGrid from "./fontGrid/cmGrid"
import MadeBy from "./madeBy"
import MiniCourseBanner from "./mini-course/miniCourseBanner"
import MiniCourse40k from "./mini-course/miniCourse40k"
import MiniCourseHeader from "./mini-course/miniCourseHeader"
import MiniCourseStep from "./mini-course/miniCourseStep"
import LfmTestimonial from "./testimonial"
import useSite from "@App/hooks/useSite"
import { createImgixSizes } from "@App/utils/imageHelpers"

interface Props {
  date: string
  gridItems: {
    alt: string
    img: string
    link: string
  }[]
}

function LfmClosedPage(props: Props) {
  const { date, gridItems } = props
  const { state: { metadata: { courseLaunchBanners: { lfmBanner } } } } = useSite()

  const assets = fontAssetsFile // have this line in the file to make sure the fonts are loaded
  const { fontLoadingState } = useFonts('skinny')

  const getStartedImg = createImgixSizes({
    src: `${lfmImgRoot.aws}/mini-course/get-started.png`,
    width: 704,
    height: 240,
    mobileSize: 500,
    alt: 'Get Started with the free font course today!',
  })

  const step1 = {
    step: 'Video 1',
    title: 'How to Choose a Font Style that Sells',
    description: 'How I discovered + implemented these steps, which led to over $40,000 in font sales my first year creating + selling hand lettered fonts.',
    image: {
      desktop: `${lfmImgRoot.aws}/mini-course/video-1.jpg`,
      mobile: `${lfmImgRoot.aws}/mini-course/video-1-mobile.jpg`,
      alt: 'Mini Course Step 1',
    }
  }
  const step2 = {
    step: 'Video 2',
    title: '5 Font Making Rookie Mistakes',
    description: '5 of the biggest font making myths + mistakes. Avoid them now to save time and money creating your fonts later.',
    image: {
      desktop: `${lfmImgRoot.aws}/mini-course/video-2.jpg`,
      mobile: `${lfmImgRoot.aws}/mini-course/video-2-mobile.jpg`,
      alt: 'Mini Course Step 2',
    }
  }
  const step3 = {
    step: 'Video 3',
    title: 'The Tools',
    description: 'Everything you need (links included!) to start creating and selling your own hand lettered fonts.',
    image: {
      desktop: `${lfmImgRoot.aws}/mini-course/video-3.jpg`,
      mobile: `${lfmImgRoot.aws}/mini-course/video-3-mobile.jpg`,
      alt: 'Mini Course Step 3',
    }
  }

  return (
    <>
      {/* < !--main intro sign up for mini course-- > */}
      <div className=''>

        {/* HEADER */}
        <MiniCourseHeader
          date={date}
          fontLoadingState={fontLoadingState.status}
          form={<LfmMiniCourseSignUpForm
            type='header'
            inputBg='bg-grey-100' />}
        />

        {/* $40k Intro */}
        <MiniCourse40k
          fontLoadingState={fontLoadingState.status} />

        {/* ABOUT ME */}
        <AboutMe />

        {/* Joy K. Testimonial */}
        <LfmTestimonial
          fontLoadingStatus={fontLoadingState.status}
          testimonial={lfmTestimonialData.joyK}
          direction="full" />

        <div className={'py-10 tablet:py-20'}>
          <MiniCourseBanner>

            {lfmBanner.minicourseSignup && <>
              {/* VIDEO 1 */}
              <MiniCourseStep stepModule={step1} />

              {/* VIDEO 2 */}
              <MiniCourseStep stepModule={step2} />

              {/* VIDEO 3 */}
              <MiniCourseStep stepModule={step3} />
            </>}

          </MiniCourseBanner>
        </div>

        {lfmBanner.minicourseSignup &&
          <div className="p-8 m-6 mx-auto bg-[#e8f3e9] tablet:w-full">
            <div className="max-w-[400px] w-full mx-auto laptop:max-w-[800px] justify-center items-center">
              <div className="flex flex-col max-w-[400px] w-full mx-auto">
                <div className="mb-2">
                  <LazyImgix
                    id={'get-started-img'}
                    blur={false}
                    image={getStartedImg.image}
                    srcSet={getStartedImg.defaultSrc}
                  />
                </div>
                <p className="mb-8 text-xl text-center">
                  Begin the *free* font making mini course today to learn all the basics!
                </p>
              </div>
              <LfmMiniCourseSignUpForm
                type="steps"
                inputBg="bg-white"
              />
            </div>
          </div>
        }

        <MadeBy />

        <div className="w-full mx-auto mb-10 lfm-testimonial__introHeader">
          <p className="text-lfm-blue-700 text-center max-w-[400px] text-5xl mx-auto tablet:text-6xl tablet:max-w-[461PX] font-sentinel__SemiBoldItal">What Students are saying
          </p>
        </div>

        <LfmTestimonial
          fontLoadingStatus={fontLoadingState.status}
          testimonial={lfmTestimonialData.lizU}
          direction="right" />

        <LfmTestimonial
          fontLoadingStatus={fontLoadingState.status}
          testimonial={lfmTestimonialData.beckM} />


        {gridItems && gridItems.length > 0 &&
          <CmGrid gridItems={gridItems} />}

        <div className={'pt-10 tablet:pt-20'}>
          <MiniCourseBanner showForm={true} />
        </div>
      </div>
    </>
  )
}

export default LfmClosedPage
