import { defaultImages, ImageSizeEnums, loadImageSrc } from "@App/utils/imageHelpers";
import LazyImageBase from "../images/lazyImage-base";
import LicenseSelectSection from "./licenseSelectSection";
import Imgix, { Picture, Source } from "react-imgix";
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSite from "@App/hooks/useSite";
import { breakpointConvertPX } from "@App/utils/windowUtils";
import { staticImages } from "@App/lib/imgix/data";
import { BPPX } from "@App/enums/breakpointEnums";

interface IProps {
  product: IProduct
}

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
    <div className='grid grid-flow-row row-auto bg-sage-200 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop pt-[80px]'>

      {/* DESKTOP FEATURE IMAGE */}
      {breakpointConvertPX(breakpoint) > BPPX.TABLET && <div className="relative col-span-2 col-start-2 laptop:col-start-2 laptop:col-span-7 desktop:col-start-2 desktop:col-span-7">
        <div className="w-full z-[22] relative laptop:absolute rotate-6 tablet:translate-x-0 tablet:w-[70%] tablet:mx-auto laptop:right-[-30px] laptop:w-[114%] laptop:top-0 laptop:rotate-[-3deg] desktop:right-[-30px] desktop:w-[850px] desktop:top-0">

          {/* IPAD WRAPPER */}
          <IpadFeatureImage product={product} featuredImage={featuredImage} />
        </div>
      </div>}

      {/* PRODUCT CARD */}
      <div className={`relative z-20 flex flex-col col-span-2 col-start-2 mb-8 card_conainter tablet:col-start-3 tablet:col-span-10 laptop:col-start-9 laptop:col-span-5 laptop:mt-0 desktop:col-start-9 desktop:col-span-5 desktop:mb-16`}>

        <div className="mobile_wrapper bg-white rounded-2.5xl shadow-xs px-6 pb-6 pt-14 laptop:bg-transparent laptop:shadow-none laptop:p-0">

          {/* MOBILE FEATURE IMAGE ONE*/}
          {breakpointConvertPX(breakpoint) < BPPX.LAPTOP &&
            <div className="w-full z-[22] relative laptop:absolute rotate-6 tablet:translate-x-0 tablet:w-[70%] tablet:mx-auto">
              {/* IPAD WRAPPER */}
              <IpadFeatureImage
                product={product}
                featuredImage={featuredImage}
              />
            </div>
          }

          <div className={`wrapper laptop:max-w-[438px] bg-white flex flex-col flex-1 laptop:rounded-2.5xl laptop:shadow-xs p-6 laptop:m-0 desktop:ml-8 relative`}>

            {/* BLACK PIN */}
            {breakpointConvertPX(breakpoint) > BPPX.TABLET &&
              <div className="w-[100px] absolute top-[-4%] left-[50%] translate-x-[-50%] z-[1]">
                <LazyLoadImage
                  key={'blackPin'}
                  alt={'Every Tuesday Hand Made Black Pin'}
                  effect="blur"
                  // srcSet={`
                  //   ${src1} 328w,
                  //     ${src2} 767w,
                  //     ${src3} 1200w
                  //   `}
                  // sizes="(min-width: 1280px) 1200px,
                  //   (min-width: 768px) 400px,
                  //   (min-width: 328px) 200px,
                  //   100vw"
                  placeholderSrc={staticImages.assets.pins.black_1.placeholder}
                  // Make sure to pass down the scrollPosition,
                  // this will be used by the component to know
                  // whether it must track the scroll position or not
                  src={staticImages.assets.pins.black_1.src}
                />
              </div>}

            {/* PRODUCT CONTENT */}
            <div className="flex flex-col items-start mb-8 text-left product_header">
              <span className="rounded-md uppercase py-1 px-[14px] mb-4 bg-red-400 text-xs text-white font-semibold flex justify-center items-center">
                New
              </span>

              {/* PRODUCT title */}
              <h1 className={`max-w-[275px] text-gray-900 text-3xl mb-2 font-sentinel__SemiBoldItal tablet:max-w-[260px] desktop:text-4xl laptop:max-w-[355px]`}>
                {product.title}
              </h1>
              {product.productDetails.productContent.subtitle &&
                <h2 className="mb-2 text-xl laptop:pr-4">
                  {product.productDetails.productContent.subtitle}
                </h2>}
              {product.productDetails.productContent.description &&
                <p className="text-grey-500">
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

    </div>
  )

}

export default FeaturedProduct

interface IFeatureProps {
  featuredImage: IMediaDetailSize
  product: IProduct
}
const IpadFeatureImage = ({ featuredImage, product }: IFeatureProps) => {


  return (
    <div className="relative max-w-[1000px] z-20">

      {/* APPLE PENCIL */}
      <div className="absolute top-[30%] left-[70%] z-30 w-[5%] rotate-[52deg] origin-center">
        <LazyLoadImage
          key={'applePencil'}
          alt={'Every Tuesday Apple 2 Pencil'}
          effect="blur"
          placeholderSrc={staticImages.assets.applePencil.flat.placeholder}
          src={staticImages.assets.applePencil.flat.src}
        />
      </div>

      {/* IPAD ART */}
      <div className="absolute top-[-2.8%] left-[-2.7%] scale-[.81] w-full overflow-hidden rounded-md tablet:rounded-xl art z-20">
        <LazyImageBase image={featuredImage} id={product.slug} />
      </div>

      {/* IPAD DEVICE */}
      <div className="relative z-10 ipad">
        <LazyLoadImage
          key={'iPadFeature'}
          alt={`Every Tuesday New Product: ${product.title}`}
          effect="blur"
          placeholderSrc={staticImages.assets.ipad.flat.placeholder}
          src={staticImages.assets.ipad.flat.src}
        />
      </div>

      {/* GREEN TEXTURE  */}
      <div className="absolute top-[-110px] left-[40px] z-0 w-[390px] tablet:w-[500px] laptop:rotate-[85deg] laptop:w-[740px] laptop:left-[-130px] laptop:top-[-160px] desktop:w-[950px] desktop:left-[-320px] desktop:top-[-250px]">
        <Picture >
          <Source
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes'
            }}
            src={staticImages.textures.greenLarge.src}
            width={1200}
            htmlAttributes={{ media: "(min-width: 1200px)" }}
          />
          <Source
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes'
            }}
            src={staticImages.textures.greenLarge.src}
            width={740}
            htmlAttributes={{ media: "(min-width: 1024px)" }}
          />
          <Source
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes'
            }}
            src={staticImages.textures.greenLarge.src}
            width={600}
            htmlAttributes={{ media: "(min-width: 320px)" }}
          />
          <Imgix
            className="lazyload"
            src={staticImages.textures.greenLarge.src}
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes'
            }}
            imgixParams={{ w: 100 }}
            htmlAttributes={{
              src: staticImages.textures.greenLarge.placeholder, // low quality image here
            }} />
        </Picture>
      </div>
    </div>
  )
}