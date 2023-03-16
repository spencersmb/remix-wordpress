import { classNames } from '@App/utils/appUtils'
import React from 'react'
import type { IBlendModeType } from '../usePatternProvider'

interface Props {
  mode: IBlendModeType
  isSelected: boolean
  handleClick: (value: IBlendModeType) => void
}

function DzBlendModeBtn(props: Props) {
  const { mode: { name, value }, isSelected } = props
  const onHandleClick = (value: IBlendModeType) => () => {
    props.handleClick(value)
  }
  return (
    <div
      onClick={onHandleClick(props.mode)}
      className={classNames(isSelected ? 'bg-[#4373F0] text-white' : ' bg-[#F0EEED]', 'flex items-center justify-center flex-[1_0_47%] rounded-lg py-2 px-2 text-center relative text-sm font-semibold')}>{name}</div>
  )
}

export default DzBlendModeBtn
