import { ISetFontFunction } from "~/hooks/useFonts"

interface IProps {
  product: IProduct
  previewFontHanlder: ISetFontFunction
}

const FeaturedProduct = ({ product, previewFontHanlder }: IProps) => {

  if (!product) {
    return (
      <div>
        <h1>No product found</h1>
      </div>
    )
  }

  const hasFont = Boolean(product.details.font.name)

  return (
    <div>
      Featured product {product.title}
      {hasFont && <button onClick={previewFontHanlder(product.details.font.name)}>Preview Font</button>}
    </div>
  )
}

export default FeaturedProduct