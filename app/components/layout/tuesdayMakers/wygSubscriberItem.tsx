import { classNames } from "@App/utils/appUtils"

interface itemProps {
  title: string
  index: number
  description: string
}
//TODO:TEST THIS
const WygSubscribeItem = (item: itemProps) => {

  const first3Items = item.index < 3
    ? 'tablet:col-start-2 tablet:col-span-6 desktop:col-start-3 desktop:col-span-5'
    : 'tablet:col-start-8 tablet:col-span-6 desktop:col-start-8 desktop:col-span-5'

  const checkCssRows = (index: number) => {
    switch (index) {
      case 0:
      case 1:
      case 2:
        return ''
      case 3:
        return 'tablet:row-start-5'
      case 4:
        return 'tablet:row-start-6'
    }
  }

  const cssMargins = (index: number) => {
    switch (index) {
      case 0:
      case 1:
        return 'laptop:ml-6'
      case 2:
        return 'tablet:mb-16 laptop:ml-6 laptop:mb-6 '
      case 3:
        return 'laptop:mr-6'
      case 4:
        return 'laptop:mr-6'
    }
  }

  const containerCss = `
    col-start-2 col-span-2 tablet:mx-4 ${first3Items}
    ${checkCssRows(item.index)} ${cssMargins(item.index)}
  `

  return (
    <div className={classNames('flex flex-row mb-6', containerCss)}>
      <div className='mr-2 text-3xl italic laptop:mr-5'>
        0{item.index + 1}
      </div>
      <div>
        <h4 className='text-xl font-sentinel__SemiBoldItal laptop:text-2xl laptop:mb-4 desktop:text-[28px]'>{item.title}</h4>
        <p className='laptop:text-xl'>{item.description}</p>
      </div>
    </div>
  )
}

export default WygSubscribeItem