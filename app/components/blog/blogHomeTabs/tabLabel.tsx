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

  const svgColor = state.selectedTab === id ? '--sage-700' : '--sage-600'

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
      data-testid="tab"
      className={classNames(state.selectedTab === id
        ? 'after:underlined-active text-sage-700'
        : 'text-sage-600 after:!bg-sage-700',
        'tabName flex flex-row items-center tablet:items-end font-sentinel__SemiBoldItal transition-colors leading-5 tablet:leading-none tablet:text-2xl after:underlineAnimation underlined cursor-pointer pb-2')
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
