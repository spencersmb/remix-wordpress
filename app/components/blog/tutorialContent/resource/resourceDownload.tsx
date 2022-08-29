import React from 'react'

interface Props {
  index: number
  imgix: CreateImgixReturn
  title: string
  description: string
  url: string
}

function ResourceDownload(props: Props) {
  const { imgix, title, description, index } = props

  return (

    <div className='hover:bg-grey-100 hover:cursor-pointer group tr-wrapper'>
      <a
        className='link-wrapper'
        href={props.url}>
        <div className='tr-index font-bonVivant'>
          0{index + 1}
        </div>

        {/* CONTENT */}
        <div className='flex-[2] tablet:flex-row flex flex-row items-center tablet:max-w-[400px] laptop:max-w-[450px]'>

          {/* IMAGE */}
          <div className='tr-imageWrapper'>
            <div className='tr-imageWrapper--inner'>
              {/* <LazyImgix
        image={imgix.image}
        id={`resource-${props.index}`}
      /> */}
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

          <button
            className='btn btn-xs btn-outlineFill tablet:btn-sm group-hover:border-gray-600'>
            Download
          </button>

        </div>
      </a>

    </div>

  )
}

export default ResourceDownload
