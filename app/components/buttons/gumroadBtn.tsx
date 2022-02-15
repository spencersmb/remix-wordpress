import { formatePrice } from '~/utils/priceUtils'

interface Props {
  price: number
  url: string
}

function GumroadBtn(props: Props) {
  const { price, url } = props

  return (
    <>
      <a className="btn btn-teal font-normal flex justify-between text-lg px-5" href={url}>
        <span>Buy Now</span>
        <span className="font-sentinel__SemiBoldItal text-2xl">{formatePrice(price, true)}</span>
      </a>
    </>

  )
}
export default GumroadBtn