import { formatePrice } from '~/utils/priceUtils'

interface Props {
  price: number
}

function GumroadBuyBtn(props: Props) {
  const { price } = props

  return (
    <button className="btn btn-teal font-normal flex justify-between text-lg px-5">
      <span>Buy Now</span>
      <span className="font-sentinel__SemiBoldItal text-2xl">{formatePrice(price, true)}</span>
    </button>
  )
}
export default GumroadBuyBtn
