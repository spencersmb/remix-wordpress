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
  const longShadowSrc = staticImages.assets.ipad.longShadow.src
  return (
    <div className='relative ' data-testid="ipadImage">

      {/* DEVICE ART */}
      <div className='overflow-hidden absolute top-[-4.5%] left-[-5.65%] scale-[.82] z-3 w-full rounded-lg tablet:rounded-xl laptop:rounded-2xl desktop:rounded-3xl'>
        <LazyImgix
          visibleByDefault={visibleByDefault}
          sizes="(max-width: 666px) 100w, (max-width: 1024px) 70vw,(max-width: 1399px) 50vw, 887px"
          id={"iPadArt"}
          srcSet={
            `
              ${image.src}?auto=format&w=800&fit=clip 800w,
              ${image.src}?auto=format&w=1000&fit=clip 1000w,
              ${image.src}?auto=format&w=1200&fit=clip 1200w,
              ${image.src}?auto=format&w=1400&fit=clip 1400w,
              ${image.src}?auto=format&w=1600&fit=clip 1600w,
              `}
          image={image} />
      </div>

      <LazyImgix
        id={"iPadBlank"}
        visibleByDefault={visibleByDefault}
        sizes="(max-width: 666px) 100w, (max-width: 1024px) 70vw,(max-width: 1399px) 50vw, (max-width: 1800px) 75vw, 1180px"
        image={{
          width: 1400,
          height: 1049,
          alt: `Every Tuesday IPad Render`,
          src: staticImages.assets.ipad.longShadow.src,
          placeholder: staticImages.assets.ipad.longShadow.placeholder
        }}
        srcSet={
          `
              ${longShadowSrc}&w=800&fit=clip 800w,
              ${longShadowSrc}&w=1000&fit=clip 1000w,
              ${longShadowSrc}&w=1200&fit=clip 1200w,
              ${longShadowSrc}&w=1400&fit=clip 1400w,
              ${longShadowSrc}&w=1600&fit=clip 1600w,
              ${longShadowSrc}&w=1800&fit=clip 1800w,
              ${longShadowSrc}&w=2200&fit=clip 2000w,
              `}
      />

    </div>
  )
}

export default IpadLongShadow
