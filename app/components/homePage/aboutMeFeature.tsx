import { staticImages } from '@App/lib/imgix/data'
import { createImgixSizes } from '@App/utils/imageHelpers'
import { Link } from '@remix-run/react'
import React from 'react'
import LazyImgix from '../images/lazyImgix'
import AccentHeaderText from '../layout/accentHeaderText'

interface Props { }

function AboutMeFeature(props: Props) {
  const { } = props

  const authorImg = createImgixSizes({
    width: 600,
    height: 900,
    alt: `Every Tuesday: Teelas profile picture`,
    src: staticImages.profiles.teela.vertical.src,
    mobileSize: 600,
    params: `&fit=crop&crop=faces&h=900`
  })
  const ipadImg = createImgixSizes({
    width: 900,
    height: 900,
    alt: `Every Tuesday: Teelas profile picture`,
    src: 'https://et-teachable.imgix.net/procreate201/env-2.jpg',
    mobileSize: 450,
    params: `&fit=crop&w=900&h=900`
  })
  const redTexture = createImgixSizes({
    staticImage: staticImages.textures.red.A,
    alt: `Every Tuesday: Teela's Paint Brushes`,
    mobileSize: 500,
  })

  return (
    <section className='py-32 pb-16 et-grid-basic tablet:grid-rows-[auto_1fr] tablet:pt-16 desktop:py-32'>

      {/* IMAGE CONTAINER */}
      <div className='relative col-span-2 col-start-2 mb-8 tablet:col-start-4 tablet:col-span-5 tablet:row-start-1 tablet:row-span-2 tablet:mb-0 laptop:col-start-5 laptop:col-span-5'>
        <div className='relative max-w-[273px] ml-auto laptop:max-w-[420px] desktop:max-w-[445px]'>

          {/* TEXTURE */}
          <div className='absolute top-[-171px] left-[-210px] w-[500px] z-1 rotate-[-108deg] tablet:top-[-75px] laptop:left-[-400px] laptop:top-[0px] laptop:w-[600px] desktop:w-[700px]'>
            <LazyImgix
              id={'redTexture'}
              image={redTexture.image}
            />
          </div>

          {/* 2nd IMAGE */}
          <div className='absolute z-3 top-[-90px] left-[-82px] w-[183px] h-[183px] tablet:w-[213px] tablet:h-[213px] tablet:left-[-184px] tablet:top-[-40px] laptop:w-[282px] laptop:h-[282px] laptop:top-1/2 laptop:-translate-y-1/2 laptop:left-[-250px] desktop:w-[318px] desktop:h-[318px] desktop:left-[-285px] shadow-et_4'>
            <LazyImgix
              id={'ipadTeela'}
              image={ipadImg.image}
            // sizes={imgOptions ? imgOptions.sizes : ''}
            // srcSet={imgOptions ? imgOptions.srcSet : ''}
            />
            <div className='hidden absolute bottom-[-175px] font-bonVivant text-5xl desktop:block -rotate-12 left-[-75px] max-w-[200px]'>
              Tuesdays just got a little better
            </div>
          </div>


          <div className='relative z-2'>
            <LazyImgix
              id={'authorImg'}
              image={authorImg.image}
            // sizes={imgOptions ? imgOptions.sizes : ''}
            // srcSet={imgOptions ? imgOptions.srcSet : ''}
            />
          </div>
        </div>
      </div>

      {/* HEADLINE */}
      <h2 className='relative col-span-2 col-start-2 mt-16 mb-4 text-3xl transition-all duration-300 z-2 font-sentinel__SemiBoldItal tablet:text-4xl tablet:col-start-8 tablet:col-span-6 tablet:row-start-1 laptop:text-6xl laptop:mt-[173px] laptop:col-start-9 laptop:col-span-5 desktop:text-6xl desktop:col-start-9 desktop:ml-8 desktopXl:col-start-9 desktopXl:col-span-4'>
        <AccentHeaderText text='Hello!' cssOverride={'!top-[-50px] left-[-15px] tablet:!top-[-63px] text-grey-800 text-4xl'} />
        The Every Tuesday Story
      </h2>

      {/* PARAGRAPH */}
      <div className='col-span-2 col-start-2 tablet:col-start-9 tablet:col-span-5 tablet:flex tablet:flex-col tablet:items-start laptop:col-start-10 laptop:col-span-4 desktop:pl-8 desktopXl:pr-12'>
        <p className='mb-8 desktop:text-lg'>
          Life gets crazy. But, at the very least, we should be dedicating one day a week to pursue our side hustles.
        </p>
        <Link
          className='btn btn-primary btn-xl'
          to={`/our-story`}
          prefetch={`intent`}>
          Learn About Us
        </Link>
      </div>

    </section>
  )
}

export default AboutMeFeature
