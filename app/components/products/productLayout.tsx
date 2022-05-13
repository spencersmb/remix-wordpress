import { ShopPlatformEnum } from "~/enums/products";
import useFontPreview from "~/hooks/useFontPreivew";
import FeaturedProduct from "./featureProduct";
import GumroadProductCard from "./gumroadProductCard";
interface IProps {
  products: IProduct[]
  metadata: ISiteMetaDataMapped
}
const ProductLayout = ({ products, metadata }: IProps) => {
  const { fontPreviewState } = useFontPreview()

  return (
    <div>
      <FeaturedProduct
        product={products[0]}
      />
      <ul>

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
      </ul>

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