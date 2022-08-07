import { classNames } from '@App/utils/appUtils'
import React from 'react'

interface Props {
  text: string
  cssOverride?: string
}

/**
 * 
 * @function AccentHeaderText 
 * @tested 8/4/2022 
 */
function AccentHeaderText(props: Props) {
  const { text, cssOverride } = props

  return (
    <div className={classNames(cssOverride ? cssOverride : '', 'absolute font-sans text-xl tablet:text-[33px] italic top-[-30px] left-[-25px] rotate-[-6deg]')}>
      {text}
    </div>
  )
}

export default AccentHeaderText
