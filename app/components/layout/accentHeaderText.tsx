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
    <div className={classNames(cssOverride ? cssOverride : '', 'absolute font-bonVivant text-2xl tablet:text-5xl italic top-[-47px] left-[-25px] rotate-[-14deg]')}>
      {text}
    </div>
  )
}

export default AccentHeaderText
