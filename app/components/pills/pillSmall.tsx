import { classNames } from '@App/utils/appUtils'
import React from 'react'
import CloseSvg from '../svgs/closeSvg'
import CloseSvgThick from '../svgs/closeSvgThick'

interface Props {
  className?: string
  text: string
  clickHandler: () => void
  selected: boolean
}

function PillSmall(props: Props) {
  const { className, text, clickHandler, selected } = props

  return (
    // eslint-disable-n ext-line jsx-a11y/role-supports-aria-props
    <div
      id={`${text}`}
      onClick={clickHandler}
      aria-selected={selected}
      className={classNames(className && selected
        ? className : 'bg-grey-100 text-grey-500', 'ml-6 font-semibold rounded-xl px-3 py-2 text-sm flex flex-row items-center first:ml-0')}>
      <div>
        {text}
      </div>
    </div>
  )
}

export default PillSmall
