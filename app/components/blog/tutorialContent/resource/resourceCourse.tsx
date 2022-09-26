import LazyImageBase from '@App/components/images/lazyImage-base'
import React from 'react'

interface Props {
  index: number
  image: ImageLookupReturn
  title: string
  description?: string
  url: string
}

function ResourceCourse(props: Props) {
  const { image, title, description, index } = props

  return (

    <div className='hover:bg-grey-100 hover:cursor-pointer group tr-wrapper'>
      <a
        href={props.url}
        target='_blank'
        rel='noopener noreferrer'
        className='link-wrapper'>

        <div className='tr-index font-bonVivant font-swap'>
          0{index + 1}
        </div>

        {/* CONTENT */}
        <div className='flex-[2] items-start tablet:flex-row flex flex-row tablet:items-center tablet:max-w-[400px] laptop:max-w-[450px]'>

          {/* IMAGE */}
          <div className='tr-imageWrapper'>
            <div className='transition-all duration-300 tr-imageWrapper--inner group-hover:border-gray-600'>
              <LazyImageBase
                testId='feature-image'
                id={`resource-course-${props.index}`}
                image={image} />
            </div>
          </div>

          {/* TITLE */}
          <div className='flex flex-col tablet:flex-[1.5]'>
            <div className='tr-title font-sentinel__SemiBoldItal'>
              {title}
            </div>
            <p className='text-sm laptop:text-base'>
              {description}
            </p>
          </div>

        </div>

        {/* BUTTON */}
        <div className='tr-button--wrapper'>

          <button className='btn btn-xs btn-outlineFill tablet:btn-sm group-hover:border-gray-600'>
            View Course
          </button>

        </div>
      </a>
    </div>

  )
}

export default ResourceCourse
