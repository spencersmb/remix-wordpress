import LicenseSelectSection from '../products/licenseSelectSection'
import LazyImageBase from '../images/lazyImage-base'
import { defaultImages, loadImageSrc } from '@App/utils/imageHelpers'
import { ImageSizeEnums } from '@App/enums/imageEnums'

interface Props {
  index: number
  product: IProduct
  multipleProducts: boolean
}
/**
* @Component ProductCard__sm -- ProductCard for BLOG article purchases
* @teststed - 5/28/2022
*/

function ProductCard__sm(props: Props) {
  const { product, index, multipleProducts } = props
  const featuredImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.SOURCE, // image name to try and get
    imageObject: product.featuredImage.node, // the featured image object
    fallbackSize: ImageSizeEnums.FEATURE, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })

  return (
    <div className={`mb-8 flex tablet:mb-0 tablet:flex-[0_1_50%] tablet:px-0`}>
      <div data-testid="ProductCard__sm" className={`wrapper bg-white flex flex-col flex-1 rounded-2.5xl shadow-xs p-6 ${multipleProducts ? index === 0 ? 'tablet:mr-4' : 'tablet:ml-4' : 'tablet:ml-4'} laptop:mb-0`}>

        {/* PRODUCT IMG */}
        <div className='mb-4 overflow-hidden rounded-lg'>
          <LazyImageBase
            image={featuredImage}
            id={product.slug} />
        </div>

        {/* PRODUCT title */}
        <div className="items-center mb-8 text-center product_header">

          <h3 className={`text-2xl font-sentinel__SemiBoldItal laptop:text-h5 max-w-[250px] mx-auto`}>
            {product.title}
          </h3>
        </div>

        {/* PRODUCT SELECT */}
        {product.productDetails.licences
          && product.productDetails.licences.length > 0
          && <LicenseSelectSection product={product}
          />}

      </div>
    </div>
  )
}

export default ProductCard__sm
