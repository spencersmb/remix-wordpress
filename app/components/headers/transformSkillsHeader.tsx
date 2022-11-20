import { staticImages } from '@App/lib/imgix/data'
import { createImgixSizes } from '@App/utils/imageHelpers'
import React from 'react'
import TmSignupForm from '../forms/tuesdayMakers/tmSignupForm'
import LazyImgix from '../images/lazyImgix'

interface Props { }
function TransformSkillsHeader(props: Props) {
  const { } = props
  const transformSkillsImage = createImgixSizes({
    width: 2634,
    height: 1487,
    mobileSize: 800,
    alt: `Every Tuesday - Transform Your Procreate Skills`,
    src: 'https://et-website.imgix.net/et-website/images/transformSkills_1.jpg',
  })
  const applePencil = createImgixSizes({
    width: 300,
    height: 828,
    mobileSize: 800,
    alt: `Apple Pencil`,
    src: staticImages.assets.applePencil.angledRight.src
  })
  return (
    <section className='et-grid-basic'>
      {/* HEADER IMG */}
      <div className='relative col-span-2 col-start-2 mb-8 tablet:col-start-3 tablet:col-span-10 tablet:mt-8 laptop:col-start-4 laptop:col-span-8 desktop:col-start-5 desktop:col-span-6 desktopXl:col-start-4 desktopXl:col-span-8 desktopMax:col-start-3 desktopMax:col-span-10'>

        {/* MAIN IMAGE */}
        <div className='relative z-1'>
          <LazyImgix
            id='skills'
            visibleByDefault={true}
            image={transformSkillsImage.image}
            sizes="(max-width: 666px) 100w, (max-width: 1279px) 70vw, (min-width: 1280px) 50vw, 1204px"
            srcSet={
              `
                ${transformSkillsImage.defaultSrc}&w=800&fit=clip 800w,
                ${transformSkillsImage.defaultSrc}&w=1200&fit=clip 1200w,
                ${transformSkillsImage.defaultSrc}&w=1400&fit=clip 1400w,
                ${transformSkillsImage.defaultSrc}&w=2000&fit=clip 2000w,
                ${transformSkillsImage.defaultSrc}&w=2400&fit=clip 2400w,
              `
            }
          />
          <div className='absolute top-[-225px] right-[-260px] z-2 w-[200px] rotate-45 tablet:top-[-155px] tablet:right-[-230px] desktopXl:w-[300px] desktopXl:right-[-395px] desktopXl:top-[-28%] desktopMax:top-[-6%] desktopMax:right-[-365px]'>
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
          </div>
        </div>

        {/* APPLE PENCIL */}

      </div>

      <div className='col-span-2 col-start-2 tablet:col-start-3 tablet:col-span-10 tablet:mb-8 laptop:col-start-4 laptop:col-span-8 laptop:max-w-[837px] mx-auto'>
        <p className='text-xl text-center'>
          Up your skills and open new creative + financial opportunities by joining the Tuesday Tribe! It’s free and comes with 50+ design and lettering files (we’re talking fonts, textures, patterns + Procreate brushes) you can start using today!
        </p>
      </div>

      <div className='col-span-2 col-start-2 tablet:col-start-3 tablet:col-span-10 tablet:mb-8 laptop:col-start-5 laptop:col-span-6'>
        <div className='w-full'>
          <TmSignupForm
            inputBg='bg-sage-50'
            formName={'tm-landing-page'} />
        </div>
      </div>
    </section>
  )
}

export default TransformSkillsHeader
