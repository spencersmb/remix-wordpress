import { classNames } from '@App/utils/appUtils'
import { formatePrice } from '@App/utils/priceUtils.server'
import { formatePriceClient } from '@App/utils/productPageUtils'

interface Props {
  url: string
  className?: string
  price?: number
  text?: string
}
/**
 * Gumroad Button
 * 
 * @tested - 5/27/2022 
 *
 */


function GumroadBtn(props: Props) {
  const { price, url, className, text } = props

  const formatPrice = price ? formatePriceClient(price, true) : null

  return (
    <a
      data-testid='test-GumroadBtn'
      className={classNames(className ? className : 'btn btn-teal font-normal justify-between', 'flex text-lg px-5')}
      href={url}>
      <span>{text ? text : 'Buy Now'}</span>
      {formatPrice &&
        <span
          data-testid="price"
          className="text-2xl font-sentinel__SemiBoldItal">
          {formatPrice}
        </span>
      }
    </a>
    // <a
    //   data-testid='test-GumroadBtn'
    //   className={classNames(className ? className : 'btn btn-teal font-normal justify-between', 'flex text-lg px-5')}
    //   href={url}>
    //   <span>{text ? text : 'Buy Now'}</span>
    //   {price &&
    //     <span
    //       data-testid="price"
    //       className="text-2xl font-sentinel__SemiBoldItal">{formatePrice(price, true)}</span>}
    // </a>
  )
}
export default GumroadBtn