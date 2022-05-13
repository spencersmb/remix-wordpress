import { useState } from 'react'
import { getLicense } from '~/utils/posts'
import SelectBox from '../forms/licenseSelectDropdown'
import QuestionMarkCircleSvg from '../svgs/questionMarkCircleSvg'
import ShoppingCartSvg from '../svgs/shoppingCartSvg'
import SvgBorderIconWrapper from '../svgs/svgBorderWrapper'
import { LicenseEnum } from "~/enums/products"
import GumroadBtn from '~/components/buttons/gumroadBtn'
import LicenseSelectSection from '../products/licenseSelectSection'
import LazyImageBase from '../images/lazyImage-base'
import { defaultImages, ImageSizeEnums, loadImageSrc } from '~/utils/imageHelpers'


interface Props {
  index: number
  product: IProduct
  multipleProducts: boolean
}
/*
  * @Component ProductCard__sm -- ProductCard for BLOG article purchases
*/

function ProductCard__sm(props: Props) {
  const { index, product, multipleProducts } = props
  // const featuredImage = getImageSizeUrl(post.featuredImage, 'headless_post_feature_image')
  const featuredImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.SOURCE, // image name to try and get
    imageObject: product.featuredImage.node, // the featured image object
    fallbackSize: ImageSizeEnums.FULL, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })

  // if multiple products, we need to set extra CSS Styles
  const odd = index % 2 === 0
  const cssMargin = odd ? 'tablet:mr-4' : 'tablet:ml-4'

  return (
    <div className={`mb-8 flex flex-[0_1_50%]`}>
      <div className={`wrapper bg-white flex-1 rounded-2.5xl shadow-xs p-6 pb-4 tablet:mx-4 laptop:mb-0`}>

        {/* PRODUCT IMG */}
        <LazyImageBase
          image={featuredImage}
          id={product.slug} />

        {/* PRODUCT title */}
        <div className="items-center mb-6 text-center product_header">

          <h5 className={`text-2xl font-sentinel__SemiBoldItal laptop:text-h5 `}>
            {product.title}
          </h5>
        </div>

        {/* PRODUCT SELECT */}
        <LicenseSelectSection
          product={product}
        />
        {/* <div>
          <SelectBox handleSelected={handleSelect} selected={selectedLicenseType} data={product.details} />
        </div> */}

        {/* PRODUCT BUY NOW */}
        {/* <div className="flex flex-col flex-1 mt-4">

          {product.details.type === 'gumroad' && <GumroadBtn price={selectedLicense.price} url={selectedLicense.url} />}

          <div onClick={handleViewLicense} className="flex flex-row justify-center mt-4 hover:cursor-pointer">
            <span className="w-[22px] mr-1"><QuestionMarkCircleSvg fill={`#ACA4A9`} /></span>
            <p className="flex-1">View License Details</p>
          </div>

        </div> */}
      </div>
    </div>
  )
}

export default ProductCard__sm
