import { defaultImages, ImageSizeEnums, loadImageSrc } from "@App/utils/imageHelpers";
import LazyImageBase from "../images/lazyImage-base";
import LicenseSelectSection from "./licenseSelectSection";

interface IProps {
  product: IProduct
}
/**
 * @Component Gumroad Product Card
 * @tested - 6/2/2022
 * 
 * Product Card used on /Product Page
 *
 *
 */
const GumroadProductCard = ({ product }: IProps) => {

  const featuredImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.SOURCE, // image name to try and get
    imageObject: product.featuredImage.node, // the featured image object
    fallbackSize: ImageSizeEnums.FULL, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })

  return (
    <div className={`z-20 flex flex-col col-span-2 col-start-1 mb-8 card_conainter tablet:col-start-auto tablet:col-auto desktop:mb-16`}>
      <div className={`wrapper bg-white flex flex-col flex-1 rounded-2.5xl shadow-xs p-6 laptop:mb-0`}>

        {/* PRODUCT IMG */}
        <div className='mb-8 overflow-hidden rounded-lg'>
          <LazyImageBase
            image={featuredImage}
            id={product.slug} />
        </div>

        {/* PRODUCT title */}
        <div data-testid="gumroad-title" className="items-center mb-4 text-left product_header">
          <h5 className={`max-w-[275px] text-gray-900 text-3xl font-sentinel__SemiBoldItal tablet:max-w-[260px] laptop:text-2xl desktop:text-4xl laptop:max-w-[355px]`}>
            {product.title}
          </h5>
        </div>

        {/* PRODUCT SELECT */}
        <LicenseSelectSection
          product={product}
        />
      </div>
    </div>
  )
}

export default GumroadProductCard