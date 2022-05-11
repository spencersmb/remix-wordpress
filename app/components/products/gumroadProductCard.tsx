
interface IProps {
  product: IProduct
  setFont: any
  previewFont: any
}

const GumroadProductCard = ({ product, previewFont }: IProps) => {
  const hasFont = Boolean(product.details.font.name)

  return (
    <li key={product.slug}>
      {product.title}
      {hasFont && <button onClick={previewFont} data-fontfamily={product.details.font.name}>Preview Font</button>}
    </li>
  )
}

export default GumroadProductCard