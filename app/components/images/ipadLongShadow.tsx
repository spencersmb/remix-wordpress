import { staticImages } from '@App/lib/imgix/data'
import React from 'react'
import LazyImgix from './lazyImgix'

interface Props {
  visibleByDefault?: boolean
  image: ImgixImageType
}

/**
 * 
 * @function IpadLongShadow 
 * @tested 08/04/2022 
 */
function IpadLongShadow({ image, visibleByDefault = false }: Props) {

  return (
    <div className='relative ' data-testid="ipadImage">

      {/* DEVICE ART */}
      <div className='overflow-hidden absolute top-[-4.5%] left-[-5.65%] scale-[.82] z-3 w-full rounded-lg tablet:rounded-xl laptop:rounded-2xl desktop:rounded-3xl'>
        <LazyImgix
          visibleByDefault={visibleByDefault}
          id={"iPadArt"}
          image={image} />
      </div>

      <LazyImgix
        id={"iPadBlank"}
        visibleByDefault={visibleByDefault}
        image={{
          width: staticImages.assets.ipad.longShadow.width,
          height: staticImages.assets.ipad.longShadow.height,
          alt: `Every Tuesday IPad Render`,
          src: staticImages.assets.ipad.longShadow.src,
          placeholder: staticImages.assets.ipad.longShadow.placeholder
        }} />

    </div>
  )
}

export default IpadLongShadow
