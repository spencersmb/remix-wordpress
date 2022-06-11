import { ShopPlatformEnum } from "@App/enums/products";
import useFontPreview from "@App/hooks/useFontPreivew";
import FeaturedProduct from "./featureProduct";
import GumroadProductCard from "./gumroadProductCard";
interface IProps {
  products: IProduct[]
  metadata: ISiteMetaDataMapped
}

/**
 * @Component ProductLayout Component
 * 
 * Main layout for product page - Not Tested.
 *
 */
const ProductLayout = ({ products, metadata }: IProps) => {
  const { fontPreviewState } = useFontPreview()

  return (
    <div>
      <FeaturedProduct
        product={products[0]}
      />
      {/* parent grid wrapper to match blog index layout */}
      <div className="grid grid-flow-row row-auto py-12 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop">

        <div className="col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12 desktop:pt-9">
          <div className="grid grid-flow-row grid-cols-1 tablet:grid-cols-2 tablet:gap-x-5 laptop:grid-cols-3 desktop:gap-x-8 ">
            {products.map((product: IProduct) => {

              if (metadata?.serverSettings?.productPlatform === ShopPlatformEnum.GUMROAD) {

                return (
                  <GumroadProductCard
                    key={product.slug}
                    product={product}
                  />
                )
              }

            }).slice(1) // Remove first time because its the featured product
            }
          </div>

        </div>

      </div>

      {/* {
          fontLoadingState.status === 'completed' && fontLoadingState.font?.files.map(font => {
            return (
              <h1 key={font.family} style={{ fontFamily: font.family }}>Products</h1>
            )
          })
        } */}

      {fontPreviewState.previewerOpen && <div>
        Preview Page
      </div>}

    </div>
  );
}

export default ProductLayout;