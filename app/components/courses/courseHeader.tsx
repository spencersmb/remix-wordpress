import { staticImages } from '@App/lib/imgix/data'
import LazyImgix from '../images/lazyImgix'
import { createImgixSizes, imgixDir } from '@App/utils/imageHelpers'
import LfmArrowSvg from '../svgs/lfmArrowSvg'
import { navStyles } from '@App/utils/pageUtils'

/**
 * @component CourseHeader
 * @tested - 5/25/2022
 */
function CourseHeader() {


  const teela = createImgixSizes({
    width: 1500,
    height: 1200,
    alt: 'Teela drinking coffee with Hamerly Mug',
    src: `${imgixDir.images}/course-header-coffee-1.1.jpg`,
    mobileSize: 800,
  })

  const flowers = createImgixSizes({
    width: 1621,
    height: 1348,
    alt: 'Flat florals by Teela',
    src: `${imgixDir.images}/course-header-flowers-1.1-min.png`,
    mobileSize: 400,
  })

  return (
    <div className='grid grid-flow-row grid-rows-[auto_auto_minmax(60px,auto)_auto] text-white grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop desktop:grid-rows-[auto_auto_minmax(120px,auto)_auto]'>

      <div className={`${navStyles} relative col-span-2 col-start-2 row-start-1 mt-8 mb-2 z-2 font-sentinel__SemiBoldItal tablet:col-start-2 tablet:col-span-4 tablet:mt-14 desktop:mt-20 desktop:mb-4 desktop:text-xl`}>Online Courses</div>

      <div className='relative col-span-2 col-start-2 row-start-2 mb-8 z-2 tablet:col-start-2 tablet:col-span-12 tablet:mb-12 laptop:col-start-2 laptop:col-span-9 desktop:mb-20 desktop:col-start-2 desktop:col-span-10 desktopXl:col-start-2 desktopXl:col-span-9'>
        <div className='text-3xl font-semibold tablet:text-[39px] tablet:leading-[47px] desktop:text-6xl desktop:font-medium desktop:leading-[4.5rem]'>
          I love sharing what I’ve learned over my career and motivating others to create something new every week.
        </div>
      </div>

      <div className='relative col-span-2 col-start-2 row-span-2 row-start-3 image z-2 tablet:col-start-2 tablet:col-span-8 tablet:px-8 laptop:col-start-2 laptop:col-span-7 desktop:col-start-2 desktop:col-span-6 desktop:pl-16 desktop:pr-0'>

        <LazyImgix
          id={'teela-coffee'}
          image={teela.image}
          sizes="(max-width: 666px) 90vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
          srcSet={
            `
           ${teela.defaultSrc}&w=600&fit=clip 600w,
           ${teela.defaultSrc}&w=900&fit=clip 900w,
           ${teela.defaultSrc}&w=1200&fit=clip 1200w,
           `}
        />

        <div className='absolute bottom-[-30px] left-[-30px] w-[75px] rotate-[257deg] desktop:bottom-[-40px]'>
          <LfmArrowSvg fill='var(--sage-900)' />
        </div>

        <div className='absolute bottom-[-90px] left-[0] w-[200px] font-bonVivant text-sage-800 text-4xl rotate-[-6deg] desktop:bottom-[-100px]'>
          Hey, I'm Teela. Your instructor.
        </div>

      </div>

      <div className='col-span-2 col-start-2 row-start-5 mt-32 text-sage-800 tablet:col-start-10 tablet:col-span-4 tablet:row-start-4 tablet:mt-6 tablet:ml-[-30px] laptop:col-start-9 laptop:col-span-5 laptop:justify-center laptop:flex laptop:flex-col laptop:mt-0 desktop:col-start-8 desktop:ml-[30px] desktop:col-span-5'>

        <div className='max-w-[315px] text-4xl font-sentinel__SemiBoldItal mb-4 tablet:text-3xl laptop:max-w-[340px] desktop:text-5xl desktop:max-w-[415px]'>
          High quality video & class assets
        </div>

        <p className='text-lg'>
          I’ve taught over 200,000 students and my design + lettering videos on YouTube have accumulated over 19 million views.
        </p>
      </div>

      <div className='relative row-span-3 row-start-1 overflow-hidden bg-sage-800 col-span-full z-1'>

        <div className='absolute bottom-0 right-[-220px] w-[400px] tablet:right-[-160px] laptop:right-[-120px] laptop:w-[470px] desktop:w-[730px] desktop:right-[-160px] desktopXl:'>
          <LazyImgix
            id={'flowers'}
            image={flowers.image}
            visibleByDefault={true}
            sizes="(max-width: 666px) 90vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
            srcSet={
              `
           ${flowers.defaultSrc}&w=600&fit=clip 600w,
           ${flowers.defaultSrc}&w=900&fit=clip 900w,
           ${flowers.defaultSrc}&w=1200&fit=clip 1200w,
           `}
          />
        </div>

      </div>

    </div>

  )

}

export default CourseHeader
