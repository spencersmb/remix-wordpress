import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { staticImages } from '~/lib/imgix/data'
import LazyImageBase from '../images/lazyImage-base'

interface Props {

}

// rcfc

function CourseHeader(props: Props) {

  return (
    <div className='grid grid-flow-row grid-rows-[auto_auto_1fr_1fr_1fr] bg-neutral-50 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>

      {/* INTRO TEXT */}
      <div className='flex flex-col col-span-2 col-start-2 pb-8'>
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
      <div className='col-end-[-1] col-start-3 row-span-3 row-start-2 bg-sage-200'>

      </div>

      <div className='h-[350px] col-span-full border-4 border-red-500 row-start-2 row-span-4 flex justify-center'>
        <div className='h-[500px] bg-blue-500 w-[125px]'></div>
      </div>
    </div>
  )
}

export default CourseHeader

const headerData = {
  title: 'Online Courses',
  content: 'I’ve taught over 200,000 students and my design + lettering videos on YouTube have accumulated over 19 million views. I love sharing what I’ve learned over my career and motivating others to create something new every week.',
  image: {
    src: '/images/courses/author-image.jpg',
    placeholder: '/images/courses/author-image.jpg',
  },
  scribble: {
    src: '/images/scribble-4.png',
    placeholder: '/images/scribble-4.png',
  },
  textureImage: {
    ...staticImages.textures.greenLarge,
  }
}