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
  const { product, index } = props
  // const featuredImage = getImageSizeUrl(post.featuredImage, 'headless_post_feature_image')
  const featuredImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.SOURCE, // image name to try and get
    imageObject: product.featuredImage.node, // the featured image object
    fallbackSize: ImageSizeEnums.FULL, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })
  console.log('(index + 1) === 1', (index + 1) === 1);


  return (
    <div className={`mb-8 flex tablet:mb-0 tablet:flex-[0_1_50%] tablet:px-0`}>
      <div className={`wrapper bg-white flex flex-col flex-1 rounded-2.5xl shadow-xs p-6 ${index === 0 ? 'tablet:mr-4' : 'tablet:ml-4'} laptop:mb-0`}>

        {/* PRODUCT IMG */}
        <div className='mb-4 overflow-hidden rounded-lg'>
          <LazyImageBase
            image={featuredImage}
            id={product.slug} />
        </div>

        {/* PRODUCT title */}
        <div className="items-center mb-8 text-center product_header">

          <h5 className={`text-2xl font-sentinel__SemiBoldItal laptop:text-h5 max-w-[250px] mx-auto`}>
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

export default ProductCard__sm
