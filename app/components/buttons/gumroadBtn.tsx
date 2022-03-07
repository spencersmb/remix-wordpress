import { classNames } from '~/utils/appUtils'
import { formatePrice } from '~/utils/priceUtils'

interface Props {
  price: number
  url: string
  className?: string
  text?: string
}

function GumroadBtn(props: Props) {
  const { price, url, className, text } = props

  return (
    <>
      <a
        className={classNames(className ? className : 'btn btn-teal font-normal', ' flex justify-between text-lg px-5')}
        href={url}>
        <span>{text ? text : 'Buy Now'}</span>
        <span className="text-2xl font-sentinel__SemiBoldItal">{formatePrice(price, true)}</span>
      </a>
    </>

  )
}
export default GumroadBtn