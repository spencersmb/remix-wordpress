import { ISetFontFunction } from "~/hooks/useFonts";

interface IProps {
  product: IProduct
  previewFontHanlder: ISetFontFunction
}

const GumroadProductCard = ({ product, previewFontHanlder }: IProps) => {
  const hasFont = Boolean(product.details.font.name)

  return (
    <li key={product.slug}>
      {product.title}

      {hasFont && <button onClick={previewFontHanlder(product.details.font.name)}>Preview Font</button>}
    </li>
  )
}

export default GumroadProductCard