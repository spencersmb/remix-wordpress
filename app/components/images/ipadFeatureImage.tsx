import { BPPX } from "@App/enums/breakpointEnums"
import useSite from "@App/hooks/useSite"
import { staticImages } from "@App/lib/imgix/data"
import { breakpointConvertPX } from "@App/utils/appUtils"
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

  return (
    <div className="relative max-w-[1000px] z-20">

      {/* APPLE PENCIL */}
      <div className="absolute top-[30%] left-[70%] z-30 w-[16px] rotate-[52deg] origin-center tablet:w-[23px] laptop:w-[33px] laptop:translate-y-[35%] desktop:w-[43px]">
        <LazyImgix
          id={"applePencil"}
          visibleByDefault={true}
          image={{
            width: 43,
            height: 518,
            alt: "Every Tuesday Apple 2 Pencil",
            src: `${staticImages.assets.applePencil.flat.src}?h=518&fit=clip`,
            placeholder: staticImages.assets.applePencil.flat.placeholder
          }}
        />
      </div>

      {/* IPAD ART */}
      <div className="absolute top-[-2.8%] left-[-2.7%] scale-[.81] w-full overflow-hidden rounded-md tablet:rounded-xl art z-20 laptop:top-[-2.5%] laptop:left-[-2.65%] laptop:translate-y-[-2.6%]">
        <LazyImageBase image={featuredImage} id={product.slug} />
      </div>

      {/* IPAD DEVICE */}
      <div className="relative z-10 flex-1 w-full laptop:absolute lazy-load-wrapper lazy-load-wrapper-block lazy-load-image-full ipad">

        <LazyImgix
          id={"iPadFeature"}
          image={{
            width: staticImages.assets.ipad.flat.width,
            height: staticImages.assets.ipad.flat.height,
            alt: `Every Tuesday New Product: ${product.title}`,
            src: staticImages.assets.ipad.flat.src,
            placeholder: staticImages.assets.ipad.flat.placeholder
          }} />
      </div>

      {/* GREEN TEXTURE  */}
      <div className="absolute top-[-110px] left-[40px] z-0 w-[390px] tablet:w-[500px] laptop:rotate-[85deg] laptop:w-[740px] laptop:left-[-130px] laptop:top-[-160px] desktop:w-[950px] desktop:left-[-320px] desktop:top-[-250px]">
        {breakpoint !== 'mobile' && <LazyImgix
          id={'green-desktop'}
          image={{
            width: 1100,
            height: 1096,
            alt: 'Large green watercolor texture by Teela',
            src: `${staticImages.textures.greenLarge.src}?w=1100&fit=clip`,
            placeholder: staticImages.textures.greenLarge.placeholder
          }}
        />}

        {breakpoint === 'mobile' && <LazyImgix
          id={'green-desktop'}
          image={{
            width: 400,
            height: 399,
            alt: 'Large green watercolor texture by Teela',
            src: `${staticImages.textures.greenLarge.src}?w=400&fit=clip`,
            placeholder: staticImages.textures.greenLarge.placeholder
          }}
        />}
      </div>
    </div>
  )
}

export default IpadFeatureImage