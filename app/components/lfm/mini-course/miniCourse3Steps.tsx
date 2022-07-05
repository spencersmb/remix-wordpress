import LazyImgix from '@App/components/images/lazyImgix'
import useSite from '@App/hooks/useSite'
import { breakpointConvertPX } from '@App/utils/appUtils'
import { lfmImgRoot } from '@App/utils/lfmUtils'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import MiniCourseStep from './miniCourseStep'

interface Props { }

function MiniCourse3Steps(props: Props) {
  const miniCourseTextImg = {
    src: `${lfmImgRoot.aws}/mini-course/mini-course-title--desktop.png`,
    width: 950,
    height: 446,
    alt: 'Mini Course Title',
  }
  const [ref, inView] = useInView()
  const [loaded, setLoaded] = useState(false)
  const { state: { breakpoint } } = useSite()

  useEffect(() => {
    if (inView) {
      setLoaded(true)
    }
  }, [inView])

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
    <div className='py-10 tablet:py-20'>

      <div className="et-grid-basic rows-[auto_auto_auto_auto] gap-y-6">

        {/* Background Img */}
        <div
          ref={ref}
          className="miniCourse-vids__background row-start-1 col-span-full min-h-[433px] relative overflow-hidden z-1 bg-lfm-pink-200 bg-[140px_center] bg-no-repeat tablet:min-h-[426px] tablet:col-start-6 tablet:col-span-9 tablet:row-start-1 tablet:row-span-2 tablet:mr-[-30px] laptop:row-start-1 laptop:row-span-2 laptop:col-start-4 laptop:col-end-full desktop:mr-[-30px] desktop:min-h-[566px]">

          <div className='absolute top-[-240px] right-[-505px] mobileWide:right-[-345px] tablet:right-[-495px] tablet:top-[-225px] tablet:mr-[20%] laptop:top-[-205px] laptop:right-[-475px] desktop:right-[-555px] desktop:top-[-223px] desktopXl:right-[-765px] desktopXl:mr-[40%]'>

            {breakpointConvertPX(breakpoint) >= 768 && loaded && <img
              className='max-w-[740px] tablet:max-w-[830px] laptop:max-w-[840px] desktop:max-w-[1100px] desktopXl:max-w-[1180px] animate-fadeIn'
              width={'1596px'}
              height={'2000px'}
              src={`${lfmImgRoot.aws}/mini-course/footer_hero.jpg`} alt="Learn Font Making Mini Course: Enroll for free!" />}

            {breakpointConvertPX(breakpoint) < 768 && loaded && <img
              className='max-w-[740px] tablet:max-w-[830px] laptop:max-w-[840px] desktop:max-w-[1100px] desktopXl:max-w-[1180px] animate-fadeIn'
              width={'830px'}
              height={'1040px'}
              src={`${lfmImgRoot.aws}/mini-course/footer_hero-mobile.jpg`} alt="Learn Font Making Mini Course: Enroll for free!" />}

            {/* <picture>
              <source
                srcSet={`${lfmImgRoot.aws}/mini-course/footer_hero.jpg`}
                media="(min-width: 768px)"
              />
              <source
                srcSet={`${lfmImgRoot.aws}/mini-course/footer_hero-mobile.jpg`}
                media="(min-width: 320px)"
              />
              <img
                className='max-w-[740px] tablet:max-w-[830px] laptop:max-w-[840px] desktop:max-w-[1100px] desktopXl:max-w-[1180px]'
                src={`${lfmImgRoot.aws}/mini-course/footer_hero-mobile.jpg`} alt="Learn Font Making Mini Course: Enroll for free!" />
            </picture> */}
          </div>
        </div>

        {/* HEADING */}
        <div className='relative flex flex-col justify-center col-span-2 col-start-2 row-start-1 my-12 miniCourse-vids__title z-2 tablet:col-start-2 tablet:col-span-7 tablet:mt-16 tablet:mb-10 laptop:mb-0 desktop:mt-[100px] desktop:ml-8'>

          <h2 className='flex flex-col mt-0 text-7xl font-sentinel__SemiBoldItal max-w-[260px] relative text-lfm-blue-700 tablet:text-[80px] tablet:max-w-[400px] tablet:mb-0 laptop:text-[110px] laptop:max-w-[540px] desktop:text-[136px] desktop:max-w-none'>
            Free Font Making
            <span className='opacity-70 w-full max-w-[160px] relative min-h-[86px] tablet:absolute tablet:top-auto tablet:bottom-[-23px] tablet:left-auto tablet:right-[-60px] laptop:max-w-[230px] laptop:right-[-90px] desktop:left-[490px] desktop:max-w-[300px] desktop:right-[-70px] desktop:top-[170px]'>
              <LazyImgix
                id={'mini-course-title-1'}
                image={miniCourseTextImg}
              />
            </span>
          </h2>

        </div>

        <div className="relative col-span-2 col-start-2 py-4 miniCourse-vids__subtitle tablet:row-start-2 tablet:col-start-2 tablet:col-span-7 z-2 tablet:pb-16 tablet:pt-0 laptop:col-start-2 laptop:col-span-6 laptop:pt-7 laptop:pb-14 desktop:ml-8 desktop:col-start-2 desktop:col-span-5 desktop:pr-0 desktopXl:pr-24 desktop:pt-0 desktop:pb-24">
          <p className='max-w-[360px] mx-auto text-center text-lfm-pink-400 text-xl font-medium tablet:max-w-[400px] tablet:m-0 tablet:text-left laptop:max-w-none laptop:text-2xl '>
            Watch the basics of hand lettered font making *and* selling in this 3 part free video series.
          </p>
        </div>

        {/* ./HEADING */}

        {/* VIDEO 1 */}
        <MiniCourseStep stepModule={step1} />

        {/* VIDEO 2 */}
        <MiniCourseStep stepModule={step2} />

        {/* VIDEO 3 */}
        <MiniCourseStep stepModule={step3} />

      </div>

    </div>
  )
}

export default MiniCourse3Steps
