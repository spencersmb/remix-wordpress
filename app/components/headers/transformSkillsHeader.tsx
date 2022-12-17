import { staticImages } from '@App/lib/imgix/data'
import { createImgixSizes } from '@App/utils/imageHelpers'
import { navStyles } from '@App/utils/pageUtils'
import React from 'react'
import TmSignupForm from '../forms/tuesdayMakers/tmSignupForm'
import LazyImgix from '../images/lazyImgix'

interface Props { }
function TransformSkillsHeader(props: Props) {
  const { } = props
  const flowerBorder = createImgixSizes({
    width: 1563,
    height: 304,
    mobileSize: 800,
    alt: `Every Tuesday - Transform Your Procreate Skills`,
    src: 'https://et-website.imgix.net/et-website/images/flower-border-01.1-min.png',
  })
  const textImg = createImgixSizes({
    width: 1638,
    height: 814,
    mobileSize: 800,
    alt: `Every Tuesday - Transform Your Procreate Skills`,
    src: 'https://et-website.imgix.net/et-website/images/lets-make-title-1-min.png',
  })
  const applePencil = createImgixSizes({
    width: 300,
    height: 828,
    mobileSize: 800,
    alt: `Apple Pencil`,
    src: staticImages.assets.applePencil.angledRight.src
  })
  const flowerBg = createImgixSizes({
    width: 1312,
    height: 1205,
    mobileSize: 600,
    alt: `Every Tuesday - Transform Your Procreate Skills`,
    src: 'https://et-website.imgix.net/et-website/images/flower-bouquet-1.1-min.png',
  })
  return (
    <section className={`bg-tangerine-50 ${navStyles}`}>
      <div className='relative py-16 pb-8 et-grid-basic laptop:pb-16 desktop:pt-8 desktopXl:py-0'>


        {/* Border IMAGE */}
        <div className='absolute top-0 w-full -translate-x-1/2 left-1/2 desktop:top-[-100px]'>
          <LazyImgix
            id='skills'
            visibleByDefault={true}
            image={flowerBorder.image}
            sizes="(max-width: 666px) 100w, (max-width: 1279px) 70vw, (min-width: 1280px) 50vw, 1204px"
            srcSet={
              `
              ${flowerBorder.defaultSrc}&w=800&fit=clip 800w,
              ${flowerBorder.defaultSrc}&w=1200&fit=clip 1200w,
              ${flowerBorder.defaultSrc}&w=1400&fit=clip 1400w,
              ${flowerBorder.defaultSrc}&w=2000&fit=clip 2000w,
              ${flowerBorder.defaultSrc}&w=2400&fit=clip 2400w,
            `
            }
          />
          {/* <div className='absolute top-[-225px] right-[-260px] z-2 w-[200px] rotate-45 tablet:top-[-155px] tablet:right-[-230px] desktopXl:w-[300px] desktopXl:right-[-395px] desktopXl:top-[-28%] desktopMax:top-[-6%] desktopMax:right-[-365px]'>
          <LazyImgix id='pencil'
            visibleByDefault={true}
            image={applePencil.image}
            sizes="(max-width: 666px) 20w, (max-width: 1279px) 30vw, 300px"
            srcSet={
              `
                ${applePencil.defaultSrc}&w=400&fit=clip 400w,
                ${applePencil.defaultSrc}&w=600&fit=clip 600w,
                ${applePencil.defaultSrc}&w=800&fit=clip 800w,
                ${applePencil.defaultSrc}&w=900&fit=clip 900w,
                ${applePencil.defaultSrc}&w=1000&fit=clip 1000w,
              `
            }
          />
        </div> */}
        </div>

        {/* HEADER IMG */}
        <div className='relative flex items-center col-span-2 col-start-2 mt-8 tablet:col-start-2 tablet:col-span-12 tablet:mt-20 laptop:col-start-2 laptop:col-span-12 laptop:max-w-[837px] laptop:mx-auto laptop:w-full laptop:mt-36 laptop:mb-4 desktopXl:mb-32 desktop:col-start-2 desktop:col-span-7 desktop:ml-16 desktopXl:col-start-2 desktopXl:col-span-7 desktopXl:items-end desktopXl:ml-0 '>

          <LazyImgix
            id='text'
            visibleByDefault={true}
            image={textImg.image}
            sizes="(max-width: 666px) 100w, (max-width: 1279px) 70vw, (min-width: 1280px) 50vw, 1204px"
            srcSet={
              `
              ${textImg.defaultSrc}&w=800&fit=clip 800w,
              ${textImg.defaultSrc}&w=1200&fit=clip 1200w,
              ${textImg.defaultSrc}&w=1400&fit=clip 1400w,
              ${textImg.defaultSrc}&w=2000&fit=clip 2000w,
              ${textImg.defaultSrc}&w=2400&fit=clip 2400w,
            `
            }
          />
        </div>

        <div className='relative flex col-span-2 col-start-2 mt-8 tablet:max-w-[475px] mx-auto tablet:col-start-2 tablet:col-span-12 desktop:mt-28 desktop:col-start-10 desktop:col-span-4 desktopXl:col-start-9 desktopXl:col-span-5  desktopXl:mx-10 desktopXl:mb-28 desktopXl:mt-44'>

          <div className='relative w-full p-8 text-white bg-emerald-700 z-2'>
            <p className='mb-4 text-2xl font-semibold tablet:text-4xl'>Download hundereds of free procreate assets and start creating today.</p>
            <p className='text'>
              Up your skills and open new creative + financial opportunities by joining the Tuesday Tribe! It’s free and comes with 50+ design and lettering files (we’re talking fonts, textures, patterns + Procreate brushes) you can start using today!
            </p>
            <TmSignupForm
              flexRow={false}
              inputBg='bg-sage-50 hover:ring-emerald-400 ring-offset-emerald-700 focus:ring-emerald-100'
              formName={'tm-landing-page'} />
          </div>

          <div className='hidden absolute top-0 left-0 w-[600px] tablet:block tablet:left-[30%] tablet:top-[60%] -translate-x-1/2 -translate-y-1/2 z-1 laptop:left-[20%] desktop:hidden'>
            <LazyImgix
              id='flowerBg'
              visibleByDefault={true}
              image={flowerBg.image}
              sizes="(max-width: 666px) 100w, (max-width: 1279px) 70vw, (min-width: 1280px) 50vw, 1204px"
              srcSet={
                `
              ${flowerBg.defaultSrc}&w=800&fit=clip 800w,
              ${flowerBg.defaultSrc}&w=1200&fit=clip 1200w,
              ${flowerBg.defaultSrc}&w=1&fit=clip 1400w,
            `
              }
            />
          </div>


        </div>

      </div>


    </section>
  )
}

export default TransformSkillsHeader
