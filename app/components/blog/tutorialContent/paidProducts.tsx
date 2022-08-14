import ProductCardBlog from "@App/components/cards/productCard--sm"
import ColorSwatches from "./colorSwatches"

interface IProps {
  post: IPost
}

/**
 * PaidProducts Component
 * @tested - 5/25/2022
 * @param props 
 */
function PaidProducts(props: IProps) {
  const { post } = props

  // if (!post.tutorialManager.paidProducts) {
  //   return null
  // }

  // const paidProductsGreaterThanOne = post.tutorialManager.paidProducts.length > 1
  const cssContainerPaidProduct = 'single_product flex flex-col-reverse tablet:flex-row laptop:flex-row'
  const cssContainerMultipleProducts = 'multiple_products flex flex-col tablet:flex-row tablet:flex-wrap'

  return (
    <div>DEPRICATED</div>
    // <div
    //   data-testid="test-paidProduct"
    //   className={paidProductsGreaterThanOne ? cssContainerMultipleProducts : cssContainerPaidProduct}>

    //   {/* {post.tutorialManager.colorPalette
    //     ? paidProductsGreaterThanOne
    //       ? <ColorSwatches
    //         downloadUrl={post.tutorialManager.colorPalette.downloadUrl}
    //         multipleLayout={true} />
    //       : <ColorSwatches
    //         downloadUrl={post.tutorialManager.colorPalette.downloadUrl}
    //         multipleLayout={false} />
    //     : null
    //   } */}

    //   {post.tutorialManager.paidProducts.map((product, index) => {
    //     return (
    //       <ProductCardBlog
    //         key={index}
    //         product={product}
    //         multipleProducts={paidProductsGreaterThanOne}
    //         index={index} />
    //     )
    //   })}
    // </div>
  )
}

export default PaidProducts
