import { ImageSizeEnums } from "@App/enums/imageEnums";
import { useProductLicense } from "@App/hooks/useProductLicense";
import { defaultImages, loadImageSrc } from "@App/utils/imageHelpers";
import LazyImageBase from "../images/lazyImage-base";
import LicenseSelectControls from "./licenseSelectControls";
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
        <div className="relative z-1">
          <LazyImageBase
            image={featuredImage}
            id={product.slug} />
        </div>
        {/* <div className='relative mb-8 overflow-hidden rounded-lg'>
          <a
            data-testid='test-GumroadBtn'
            className={'group'}
            href={`${licenseState?.url}?wanted=true&locale=false`}>
            <div className="absolute transition-all duration-300 -translate-x-1/2 opacity-0 -translate-y-1/4 top-1/2 left-1/2 z-3 group-hover:opacity-100 group-hover:-translate-y-1/2">
              <div className="btn btn-outline-reverse btn-xl min-w-[130px]">
                View
              </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-200 opacity-0 z-2 bg-grey-700 group-hover:opacity-70" />

            <div className="relative z-1">
              <LazyImageBase
                image={featuredImage}
                id={product.slug} />
            </div>
          </a> 
      </div >*/}

        {/* PRODUCT title */}
        <div data-testid="gumroad-title" className="items-center my-4 text-left product_header">
          <p className={`max-w-[275px] text-gray-900 text-3xl font-sentinel__SemiBoldItal tablet:max-w-[260px] laptop:text-2xl desktop:text-4xl laptop:max-w-[355px]`}>
            {product.title}
          </p>
        </div>

        {/* PRODUCT SELECT */}
        {/* <LicenseSelectSection
          product={product}
        /> */}
        <LicenseSelectControls product={product} />
      </div>
    </div >
  )
}

export default GumroadProductCard