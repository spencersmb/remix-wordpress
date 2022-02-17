import React, { Component, ComponentType, ReactComponentElement, ReactElement, ReactNode, ReactSVG, ReactSVGElement } from 'react'
import BarChartSvg from '~/components/svgs/barChartSvg'
import { useSimpleTabs } from '~/components/tabs/SimpleTabs/simpleTabsContext'
import { classNames } from '~/utils/appUtils'

interface Props {
  id: string
  text: string
  Svg: ComponentType<any>
  iconFillType?: string
}
// CONVER TO GENERIC COMPONET And PASS IN THE SVG COMPONENT ETC
function TabLabel(props: Props) {
  const { id, text, Svg, iconFillType = 'fill' } = props
  const { state } = useSimpleTabs()

  const svgColor = state.selectedTab === id ? '--primary-plum-500' : '--neutral-400'

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
        ? 'text-primary-500 underlined-active'
        : 'text-neutral-400',
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
