import React from 'react'
import { CustomPicker } from 'react-color'
import { Saturation, Hue, Alpha, Checkboard } from 'react-color/lib/components/common'
import type { SaturationProps } from 'react-color/lib/components/common/Saturation'

function DzColorPicker(props: SaturationProps) {
  const { color, onChange } = props

  return (
    <div className='relative flex flex-col w-full h-full'>
      <div
        style={{
          touchAction: 'none'
        }}
        className='relative w-full pb-[100%]'>
        <Saturation
          {...props}
          color={color}
          //@ts-ignore
          pointer={ChromePointer}
          onChange={onChange} />
      </div>
      <div className='relative w-full h-[20px] mt-3'>
        <Hue
          {...props}
          //@ts-ignore
          pointer={HSLPointer}
          onChange={onChange}
          direction={'horizontal'} />
      </div>
      <div className='relative w-full h-[20px] mt-3'>
        {/* <Alpha
          {...props}
          //@ts-ignore
          pointer={HSLPointer}
          onChange={onChange}
          direction={'horizontal'} /> */}
      </div>
    </div>

  )
}

export default CustomPicker(DzColorPicker)

const ChromePointer = () => {
  return (
    <div style={{
      width: '24px',
      height: '24px',
      borderRadius: '24px',
      transform: 'translate(-12px, -12px)',
      backgroundColor: 'rgb(248, 248, 248)',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
      touchAction: 'none'
    }} />
  )
}

const HSLPointer = () => {
  return (
    <div style={{
      width: '24px',
      height: '24px',
      borderRadius: '24px',
      transform: 'translate(-12px, -2px)',
      backgroundColor: 'rgb(248, 248, 248)',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
      touchAction: 'none'
    }} />
  )
}
