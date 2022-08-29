import LazyImgix from '@App/components/images/lazyImgix'
import React from 'react'

interface Props {
  index: number
  imgix: CreateImgixReturn
  title: string
  description: string
  url?: string
  product?: IProduct
  type: 'colorSwatch' | 'course' | 'product' | 'download'
}

function ResourceTemplate(props: Props) {
  const { imgix, title, description, index } = props

  return (

    <div className='flex flex-row flex-wrap items-start mb-8 tablet:items-center'>

      <div className='hidden self-start text-6xl font-bonVivant leading-[30px] tablet:flex tablet:flex-[.5] laptop:leading-[40px] laptop:text-7xl laptop:flex-1'>
        0{index + 1}
      </div>

      {/* CONTENT */}
      <div className='flex-[2] tablet:flex-row flex flex-row items-center tablet:max-w-[400px] laptop:max-w-[450px]'>

        {/* IMAGE */}
        <div className='flex-none'>
          <div className='overflow-hidden rounded-full w-[60px] h-[60px] border bg-slate-400 mr-3'>
            {/* <LazyImgix
        image={imgix.image}
        id={`resource-${props.index}`}
      /> */}
          </div>
        </div>

        {/* TITLE */}
        <div className='flex flex-col tablet:flex-[1.5]'>
          <div className='text-xl font-sentinel__SemiBoldItal laptop:text-2xl'>
            {title}
          </div>
          <p className='text-sm laptop:text-base'>
            {description}
          </p>
        </div>

      </div>

      {/* BUTTON */}
      <div className='flex mt-4 ml-[72px] tablet:flex-[1] tablet:justify-end tablet:items-center tablet:mt-0 tablet:ml-0 '>
        <a
          href={props.url}
          className='btn btn-xs btn-outline tablet:btn-sm'>
          Download
        </a>
      </div>

    </div>

  )
}

export default ResourceTemplate
