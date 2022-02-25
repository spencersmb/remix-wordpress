import { PlusIcon } from '@heroicons/react/solid'
import React from 'react'
import LazyImageBase from '~/components/images/lazyImage-base'
import UploadSvg from '~/components/svgs/uploadSvg'

interface Props { }

function ProcreateTitleCard(props: Props) {
  const { } = props
  const image: IMediaDetailSize = {
    width: '618',
    height: '945',
    altTitle: '',
    placeholder: '/images/tm-stroke.jpg',
    sizes: '',
    sourceUrl: '/images/tm-stroke.jpg',
    srcSet: '',
  }
  return (
    <div className='relative bg-white shadow-xxl-red w-full h-full rounded-xl p-4 grid grid-cols-1 grid-flow-col max-w-[347px] mx-auto'>
      {/* TOP ICONS */}
      <div className='relative z-10 flex justify-between col-span-1 col-start-1 row-start-1 flew-row'>
        <div className='w-[32px]'><UploadSvg stroke={'#DED9DC'} /></div>
        <div className='w-[32px]'><PlusIcon fill={'#DED9DC'} /></div>
      </div>
      <div className='col-span-1 col-start-1 row-span-3 row-start-1 stroke_image'>
        <LazyImageBase
          id={'TuesdayMakersStroke'}
          alt={'Every Tuesday Free Brushes'}
          image={image}
        />
      </div>
      <div className="relative z-10 col-span-1 col-start-1 row-start-3 mb-4 text-center">
        <h2 className='mb-6 font-sentinel__SemiBoldItal text-primary-600 text-heading-3'>Free Procreate Brushes</h2>
        <p>Lettering, Pattern, Stamp, Scatter + Texutre Brushes</p>
      </div>
    </div>
  )
}

export default ProcreateTitleCard
