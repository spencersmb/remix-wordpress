
import LfmMiniCourseSignUpFormFooter from '@App/components/forms/lfm/miniCourseSignUpFooter'
import LazyImgix from '@App/components/images/lazyImgix'
import useSite from '@App/hooks/useSite'
import { breakpointConvertPX, classNames } from '@App/utils/appUtils'
import { lfmImgRoot } from '@App/utils/lfmUtils'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  children?: React.ReactNode
  showForm?: boolean
}

function MiniCourseBanner(props: Props) {
  const { children, showForm } = props
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

  return (


    <div className={classNames(showForm
      ? 'rows-[auto auto 1fr auto auto]'
      : 'rows-[auto_auto_auto_auto]',
      'et-grid-basic gap-y-6')}>

      {/* Background Img */}
      <div
        ref={ref}
        className={classNames(showForm
          ? 'tablet:row-start-1 tablet:row-span-3 tablet:col-span-full laptop:col-start-1 laptop:col-end-full'
          : 'tablet:col-start-6 tablet:col-span-9 tablet:row-start-1 tablet:row-span-2 laptop:row-start-1 laptop:row-span-2 laptop:col-start-4 laptop:col-end-full',
          'miniCourse-vids__background row-start-1 col-span-full min-h-[360px] relative overflow-hidden z-1 bg-lfm-pink-200 bg-[140px_center] bg-no-repeat tablet:min-h-[426px] tablet:mr-[-30px] desktop:mr-[-30px] desktop:min-h-[566px]')}>

        <div className={classNames(showForm
          ? 'desktop:right-[-665px] desktopXl:right-[-945px]'
          : 'desktop:right-[-555px] desktopXl:right-[-765px]',
          'absolute top-[-240px] right-[-505px] mobileWide:right-[-345px] tablet:right-[-495px] tablet:top-[-225px] tablet:mr-[20%] laptop:top-[-205px] laptop:right-[-475px]  desktop:top-[-223px]  desktopXl:mr-[40%]')}>

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
      <div className='relative flex flex-col justify-center col-span-2 col-start-2 row-start-1 my-3 miniCourse-vids__title z-2 tablet:col-start-2 tablet:col-span-7 tablet:mt-16 tablet:mb-0 laptop:mb-0 desktop:mt-[100px] desktop:ml-8'>

        <h2 className='flex flex-col mt-0 text-7xl font-sentinel__SemiBoldItal max-w-[260px] relative text-lfm-blue-700 tablet:text-[80px] tablet:max-w-[400px] tablet:mb-0 laptop:text-[110px] laptop:max-w-[540px] desktop:text-[136px] desktop:max-w-none'>
          Free Font Making
          <span className='opacity-70 w-full max-w-[160px] relative min-h-[86px] tablet:absolute tablet:top-auto tablet:bottom-[-23px] tablet:left-auto tablet:right-[-60px] laptop:max-w-[230px] laptop:right-[-90px] desktop:left-[490px] desktop:max-w-[300px] desktop:right-[-70px] desktop:top-[170px]'>

            {/* WEIRD ISSUE WITH TESTING AND THIS IMAGE NOT WORKING */}
            {process.env.NODE_ENV !== 'test' && <LazyImgix
              id={'mini-course-title-1'}
              image={miniCourseTextImg}
            />}
          </span>
        </h2>

      </div>

      <div className={classNames(showForm ? ' pt-4 tablet:pb-0' : 'py-4 tablet:pb-16 laptop:pb-14 desktop:pb-24', 'relative col-span-2 col-start-2 miniCourse-vids__subtitle tablet:row-start-2 tablet:col-start-2 tablet:col-span-7 z-2 tablet:pt-0 laptop:col-start-2 laptop:col-span-6 desktop:ml-8 desktop:col-start-2 desktop:col-span-5 desktop:pr-0 desktopXl:pr-24 desktop:pt-0')}>
        <p className='max-w-[360px] mx-auto text-center text-lfm-pink-400 text-xl font-medium tablet:max-w-[400px] tablet:m-0 tablet:text-left laptop:max-w-none laptop:text-2xl '>
          Watch the basics of hand lettered font making *and* selling in this 3 part free video series.
        </p>
      </div>

      {showForm && <div className="miniCourse-vids__signUpFooter pb-10 col-start-2 col-span-2 tablet:pb-16 tablet:max-w-[457px] z-2 tablet:row-start-3 tablet:col-start-2 tablet:col-span-12 tablet:min-h-[94px] laptop:min-h-[155px] desktop:pb-32 desktop:ml-8 desktop:max-w-[625px]">
        <LfmMiniCourseSignUpFormFooter />
      </div>}

      {children}

    </div>


  )
}

export default MiniCourseBanner
