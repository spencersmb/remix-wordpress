import { staticImages } from '@App/lib/imgix/data'
import { createImgixSizes } from '@App/utils/imageHelpers'
import React from 'react'
import LazyImgix from './lazyImgix'

interface Props {
  ipadArt: CreateImgixReturn
  id: string
}

function IpadDevice(props: Props) {
  const { ipadArt, id } = props
  const iPadDevice = createImgixSizes({
    width: 1000,
    height: 733,
    src: staticImages.assets.ipad.longShadow.src,
    alt: 'Every Tuesday iPad Pro',
    mobileSize: 400
  })

  return (
    <div className="relative max-w-[1000px] z-20">

      {/* IPAD ART */}
      <div className="absolute top-[-4.5%] left-[-5.6%] scale-[.82] w-full overflow-hidden rounded-md tablet:rounded-xl art z-20">
        <LazyImgix
          id={id}
          image={ipadArt.image}
          sizes="(max-width: 666px) 40vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
          srcSet={
            `
              ${ipadArt.defaultSrc}&w=500&fit=clip 500w,
              ${ipadArt.defaultSrc}&w=900&fit=clip 900w,
              ${ipadArt.defaultSrc}&w=1200&fit=clip 1200w,
              `}
        />
      </div>

      {/* IPAD DEVICE */}
      <div className="relative z-10 ipad">
        <LazyImgix
          id={'iPadFeature'}
          image={iPadDevice.image}
          sizes="(max-width: 666px) 40vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
          srcSet={
            `
            ${iPadDevice.defaultSrc}&w=500&fit=clip 500w,
            ${iPadDevice.defaultSrc}&w=900&fit=clip 900w,
            ${iPadDevice.defaultSrc}&w=1200&fit=clip 1200w,
            `}
        />
      </div>

    </div>
  )
}

export default IpadDevice
