import ProductCard__sm from "~/components/cards/productCard--sm"
import ColorSwatches from "./colorSwatches"

interface IProps {
  post: IPost
}

function PaidProducts(props: IProps) {
  const { post } = props

  if (!post.tutorialManager.paidProducts) {
    return null
  }

  const paidProductsGreaterThanOne = post.tutorialManager.paidProducts.length > 1
  const cssContainerPaidProduct = 'flex flex-col-reverse laptop:flex-row'
  const cssContainerMultipleProducts = 'flex flex-col-reverse tablet:flex-row tablet:flex-wrap-reverse'

  return (
    <div className='mb-8 col-start-2 col-span-2 tablet:col-start-3 tablet:col-span-10 desktop:col-start-4 desktop:col-span-8 z-20'>
      <div className={paidProductsGreaterThanOne ? cssContainerMultipleProducts : cssContainerPaidProduct}>

        <ColorSwatches multipleLayout={paidProductsGreaterThanOne} />

        {post.tutorialManager.paidProducts.map((product, index) => {

          return (
            <ProductCard__sm
              key={index}
              product={product}
              multipleProducts={paidProductsGreaterThanOne}
              index={index} />
          )

        })}
      </div>
    </div>
  )
}

export default PaidProducts
