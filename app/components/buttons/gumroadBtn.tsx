import { classNames } from '@App/utils/appUtils'
import { formatePrice as formatePriceServer } from '@App/utils/priceUtils.server'
import { formatePriceClient } from '@App/utils/productPageUtils'

interface Props {
  url: string
  className?: string
  price?: number
  text?: string
  doubleBtn?: boolean
}
/**
 * Gumroad Button
 * 
 * @tested - 08/22/2022
 *
 */


function GumroadBtn(props: Props) {
  const { price, url, className, text, doubleBtn = true } = props

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
    <div className='flex flex-row w-full gap-4'>
      {doubleBtn && <a
        data-testid='test-GumroadBtn-view'
        className={classNames('btn btn-xl btn-outlineFill btn-flex', 'gumroad-btn-view flex')}
        href={url}>
        <span>{'View'}</span>
      </a>}
      <a
        data-testid='test-GumroadBtn-buy'
        className={classNames(className ? className : 'btn btn-xl btn-primary btn-flex', 'gumroad-btn flex')}
        href={`${url}?wanted=true&locale=false`}>
        <span>{text ? text : 'Buy Now'}</span>
        {formatPrice &&
          <span
            data-testid="price"
            className="ml-4 text-2xl font-sentinel__SemiBoldItal leading-[1]">
            {formatPrice}
          </span>
        }
      </a>
    </div>
  )
}
export default GumroadBtn