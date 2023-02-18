import PPFullBlock from '@App/components/svgs/patternPlayground/fullblock'
import { classNames } from '@App/utils/appUtils'
import React, { ReactElement } from 'react'

interface Props {
  patternType: number
  isSelected: boolean
  setPatternType: (patternType: number) => void
  text: string
  Icon: React.ComponentType<any>
}

function DzStyleButton(props: Props) {
  const { patternType, setPatternType, text, isSelected, Icon } = props
  const blue = 'bg-[#4373F0]'
  return (
    <button
      className={classNames(isSelected ? `${blue}` : 'bg-[#F0EEED]', 'transition-all rounded-lg p-3 flex flex-col w-full max-w-[168px] justify-between max-h-[100px] h-full')}
      onClick={() => setPatternType(patternType)}
    >
      <div className='w-12 mb-6 mr-5'>
        {<Icon className={'transition-all'} fill={isSelected ? `#fff` : `#4373F0`} />}
      </div>
      <div className={classNames(isSelected ? 'text-white' : 'text-[#353331]', 'font-bold transition-all')}>
        {text}
      </div>
    </button>
  )
}

export default DzStyleButton
