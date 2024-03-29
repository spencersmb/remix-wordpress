import { ImageSizeEnums } from '@App/enums/imageEnums'
import { useProductLicense } from '@App/hooks/useProductLicense'
import { defaultImages, loadImageSrc } from '@App/utils/imageHelpers'
import LazyImageBase from '../images/lazyImage-base'
import LicenseSelectSection from '../products/licenseSelectSection'

interface Props {
  product: IProduct
  index: number
}

function ProductCardMini(props: Props) {
  const { product } = props
  const featuredImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.SOURCE, // image name to try and get
    imageObject: product.featuredImage.node, // the featured image object
    fallbackSize: ImageSizeEnums.FEATURE, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })

  // const { licenseState } = useProductLicense(product.productDetails.licences)

  return (
    <div className='bg-white rounded-2.5xl p-4 transition-all duration-300 translate-y-0 shadow-xs hover:shadow-et_4 hover:-translate-y-2 mb-4 flex flex-col'>

      <div
        className='flex flex-col flex-1'
      >

        {/* PRODUCT IMG */}
        <div className='mb-4 overflow-hidden rounded-lg'>
          <LazyImageBase
            image={featuredImage}
            id={product.slug} />
        </div>

        {/* PRODUCT title */}
        <div className="items-center mb-8 text-center product_headerm">
          <h5 className={`text-2xl font-sentinel__SemiBoldItal laptop:text-h5 max-w-[250px] mx-auto`}>
            {product.title}
          </h5>
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

export default ProductCardMini
