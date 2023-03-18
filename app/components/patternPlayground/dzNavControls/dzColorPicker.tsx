import React, { useEffect, useRef, useState } from 'react'
import { CustomPicker } from 'react-color'
import { Saturation, Hue, Alpha, Checkboard, EditableInput } from 'react-color/lib/components/common'
import type { SaturationProps } from 'react-color/lib/components/common/Saturation'

function DzColorPicker(props: SaturationProps & { hex: string | undefined }) {
  const { color, onChange, hex } = props
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && inputRef.current) {
      // console.log('Enter key was pressed');
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    inputRef.current = document.querySelector('#rc-editable-input-1');
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('keydown', handleKeyDown);

      return () => {
        if (inputElement) {
          inputElement.removeEventListener('keydown', handleKeyDown);
        }
      };
    }
  }, []);

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
        <EditableInput
          style={{
            input: {
              border: 'none',
            },
            label: {
              fontSize: '12px',
              color: '#999',
            },
          }}

          label="hex"
          value={hex}
          onChange={onChange} />
      </div>
    </div>

  )
}

export default CustomPicker(DzColorPicker)

const ChromePointer = () => {
  return (
    <div style={{
      width: '30px',
      height: '30px',
      borderRadius: '24px',
      transform: 'translate(-15px, -15px)',
      backgroundColor: 'transparent',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
      touchAction: 'none',
      border: '2px solid white'
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
