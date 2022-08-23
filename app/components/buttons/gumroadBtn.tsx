import { classNames } from '@App/utils/appUtils'
import { formatePrice as formatePriceServer } from '@App/utils/priceUtils.server'
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

  // function format(localPrice: number, removeZeros: boolean = false) {
  //   if (removeZeros) {
  //     return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(localPrice).replace(/(\.0*|(?<=(\..*))0*)$/, '');
  //   }
  //   return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(localPrice)
  // }

  const formatPrice = price
    ? formatePriceClient(price, true)
    : null

  return (
    <a
      data-testid='test-GumroadBtn'
      className={classNames(className ? className : 'btn btn-xl btn-primary btn-flex', 'flex')}
      href={url}>
      <span>{text ? text : 'Buy Now'}</span>
      {formatPrice &&
        <span
          data-testid="price"
          className="ml-4 text-2xl font-sentinel__SemiBoldItal leading-[1]">
          {formatPrice}
        </span>
      }
    </a>
  )
}
export default GumroadBtn