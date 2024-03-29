import { staticImages } from '@App/lib/imgix/data'
import { createImgixSizes } from '@App/utils/imageHelpers'
import { Link } from '@remix-run/react'
import React from 'react'
import LazyImgix from '../images/lazyImgix'
import PolaroidImg from '../images/polaroidImg'
import AccentHeaderText from '../layout/accentHeaderText'
import Arrow02 from '../svgs/arrow-02'

interface Props { }

function AboutMeFeature(props: Props) {

  const authorImg = createImgixSizes({
    width: 438,
    height: 540,
    alt: `Every Tuesday: Teelas profile picture`,
    src: staticImages.profiles.teela.vertical.src,
    mobileSize: 438,
    params: `&fit=crop&crop=faces&h=540`
  })
  const ipadImg = createImgixSizes({
    width: 900,
    height: 900,
    alt: `Every Tuesday: Teelas profile picture`,
    src: 'https://et-teachable.imgix.net/procreate201/env-2.jpg',
    mobileSize: 450,
    params: `&fit=crop&w=900&h=900`
  })
  // const redTexture = createImgixSizes({
  //   staticImage: staticImages.textures.red.A,
  //   alt: `Every Tuesday: Teela's Paint Brushes`,
  //   mobileSize: 500,
  // })
  const flowers = createImgixSizes({
    width: 1389,
    height: 1205,
    alt: `Every Tuesday: Teelas profile picture`,
    src: 'https://et-website.imgix.net/et-website/images/flowers-1-v1-min.png',
    mobileSize: 800,
    params: `&fit=crop`
  })
  // imgOptions: {
  //   srcSet: `${collage2.src} 400w, ${collage2Url}?auto=format&w=1400&fit=clip 900w`
  // }
  return (
    <section className='bg-sage-50 py-32 pb-16 et-grid-basic tablet:grid-rows-[auto_1fr] tablet:pt-16 desktop:py-32 overflow-hidden'>

      {/* IMAGE CONTAINER */}
      <div className='relative col-span-2 col-start-2 mb-8 tablet:col-start-4 tablet:col-span-5 tablet:row-start-1 tablet:row-span-2 tablet:mb-0 laptop:col-start-3 laptop:col-span-5 desktop:col-start-4 desktop:col-span-5'>
        <div className='relative max-w-[273px] mx-auto laptop:max-w-[420px] desktop:max-w-[445px]'>

          {/* TEXTURE */}
          <div className='absolute top-[-121px] left-[-210px] w-[500px] z-1 tablet:top-[-89px] laptop:left-[-230px] laptop:w-[600px] desktop:w-[700px]'>
            <LazyImgix
              id={'redTexture'}
              image={flowers.image}
              srcSet={
                `
                ${flowers.defaultSrc}&w=800&fit=clip 800w,
                ${flowers.defaultSrc}&w=1400&fit=clip 1400w,
                `}
            />
          </div>

          {/* 2nd IMAGE */}
          {/* <div className='absolute rotate-3 z-3 top-[270px] left-[-40px] w-[145px] h-[145px] tablet:w-[140px] tablet:h-[140px] tablet:left-[-84px] tablet:top-[270px] laptop:w-[240px] laptop:h-[240px] laptop:top-[450px] laptop:-translate-y-1/2 laptop:left-[-160px] desktop:w-[318px] desktop:top-1/2 desktop:h-[318px] desktop:left-[-255px] shadow-et_4'>
            <LazyImgix
              id={'ipadTeela'}
              image={ipadImg.image}
            // sizes={imgOptions ? imgOptions.sizes : ''}
            // srcSet={imgOptions ? imgOptions.srcSet : ''}
            />
          </div> */}

          {/* Profile IMAGE */}
          <div className='relative z-2'>
            <div className='absolute left-[45%] -translate-x-1/2 top-[-40px] z-2 w-full max-w-[80px] desktop:max-w-[100px]'>
              <LazyImgix
                id={'black-pin'}
                image={{
                  ...staticImages.assets.pins.black_1,
                  alt: 'Black Pin'
                }}
              />
            </div>
            <PolaroidImg imgixImage={authorImg.image} rotate='left' />
            <div className='hidden absolute bottom-[25px] font-bonVivant text-5xl desktop:block -rotate-12 left-[-275px] max-w-[260px] leading-[4rem]'>
              Tuesdays just got a little better
              <div className='w-[100px] bottom-0 left-[235px] absolute scale-x-[-1] rotate-[-215deg]'>
                <Arrow02 fill={'currentColor'} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HEADLINE */}
      <h2 className='relative col-span-2 col-start-2 mt-4 mb-4 text-3xl transition-all duration-300 z-2 font-sentinel__SemiBoldItal tablet:max-w-[397px] tablet:text-5xl tablet:col-start-8 tablet:col-span-6 tablet:row-start-1 laptop:text-6xl laptop:mt-[110px] laptop:max-w-[406px] laptop:col-start-8 laptop:col-span-5 desktop:text-6xl desktop:col-start-8 desktop:ml-16 desktopXl:col-start-8 desktopXl:col-span-4'>
        {/* <AccentHeaderText text='Hello!' cssOverride={'!top-[-50px] left-[-15px] tablet:!top-[-63px] text-grey-800 text-4xl'} /> */}
        The Every Tuesday Story
      </h2>

      {/* PARAGRAPH */}
      <div className='col-span-2 col-start-2 tablet:col-start-9 tablet:col-span-5 tablet:flex tablet:flex-col tablet:items-start laptop:col-start-9 laptop:col-span-4 desktop:pr-6 laptop:ml-0 desktopXl:pr-12'>
        <p className='mb-8 desktop:text-lg'>
          Life gets crazy. But, at the very least, we should be dedicating one day a week to pursue our side hustles.
        </p>
        <Link
          className='btn btn-primary btn-xl btn-primary-ring'
          to={`/our-story`}
          prefetch={`intent`}>
          Learn About Us
        </Link>
      </div>

    </section>
  )
}

export default AboutMeFeature
