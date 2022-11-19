import { staticImages } from '@App/lib/imgix/data'
import { createImgixSizes, imgixDir } from '@App/utils/imageHelpers'
import { Link } from '@remix-run/react'
import React from 'react'
import LazyImgix from '../images/lazyImgix'

interface Props { }

/**
 * @function TuesdayMakersNavAd
 * @tested - 11/19/2022
 */
function TuesdayMakersNavAd(props: Props) {
  const { } = props
  const flowers = createImgixSizes({
    src: `${imgixDir.images}/tuesday-makers/ff-project-5.jpg`,
    alt: 'Flat Florlas Project 5',
    mobileSize: 500,
    width: 2000,
    height: 2422,
  })

  return (
    <div className='bg-[#182000] text-white p-4 py-6 overflow-hidden rounded-lg flex flex-col items-start gap-y-4 relative'>
      <div className='relative mt-16 text-3xl font-sentinel__SemiBoldItal z-2'>
        Tuesday Makers
      </div>
      <p className='relative mb-4 text-sm z-2 tablet:max-w-[400px]' >
        Receive special offers on courses + products and gain access to the Resource Library
      </p>

      <Link to={'/tuesday-makers'} className={'btn btn-outline-reverse px-12 border-2 relative z-2'}>
        Sign Up
      </Link>

      <div className='absolute top-[-380px] left-[30px] z-1 w-[500px] tablet:left-[250px] tablet:top-[-330px]'>
        <LazyImgix
          id={'ff-project-5'}
          key={'ff-project-5'}
          image={flowers.image}
          visibleByDefault={true}
          sizes="(max-width: 768px) 5vw, (max-width: 1024px) 50vw, 500px"
          srcSet={
            `
            ${flowers.defaultSrc}&w=500&fit=clip 500w,
            ${flowers.defaultSrc}&w=1000&fit=clip 1000w,
            `}
        />
      </div>
    </div>
  )
}

export default TuesdayMakersNavAd
