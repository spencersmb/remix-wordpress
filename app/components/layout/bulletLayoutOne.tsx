import React from 'react'
import LazyImageBase from '../images/lazyImage-base'

interface Props {
  image: ImageLookupReturn
  title: string
  type: string
  category: string
}

function getCatColorClass(cat: string) {
  switch (cat) {
    case 'Fonts':
      return '#699797'
    default:
      return '#F3CB48'
  }
}

/**
 * 
 * Old design for the Tuesday Makers Page
 * 
 */
function BulletLayoutOne(props: Props) {
  const { title, image, type, category } = props

  return (
    <div className='flex flex-row items-center mb-7 tablet:flex-col tablet:px-4 laptop:px-10 desktop:px-0 desktop:flex-row'>
      <div className='overflow-hidden rounded-full w-[75px] h-[75px] tablet:mb-4 desktop:mb-0'>
        <LazyImageBase id={title.replace(' ', '-')} image={image} />
      </div>
      <div className='flex flex-col ml-4 tablet:ml-0 tablet:items-center tablet:text-center desktop:ml-6 desktop:items-start'>
        <div className='text-xl font-semibold text-slate-700 tablet:leading-7 tablet:mb-2 desktop:mb-0 desktop:leading-normal'>
          {title}
        </div>
        <div className='mb-2 text-xs tablet:mb-3 desktop:mb-2'>
          {type}
        </div>
        <div className='flex flex-row'>
          <div style={{ background: getCatColorClass(category) }} className={`rounded-[3px] w-[15px] h-[15px]`} />
          <div className='ml-2 text-xs font-semibold text-primary-700'>
            {category}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BulletLayoutOne
