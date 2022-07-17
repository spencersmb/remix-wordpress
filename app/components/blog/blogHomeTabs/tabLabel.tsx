import type { ComponentType } from 'react';
import { useSimpleTabs } from '@App/components/tabs/SimpleTabs/simpleTabsContext'
import { classNames } from '@App/utils/appUtils'

interface Props {
  id: string
  text: string
  Svg: ComponentType<any>
  iconFillType?: string
}

/**
 * TabLabel component
 * @tested - 5/25/2022
 * @param props 
 */
function TabLabel(props: Props) {
  const { id, text, Svg, iconFillType = 'fill' } = props
  const { state } = useSimpleTabs()

  const svgColor = state.selectedTab === id ? '--primary-plum-500' : '--grey-400'

  let iconProps = {}

  if (iconFillType === 'stroke') {
    iconProps = {
      stroke: `var(${svgColor})`,
    }
  } else {
    iconProps = {
      fill: `var(${svgColor})`,
    }
  }

  return (
    <div
      className={classNames(state.selectedTab === id
        ? 'text-primary-500 after:underlined-active'
        : 'text-grey-500',
        'tabName flex flex-row items-center tablet:items-end font-sentinel__SemiBoldItal transition-colors leading-5 tablet:leading-none tablet:text-2xl underlined cursor-pointer after:bottom-[-16px]')
      }
    >
      <span className='max-w-[28px] mr-2'>
        <Svg className='transition-all' {...iconProps} />
      </span>
      {text}
    </div>
  )
}

export default TabLabel
