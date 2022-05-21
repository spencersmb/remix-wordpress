import { defaultImages, ImageSizeEnums, loadImageSrc } from "~/utils/imageHelpers";
import LazyImageBase from "../images/lazyImage-base";
import LicenseSelectSection from "./licenseSelectSection";

interface IProps {
  product: IProduct
}

const FeaturedProduct = ({ product }: IProps) => {

  const heroImage = product.details.productContent.productfeatureimage
  const featuredImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.SOURCE, // image name to try and get
    imageObject: heroImage ? heroImage : product.featuredImage.node, // the featured image object
    fallbackSize: ImageSizeEnums.FULL, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })

  console.log('product', product);


  return (
    <div className='grid grid-flow-row row-auto bg-sage-200 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop pt-[80px]'>

      {/* PRODUCT CARD */}
      <div className={`relative z-20 flex flex-col col-span-2 col-start-2 mb-8 card_conainter tablet:col-start-3 tablet:col-span-10 laptop:col-start-9 laptop:col-span-5 laptop:mt-0 desktop:col-start-9 desktop:col-span-5 desktop:mb-16`}>

        <div className="mobile_wrapper bg-white rounded-2.5xl shadow-xs px-6 pb-6 pt-14 laptop:bg-transparent laptop:shadow-none laptop:p-0">
          {/* FEATURE IMAGE */}
          <div className="w-full z-[22] relative laptop:absolute rotate-6 tablet:translate-x-0 tablet:w-[70%] tablet:mx-auto laptop:left-[-670px] laptop:w-[700px] laptop:top-[30px] laptop:rotate-[-3deg] desktop:left-[-890px] desktop:w-[850px] desktop:top-0">
            <div className="relative max-w-[1000px]">
              <div className="absolute top-[-2.8%] left-[-2.7%] scale-[.81] w-full overflow-hidden rounded-md tablet:rounded-xl art ">
                <LazyImageBase image={featuredImage} id={product.slug} />
              </div>
              <div className="ipad">
                <img src="/images/makers-ipad.png" alt={`Featured product: ${product.title}`} />
              </div>
            </div>
          </div>

          <div className={`wrapper laptop:max-w-[438px] bg-white flex flex-col flex-1 laptop:rounded-2.5xl laptop:shadow-xs p-6 laptop:m-0 desktop:ml-8`}>

            {/* PRODUCT title */}
            <div className="flex flex-col items-start mb-8 text-left product_header">
              <span className="rounded-md uppercase py-1 px-[14px] mb-4 bg-red-400 text-xs text-white font-semibold flex justify-center items-center">
                New
              </span>
              <h1 className={`max-w-[275px] text-gray-900 text-3xl mb-2 font-sentinel__SemiBoldItal tablet:max-w-[260px] laptop:text-2xl desktop:text-4xl laptop:max-w-[355px]`}>
                {product.title}
              </h1>
              {product.details.productContent.subtitle &&
                <h2 className="mb-2 text-xl">
                  {product.details.productContent.subtitle}
                </h2>}
              {product.details.productContent.description &&
                <p className="text-grey-500">
                  {product.details.productContent.description}
                </p>}
            </div>

            {/* PRODUCT SELECT */}
            <LicenseSelectSection
              product={product}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProduct