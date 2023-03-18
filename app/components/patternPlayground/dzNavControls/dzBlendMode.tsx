import { classNames } from '@App/utils/appUtils'
import React from 'react'
import usePatternPlayground from '../usePatternProvider'

interface Props { }

function DzBlendMode(props: Props) {
  const { toggleBlendModeMenu, state: { blendMode } } = usePatternPlayground()

  return (
    <div
      onClick={toggleBlendModeMenu}
      className={classNames(blendMode.isOpen ? 'bg-[#4373F0] text-white' : 'bg-[#F0EEED]', 'flex flex-row  rounded-lg py-3 px-3 items-start min-w-[194.66px] relative')}>
      <div className='flex flex-col flex-1'>
        <span className={classNames(blendMode.isOpen ? ' text-white' : 'text-grey-500 ', 'text-[10px] font-semibold')}>Blend Mode:</span>
        <div className='text-sm font-semibold leading-[1]'>
          {blendMode.type ? blendMode.type.name : 'None'}
        </div>
      </div>
      <div
        style={{
          backgroundColor: blendMode.color?.hex
        }}
        className={classNames('border-2 border-grey-500 absolute top-[50%] -translate-y-1/2 right-[9px] w-[35px] h-[35px] rounded-md ')}>
        {!blendMode.color && <span className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[42px] h-[2px] bg-red-500 rotate-45'></span>}
      </div>
    </div>
  )
}

export default DzBlendMode
