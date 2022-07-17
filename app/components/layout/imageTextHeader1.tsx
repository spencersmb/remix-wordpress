import { staticImages } from '@App/lib/imgix/data'
import React from 'react'
import LazyImgix from '../images/lazyImgix'
import PolaroidImg from '../images/polaroidImg'

interface Props {
  imgixImage?: ImgixImageType
  wpImage?: ImageLookupReturn
}
/**
 * 
 * @component ImageTextHeader1
 * @tested - 07/17/2022 
 */
function ImageTextHeader1(props: Props) {
  const { imgixImage } = props
  return (
    <div className='my-12 et-grid-basic tablet:my-16 laptop:mb-0'>

      {/* IMAGES */}
      {imgixImage &&
        <div className='col-span-2 col-start-2 mx-10 mb-8 tablet:mb-0 tablet:col-start-2 tablet:col-span-5 tablet:mx-5 laptop:col-start-2 laptop:col-span-4 desktop:col-span-5 desktop:col-start-2 desktop:ml-28 desktop:mr-12'>
          <PolaroidImg
            rotate='right'
            imgixImage={imgixImage} />
        </div>}

      {/* TEXT */}
      <div className='col-span-2 col-start-2 tablet:col-start-7 tablet:col-span-7 tablet:self-center tablet:mr-4 laptop:col-start-6 laptop:col-span-8 laptop:flex-row desktop:mx-8 desktop:col-start-7 desktop:col-span-7 desktop:ml-0 desktop:mr-16'>
        <h1 className='mb-4 text-5xl text-gray-700 font-sentinel__SemiBoldItal laptop:text-7xl desktopXl:text-8xl'>
          Tuesdays just got a little bit better
        </h1>
        <p className='text-lg desktop:text-xl'>
          Every-Tuesday is an education resource for ambitious graphic designers and hand letterers. Why ambitious? Because if you’re someone who’s ready to take action and are willing to put in the work to get there, *you* are my kind of person.
        </p>
      </div>

    </div>
  )
}

export default ImageTextHeader1
