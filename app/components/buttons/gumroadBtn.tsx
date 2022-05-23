import { classNames } from '~/utils/appUtils'
import { formatePrice } from '~/utils/priceUtils.server'

interface Props {
  url: string
  className?: string
  price?: number
  text?: string
}

function GumroadBtn(props: Props) {
  const { price, url, className, text } = props

  return (
    <>
      <a
        className={classNames(className ? className : 'btn btn-teal font-normal justify-between', 'flex text-lg px-5')}
        href={url}>
        <span>{text ? text : 'Buy Now'}</span>
        {price &&
          <span className="text-2xl font-sentinel__SemiBoldItal">{formatePrice(price, true)}</span>}
      </a>
    </>

  )
}
export default GumroadBtn