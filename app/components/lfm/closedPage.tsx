import { useFonts } from "@App/hooks/useFonts"
import { lfmTestimonialData } from "@App/lib/lfm/testimonials/lfmTestimonialData"
import { fontAssetsFile } from "@App/server/fonts/fontPreviewUtils"
import { lfmImgRoot } from "@App/utils/lfmUtils"
import LfmMiniCourseSignUpForm from "../forms/lfm/miniCourseSignUp"
import LazyImgix from "../images/lazyImgix"
import AboutMe from "./aboutMe"
import MadeBy from "./madeBy"
import MiniCourse3Steps from "./mini-course/miniCourse3Steps"
import MiniCourse40k from "./mini-course/miniCourse40k"
import MiniCourseHeader from "./mini-course/miniCourseHeader"
import LfmTestimonial from "./testimonial"

interface Props {
  date: string
}

function LfmClosedPage(props: Props) {
  const { date } = props
  const assets = fontAssetsFile
  const { fontLoadingState } = useFonts('skinny')

  const getStartedImg = {
    src: `${lfmImgRoot.aws}/mini-course/get-started.png`,
    width: 704,
    height: 240,
    alt: 'Get Started with the free font course today!',
  }
  return (
    <>
      {/* < !--main intro sign up for mini course-- > */}
      <div className=''>

        {/* HEADER */}
        <MiniCourseHeader
          date={date}
          fontLoadingState={fontLoadingState.status}
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

        <MiniCourse3Steps />

        <div className="p-8 m-6 mx-auto bg-[#e8f3e9] tablet:w-full">
          <div className="max-w-[400px] w-full mx-auto laptop:max-w-[800px] justify-center items-center">
            <div className="flex flex-col max-w-[400px] w-full mx-auto">
              <div className="mb-2">
                <LazyImgix
                  id={'get-started-img'}
                  blur={false}
                  image={getStartedImg}
                />
              </div>
              <p className="mb-8 text-xl text-center">
                Begin the *free* font making mini course today to learn all the basics!
              </p>
            </div>
            <LfmMiniCourseSignUpForm
              idLoop="2"
              inputBg="bg-white"
            />
          </div>
        </div>

        <MadeBy />

        <LfmTestimonial
          fontLoadingStatus={fontLoadingState.status}
          testimonial={lfmTestimonialData.joyK} />
        <LfmTestimonial
          fontLoadingStatus={fontLoadingState.status}
          testimonial={lfmTestimonialData.joyK}
          direction="right" />

      </div>
    </>
  )
}

export default LfmClosedPage
