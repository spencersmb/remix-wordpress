import React from 'react'
import Imgix, { Picture, Source } from 'react-imgix'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { staticImages } from '~/lib/imgix/data'
import LazyImageBase from '../images/lazyImage-base'
import HeyTeela from '../svgs/heyTeela'

interface Props {

}

// rcfc

function CourseHeader(props: Props) {

  return (
    <div className='grid grid-flow-row grid-rows-[auto_auto_1fr_1fr_1fr] bg-neutral-50 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 laptop:grid-rows-[minmax(0,1fr)_minmax(0, 70px)_minmax(0, 70px)_minmax(0, 70px)] desktop:grid-cols-desktop'>

      {/* INTRO TEXT */}
      <div className='relative z-30 flex flex-col col-span-2 col-start-2 pb-8 tablet:col-start-2 tablet:row-start-1 tablet:col-span-7 tablet:pr-8 laptop:col-start-3 laptop:col-span-6 laptop:row-start-1 laptop:row-end-2'>
        <div className='flex-1 max-w-[60%] pt-8'>
          <LazyLoadImage
            className='w-full'
            key={'Online Course Scribbles'}
            alt={'Every Tuesday Online Courses'}
            effect="blur"
            placeholderSrc={headerData.scribble.placeholder}
            src={headerData.scribble.src}
          />
        </div>
        <h1 className='text-7xl font-sentinel__SemiBoldItal text-sage-700'>
          Online Courses
        </h1>
        <p className='pt-4 text-lg text-sage-600'>
          {headerData.content}
        </p>
      </div>

      {/* BACKGROUND */}
      <div className='col-end-[-1] col-start-3 row-span-3 row-start-2 bg-sage-200 tablet:row-start-1 tablet:col-start-10 laptop:row-start-1 laptop:row-end-2' />

      {/* PROFILE IMAGE */}
      <div className='relative flex justify-center row-span-4 row-start-2 my-10 border-4 border-red-500 col-span-full tablet:row-start-1 tablet:col-start-8 tablet:col-span-6 laptop:row-start-1 laptop:row-end-3'>
        {/* TEELA NAME + ARROW */}
        <div className='absolute top-[13%] left-[10px] w-[175px] z-20 tablet:left-[-20px]'>
          <HeyTeela />
        </div>

        <div className='relative rotate-[8deg] max-w-[202px] m-auto border-[10px] border-sage-50 z-10'>

          {/* BLACK PIN */}
          <div className='absolute max-w-[76px] z-20 top-[-18px] left-[45%] translate-x-[-50%]'>
            <LazyLoadImage
              key={'blackPin'}
              alt={'Every Tuesday Hand Made Black Pin'}
              effect="blur"
              placeholderSrc={staticImages.assets.pins.black_1.placeholder}
              src={staticImages.assets.pins.black_1.src}

            />
          </div>

          <div className='relative z-10 '>
            <LazyLoadImage
              className='w-full'
              key={'Online Course Scribbles'}
              alt={'Every Tuesday: Hey I\'m Teela, your course instructor.'}
              effect="blur"
              placeholderSrc={headerData.profileImage.placeholder}
              src={headerData.profileImage.src}
            />
          </div>
        </div>

        {/* GREEN TEXTURE */}
        <div className='absolute top-[-30px] left-auto right-[-30px] w-[300px] z-0 rotate-[-175deg] tablet:w-[500px] tablet:right-[-220px] tablet:rotate-[45deg]'>
          <Picture >
            <Source
              attributeConfig={{
                src: 'data-src',
                srcSet: 'data-srcset',
                sizes: 'data-sizes'
              }}
              src={staticImages.textures.greenLarge.src}
              width={1200}
              htmlAttributes={{ media: "(min-width: 1200px)" }}
            />
            <Source
              attributeConfig={{
                src: 'data-src',
                srcSet: 'data-srcset',
                sizes: 'data-sizes'
              }}
              src={staticImages.textures.greenLarge.src}
              width={740}
              htmlAttributes={{ media: "(min-width: 1024px)" }}
            />
            <Source
              attributeConfig={{
                src: 'data-src',
                srcSet: 'data-srcset',
                sizes: 'data-sizes'
              }}
              src={staticImages.textures.greenLarge.src}
              width={600}
              htmlAttributes={{ media: "(min-width: 320px)" }}
            />
            <Imgix
              className="lazyload"
              src={staticImages.textures.greenLarge.src}
              attributeConfig={{
                src: 'data-src',
                srcSet: 'data-srcset',
                sizes: 'data-sizes'
              }}
              imgixParams={{ w: 100 }}
              htmlAttributes={{
                src: staticImages.textures.greenLarge.placeholder, // low quality image here
              }} />
          </Picture>
        </div>
      </div>
    </div>
  )
}

export default CourseHeader

const headerData = {
  title: 'Online Courses',
  content: 'I’ve taught over 200,000 students and my design + lettering videos on YouTube have accumulated over 19 million views. I love sharing what I’ve learned over my career and motivating others to create something new every week.',
  profileImage: {
    src: '/images/teela-profile-vertical.jpg',
    placeholder: '/images/teela-profile-vertical.jpg',
  },
  scribble: {
    src: '/images/scribble-4.png',
    placeholder: '/images/scribble-4.png',
  },
  textureImage: {
    ...staticImages.textures.greenLarge,
  }
}