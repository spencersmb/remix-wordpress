import { BPPX } from "@App/enums/breakpointEnums"
import useSite from "@App/hooks/useSite"
import { staticImages } from "@App/lib/imgix/data"
import { breakpointConvertPX } from "@App/utils/appUtils"
import { createImgixSizes } from "@App/utils/imageHelpers"
import Imgix, { Picture, Source } from "react-imgix"
import { LazyLoadImage } from "react-lazy-load-image-component"

import LazyImageBase from "./lazyImage-base"
import LazyImgix from "./lazyImgix"

interface IFeatureProps {
  featuredImage: ImageLookupReturn
  product: IProduct
}
const IpadFeatureImage = ({ featuredImage, product }: IFeatureProps) => {
  const { state: { breakpoint } } = useSite()
  const greenTexture = createImgixSizes({
    width: 895,
    height: 893,
    alt: 'Large green watercolor texture by Teela',
    src: `${staticImages.textures.greenLarge.src}?w=895&fit=clip`,
    mobileSize: 400,
  })
  const applePencil = createImgixSizes({
    width: 86,
    height: 1023,
    src: staticImages.assets.applePencil.flat.src,
    alt: 'Apple Pencil',
    mobileSize: 28
  })
  const iPadDevice = createImgixSizes({
    width: 1000,
    height: 733,
    src: staticImages.assets.ipad.flat.src,
    alt: 'Every Tuesday iPad Pro',
    mobileSize: 400
  })
  return (
    <div className="relative max-w-[1000px] z-20">

      {/* APPLE PENCIL */}
      <div className="absolute top-[30%] left-[70%] z-30 w-[16px] rotate-[52deg] origin-center tablet:w-[23px] laptop:w-[33px] laptop:translate-y-[35%] desktop:w-[43px]">
        <LazyImgix
          id={'applePencil'}
          image={applePencil.image}
          visibleByDefault={true}
          sizes="(max-width: 666px) 2vw, (max-width: 1279px) 3vw, (min-width: 1280px) 3vw, 30px"
          srcSet={
            `
              ${applePencil.defaultSrc}&w=28&fit=clip 28w,
              ${applePencil.defaultSrc}&w=48&fit=clip 48w,
              ${applePencil.defaultSrc}&w=86&fit=clip 60w,
            `
          }
        />
      </div>

      {/* IPAD ART */}
      <div className="absolute top-[-2.8%] left-[-2.7%] scale-[.81] w-full overflow-hidden rounded-md tablet:rounded-xl art z-20 laptop:top-[-2.5%] laptop:left-[-2.65%] laptop:translate-y-[-2.6%]">
        <LazyImageBase image={featuredImage} id={product.slug} />
      </div>

      {/* IPAD DEVICE */}
      <div className="relative z-10 flex-1 w-full laptop:absolute lazy-load-wrapper lazy-load-wrapper-block lazy-load-image-full ipad">

        <LazyImgix
          id={'iPadFeature'}
          image={iPadDevice.image}
          visibleByDefault={true}
          sizes="(max-width: 666px) 40vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
          srcSet={
            `
            ${iPadDevice.defaultSrc}&w=500&fit=clip 500w,
            ${iPadDevice.defaultSrc}&w=900&fit=clip 900w,
            ${iPadDevice.defaultSrc}&w=1200&fit=clip 1200w,
            `}
        />
      </div>

      {/* GREEN TEXTURE  */}
      <div className="absolute top-[-110px] left-[40px] z-0 w-[390px] tablet:w-[500px] laptop:rotate-[85deg] laptop:w-[740px] laptop:left-[-130px] laptop:top-[-160px] desktop:w-[950px] desktop:left-[-320px] desktop:top-[-250px]">

        <LazyImgix
          id={'green-desktop'}
          image={greenTexture.image}
          visibleByDefault={true}
          sizes="(max-width: 666px) 40vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
          srcSet={
            `
            ${greenTexture.defaultSrc}&w=400&fit=clip 400w,
            ${greenTexture.defaultSrc}&w=900&fit=clip 900w,
            `}
        />

      </div>
    </div>
  )
}

export default IpadFeatureImage