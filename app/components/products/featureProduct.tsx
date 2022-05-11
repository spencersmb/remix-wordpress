
interface IProps {
  product: IProduct
}

const FeaturedProduct = ({ product }: IProps) => {

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
    </div>
  )
}

export default FeaturedProduct