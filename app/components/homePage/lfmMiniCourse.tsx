import useSite from '@App/hooks/useSite'
import { staticImages } from '@App/lib/imgix/data'
import { createImgixSizes } from '@App/utils/imageHelpers'
import { lfmImgRoot } from '@App/utils/lfmUtils'
import { Link } from '@remix-run/react'
import React from 'react'
import LazyImgix from '../images/lazyImgix'
import AccentHeaderText from '../layout/accentHeaderText'
import LazyLoadVideo from '../video/lazyLoadVideo'

interface Props { }

// TODO: TEST THIS
function LfmMiniCourse(props: Props) {
  const { } = props

  const { state: { metadata: { courseLaunchBanners: { lfmBanner } } } } = useSite()

  const isClassOpen = lfmBanner.showBanner === "true"

  const miniCourse = createImgixSizes({
    src: `${lfmImgRoot.imigix}/mini-course/mini-course-title.png`,
    alt: `Every Tuesday Learn Font Making Mini Course`,
    width: 950,
    height: 446,
    mobileSize: 300,
  })

  return (
    <section className='relative flex bg-grey-200 tablet:p-0 et-grid-basic'>

      {/* BG VIDEO */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[730px] overflow-hidden tablet:h-full tablet:w-full tablet:left-auto tablet:translate-x-0 tablet:relative tablet:col-start-1 tablet:col-end-full tablet:row-start-1'>
        <div className='relative block w-full h-full p-0 overflow-hidden'>
          <div className='relative h-full'>
            {process.env.NODE_ENV !== 'test' && <LazyLoadVideo
              className='h-full video-objectFit'
              video={'https://static.showit.co/file/E0ybNlpeQ8qUB00gPpkPEg/124817/bonnie_b_roll_1_-_web.mp4'} />}
            {process.env.NODE_ENV === 'test' && <video
              data-testid='lazyLoadVideo'
              className={'opacity-100 transition-opacity duration-600 ease-in-out delay-300'}
              autoPlay={true}
              muted={true}
              loop
              playsInline
            >
              <source data-src={'https://static.showit.co/file/E0ybNlpeQ8qUB00gPpkPEg/124817/bonnie_b_roll_1_-_web.mp4'} type="video/mp4" />
            </video>}
          </div>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className='relative flex flex-col col-span-2 col-start-2 gap-6 p-6 mb-8 text-center bg-white z-2 mt-60 tablet:col-start-4 tablet:col-span-8 tablet:row-start-1 tablet:my-16 tablet:self-center laptop:col-start-8 laptop:col-span-5 max-w-[433px] mx-auto laptop:items-center'>

        {/* PIN */}
        <div className='absolute top-[-43px] left-[45%] -translate-x-1/2 w-[125px]'>
          <LazyImgix
            id={'tm-pin'}
            image={{
              alt: 'Tuesday Makers Silver Pin',
              width: staticImages.assets.pins.black_1.width,
              height: staticImages.assets.pins.black_1.height,
              src: staticImages.assets.pins.black_1.src,
              placeholder: staticImages.assets.pins.black_1.placeholder,
            }}
          />
        </div>

        {/* TITLE */}
        <div className='max-w-[270px] mx-auto relative text-5xl font-sentinel__SemiBoldItal text-sage-600 desktop:text-6xl pt-4'>
          Free Font Making
          <div className='max-w-[150px] mx-auto mt-2'>
            <LazyImgix
              id={'mini-course'}
              image={miniCourse.image}
            />
          </div>
        </div>

        {/* SUBTEXT */}
        <p className='text-lg font-semibold leading-7'>
          3 part free video series
        </p>

        {/* DESCRIPTION */}
        <p data-testid={'desc'}>
          Learn all the basics of what font making is. Find out the tools you’ll need and what sofware is required to get started making fonts in this free 3 part video series.
        </p>

        {/* LINK */}
        {/* CHECK IF CLASS IS OPEN AND USE AN A TAG SO PEOPLE WHO CLICK ON THE LINK ARE REDIRECTED TO THE OPEN CLASS PAGE ON TEACHABLE */}
        {isClassOpen && <a href={'https://courses.every-tuesday.com/p/learn-font-making'} className={'mt-3 btn btn-primary btn-xl'}>
          View Course
        </a>}
        {!isClassOpen && <Link to={'/learn-font-making'} className={'mt-3 btn btn-primary btn-xl'} prefetch={'intent'}>
          View Mini Course
        </Link>}
      </div>

    </section>
  )
}

export default LfmMiniCourse
