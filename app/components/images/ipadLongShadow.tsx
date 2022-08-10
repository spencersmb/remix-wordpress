import { staticImages } from '@App/lib/imgix/data'
import { createImgixSizes } from '@App/utils/imageHelpers'
import React from 'react'
import LazyImgix from './lazyImgix'

interface Props {
  visibleByDefault?: boolean
  imigixArt: {
    image: ImgixImageType, defaultSrc: string
  }
}

/**
 * 
 * @function IpadLongShadow 
 * @tested 08/04/2022 
 */
function IpadLongShadow({ imigixArt, visibleByDefault = false }: Props) {
  const longShadowSrc = createImgixSizes({
    width: 1400,
    height: 1049,
    alt: `Every Tuesday IPad Render`,
    src: staticImages.assets.ipad.longShadow.src,
    mobileSize: 800,
  })
  return (
    <div className='relative ' data-testid="ipadImage">

      {/* DEVICE ART */}
      <div className='overflow-hidden absolute top-[-4.5%] left-[-5.65%] scale-[.82] z-3 w-full rounded-lg tablet:rounded-xl laptop:rounded-2xl desktop:rounded-3xl'>
        <LazyImgix
          visibleByDefault={visibleByDefault}
          sizes="(max-width: 666px) 70vw, (max-width: 1023px) 75vw, (max-width: 1399px) 70vw, 1180px"
          id={"iPadArt"}
          srcSet={
            `
              ${imigixArt.defaultSrc}&w=800&fit=clip 800w,
              ${imigixArt.defaultSrc}&w=1000&fit=clip 1000w,
              ${imigixArt.defaultSrc}&w=1200&fit=clip 1200w,
              ${imigixArt.defaultSrc}&w=1400&fit=clip 1400w,
              ${imigixArt.defaultSrc}&w=1600&fit=clip 1600w,
              ${imigixArt.defaultSrc}&w=2100&fit=clip 2100w,
              `}
          image={imigixArt.image} />
      </div>

      <LazyImgix
        id={"iPadBlank"}
        visibleByDefault={visibleByDefault}
        sizes="(max-width: 666px) 60vw, (max-width: 1023px) 90vw, (max-width: 1279px) 70vw, (max-width: 1800px) 75vw, 1180px"
        image={longShadowSrc.image}
        srcSet={
          `
              ${longShadowSrc.defaultSrc}&w=600&fit=clip 600w,
              ${longShadowSrc.defaultSrc}&w=1000&fit=clip 1000w,
              ${longShadowSrc.defaultSrc}&w=1200&fit=clip 1200w,
              ${longShadowSrc.defaultSrc}&w=1400&fit=clip 1400w,
              ${longShadowSrc.defaultSrc}&w=1600&fit=clip 1600w,
              ${longShadowSrc.defaultSrc}&w=1800&fit=clip 1800w,
              ${longShadowSrc.defaultSrc}&w=2200&fit=clip 2000w,
              `}
      />

    </div>
  )
}

export default IpadLongShadow
