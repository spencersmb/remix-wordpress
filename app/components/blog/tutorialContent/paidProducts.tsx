import ProductCard__sm from "~/components/cards/productCard--sm"
import ColorSwatches from "./colorSwatches"
import ColorSwatchesVerticalLayout from "./colorSwatchVerticalLayout"

interface IProps {
  post: IPost
}

function PaidProducts(props: IProps) {
  const { post } = props

  if (!post.tutorialManager.paidProducts) {
    return null
  }

  // const paidProductsGreaterThanOne = post.tutorialManager.paidProducts.length > 1
  const paidProductsGreaterThanOne = false
  const cssContainerPaidProduct = 'flex flex-col-reverse tablet:flex-row laptop:flex-row'
  const cssContainerMultipleProducts = 'flex flex-col tablet:flex-row tablet:flex-wrap'

  return (

    <div className={paidProductsGreaterThanOne ? cssContainerMultipleProducts : cssContainerPaidProduct}>

      {post.tutorialManager.colorPalette
        ? paidProductsGreaterThanOne
          ? <ColorSwatches
            downloadUrl={post.tutorialManager.colorPalette.downloadUrl}
            multipleLayout={paidProductsGreaterThanOne} />
          : <ColorSwatchesVerticalLayout
            downloadUrl={post.tutorialManager.colorPalette.downloadUrl} />
        : null
      }

      {post.tutorialManager.paidProducts.map((product, index) => {
        if (index === 1) {
          return null
        }
        return (
          <ProductCard__sm
            key={index}
            product={product}
            multipleProducts={paidProductsGreaterThanOne}
            index={index} />
        )

      })}
    </div>
  )
}

export default PaidProducts
