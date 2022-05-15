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

  const paidProductsGreaterThanOne = post.tutorialManager.paidProducts.length > 1
  const cssContainerPaidProduct = 'flex flex-col-reverse laptop:flex-row'
  const cssContainerMultipleProducts = 'flex flex-col-reverse tablet:flex-row tablet:flex-wrap-reverse'

  return (
    <div className='mb-8 col-start-2 col-span-2 tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 desktop:col-start-4 desktop:col-span-8 z-20 mx-[-1rem]'>
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
