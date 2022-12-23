import { defaultImages, loadImageSrc } from "@App/utils/imageHelpers";
import LicenseSelectSection from "./licenseSelectSection";
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import useSite from "@App/hooks/useSite";
import { breakpointConvertPX } from "@App/utils/appUtils";
import { staticImages } from "@App/lib/imgix/data";
import { BPPX } from "@App/enums/breakpointEnums";
import IpadFeatureImage from "../images/ipadFeatureImage";
import { ImageSizeEnums } from "@App/enums/imageEnums";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyImgix from "../images/lazyImgix";
import { navStyles } from "@App/utils/pageUtils";
import FloralsBorder2Svg from "../svgs/florals/floralsBorderSvg-2";

interface IProps {
  product: IProduct
}
/**
 * @Component FeaturedProduct
 * @tested - 6/2/2022
 * 
 * Main Feature Product on /Product Page
 *
 *
 */
const FeaturedProduct = ({ product }: IProps) => {
  const { state: { breakpoint } } = useSite();
  const heroImage = product.productDetails.productContent.productfeatureimage
  const featuredImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.SOURCE, // image name to try and get
    imageObject: heroImage ? heroImage : product.featuredImage.node, // the featured image object
    fallbackSize: ImageSizeEnums.FULL, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })

  return (
    <section className={`${navStyles} bg-white relative `}>

      <div className="absolute top-[10px] w-[1000px] left-[370px] tablet:top-[-30px] tablet:w-[1710px] tablet:left-[117%] laptop:w-[1170px] laptop:left-[57%] laptop:top-5 desktop:top-0 desktop:w-[1400px] -translate-x-1/2">
        <FloralsBorder2Svg />
      </div>
      <div className="pt-[80px] grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop">

        {/* DESKTOP FEATURE IMAGE */}
        {breakpointConvertPX(breakpoint) > BPPX.TABLET &&
          <div
            data-testid="featured-image-laptop"
            className="relative col-span-2 col-start-2 laptop:col-start-7 laptop:col-span-7 desktop:col-start-7 desktop:col-span-7">
            <div className="w-full z-[22] relative laptop:absolute rotate-6 tablet:translate-x-0 tablet:w-[70%] tablet:mx-auto laptop:right-[-30px] laptop:w-[114%] laptop:top-0 laptop:rotate-[-3deg] desktop:right-[0px] desktop:w-[800px] desktop:top-[-25px]">

              <IpadFeatureImage product={product} featuredImage={featuredImage} />
            </div>
          </div>}

        {/* PRODUCT CARD */}
        <div className={`relative z-20 flex flex-col col-span-2 col-start-2 mb-8 card_conainter tablet:col-start-3 tablet:col-span-10 laptop:col-start-2 laptop:col-span-5 laptop:mt-0 desktop:col-start-2 desktop:col-span-5 desktop:mb-16`}>

          <div className="mobile_wrapper pt-14 laptop:bg-transparent laptop:p-0">

            {/* MOBILE FEATURE IMAGE ONE*/}
            {breakpointConvertPX(breakpoint) < BPPX.LAPTOP &&
              <div
                data-testid="featured-image-mobile"
                className="w-full z-[22] relative rotate-6 tablet:translate-x-0 tablet:w-[70%] tablet:mx-auto laptop:hidden">
                {/* IPAD WRAPPER */}
                <IpadFeatureImage
                  product={product}
                  featuredImage={featuredImage}
                />
              </div>
            }

            <div className={`wrapper laptop:max-w-[438px] flex flex-col flex-1 p-6 laptop:m-0 desktop:ml-8 relative desktop:max-w-none`}>

              {/* PRODUCT CONTENT */}
              <div
                data-testid="featured-product-content"
                className="flex flex-col items-start mb-8 text-left product_header">
                <span className="rounded-md uppercase py-1 px-[14px] mb-4 bg-[#ffc900] text-xs text-[#7a4b0e] font-bold flex justify-center items-center">
                  New
                </span>

                {/* PRODUCT title */}
                <h1 className={`max-w-[275px] text-gray-900 text-3xl mb-2 font-sentinel__SemiBoldItal tablet:max-w-[260px] laptop:text-4xl laptop:max-w-[355px] desktop:text-5xl desktop:max-w-none`}>
                  {product.title}
                </h1>

                {product.productDetails.productContent.subtitle &&
                  <h2
                    aria-label={`${product.title} subtitle`}
                    className="mb-2 text-xl font-medium laptop:pr-4">
                    {product.productDetails.productContent.subtitle}
                  </h2>}
                {product.productDetails.productContent.description &&
                  <p
                    aria-label={`${product.title} description`}
                    className="text-grey-700">
                    {product.productDetails.productContent.description}
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

    </section>
  )

}

export default FeaturedProduct


// <PICTURE/> SIZES EXAMPLE
// eslint-disable-next-line no-lone-blocks
{/* <picture>
          <source
            srcSet={`
            ${src1} 300w,
              ${src2} 800w,
              ${src3} 1200w
            `}

            sizes="(min-width: 1280px) 1200px,
             (min-width: 768px) 800px,
             (min-width: 328px) 200px,
             100vw"/>
          <img src={src1} alt="Car" />
        </picture> */}
// eslint-disable-next-line no-lone-blocks
{/* <LazyLoadImage
          key={'test'}
          alt={'test'}
          effect="blur"
          srcSet={`
            ${src1} 328w,
              ${src2} 767w,
              ${src3} 1200w
            `}

          sizes="(min-width: 1280px) 1200px,
             (min-width: 768px) 400px,
             (min-width: 328px) 200px,
             100vw"
          placeholderSrc={placeholder}
          // Make sure to pass down the scrollPosition,
          // this will be used by the component to know
          // whether it must track the scroll position or not
          src={src1}
        /> */}