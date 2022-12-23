import { ShopPlatformEnum } from "@App/enums/products";
import useFontPreview from "@App/hooks/useFontPreivew";
import useFreebiesLocal from "@App/hooks/useFreebies/useFreebiesPaginate";

import OutlinedButton from "../buttons/outlinedButton";
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

function createNewProductsArray(products: IProduct[]) {
  const featuredProduct = products[0]
  const productsArray = products.slice(1)
  return {
    featuredProduct,
    productsArray
  }
}

const ProductLayout = ({ products, metadata }: IProps) => {
  const { productsArray, featuredProduct } = createNewProductsArray(products)
  // const { fontPreviewState } = useFontPreview()
  const { filter, handleFilterClick, handlePageClick, posts, pagination, setFilter } = useFreebiesLocal<IProduct[]>({ items: productsArray, itemsPerPage: 12 })

  return (
    <>

      <FeaturedProduct
        product={featuredProduct}
      />

      {/* parent grid wrapper to match blog index layout */}
      <section className="grid bg-[#F5F5F5] grid-flow-row row-auto py-12 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop">

        <div className="col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12 desktop:pt-9">
          <div className="grid grid-flow-row grid-cols-1 tablet:grid-cols-2 tablet:gap-x-5 laptop:grid-cols-3 desktop:gap-x-8 ">
            {posts.map((product: IProduct) => {

              if (metadata?.serverSettings?.productPlatform === ShopPlatformEnum.GUMROAD) {

                return (
                  <GumroadProductCard
                    key={product.slug}
                    product={product}
                  />
                )
              }

            })
            }
          </div>

        </div>

        <div className='col-span-2 col-start-2 my-2 tablet:col-start-2 tablet:col-span-12 tablet:mt-5 tablet:mb-12 desktop:col-start-2 desktop:col-span-12'>
          {pagination.hasNextPage &&
            <>
              <OutlinedButton
                className='mx-auto btn btn-teal-600 btn-outlined-teal-600'
                clickHandler={handlePageClick}
                text={'Show More'}
                loading={false}
                loadingText={'Loading...'}
              />
            </>
          }

          {!pagination.hasNextPage && pagination.currentPage > 1 &&
            <div>No More Products</div>
          }
        </div>

      </section>

      {/* {
          fontLoadingState.status === 'completed' && fontLoadingState.font?.files.map(font => {
            return (
              <h1 key={font.family} style={{ fontFamily: font.family }}>Products</h1>
            )
          })
        } */}

      {/* {fontPreviewState.previewerOpen && <div>
        Preview Page
      </div>} */}

    </>
  );
}

export default ProductLayout;