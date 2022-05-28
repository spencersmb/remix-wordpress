import { classNames } from '@App/utils/appUtils'
import { formatePrice } from '@App/utils/priceUtils.server'

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
        data-testid='test-GumroadBtn'
        className={classNames(className ? className : 'btn btn-teal font-normal justify-between', 'flex text-lg px-5')}
        href={url}>
        <span>{text ? text : 'Buy Now'}</span>
        {price &&
          <span
            data-testid="price"
            className="text-2xl font-sentinel__SemiBoldItal">{formatePrice(price, true)}</span>}
      </a>
    </>

  )
}
export default GumroadBtn