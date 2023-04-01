import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import usePatternPlayground from '../usePatternProvider';
import DzBlendModeBtn from './dzBlendModeBtn';
import type { ColorResult } from 'react-color';
import DzColorPicker from './dzColorPicker';

interface Props { }
const blendModesList = [
  {
    name: 'Color',
    value: 'color',
  },
  {
    name: 'Color Dodge',
    value: 'color-dodge',
  },
  {
    name: 'Difference',
    value: 'difference',
  },
  {
    name: 'Hue',
    value: 'hue',
  },
  {
    name: 'Luminosity',
    value: 'luminosity',
  },
  {
    name: 'Lighten',
    value: 'lighten',
  },
  {
    name: 'Multiply',
    value: 'multiply',
  },
  {
    name: 'Overlay',
    value: 'overlay',
  },
  {
    name: 'Saturation',
    value: 'saturation',
  },
  {
    name: 'Screen',
    value: 'screen',
  },
  {
    name: 'Soft Light',
    value: 'soft-light',
  },
]

function DzBlendModeMenu(props: Props) {
  const { toggleBlendModeMenu, changeBlendMode, resetBlendMode, changeColor, state: { blendMode } } = usePatternPlayground()
  const navRef = useRef<HTMLElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  // Close popup when clicking outside
  const handleOutsideClick = (event: MouseEvent) => {

    if (navRef.current && !navRef.current.contains(event.target as Node) && menuRef.current && !menuRef.current.contains(event.target as Node)) {
      toggleBlendModeMenu();
    }

  };

  // Add event listener on component mount
  useEffect(() => {
    navRef.current = document.getElementById('pp-nav')
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  function handleColorChange(color: ColorResult) {
    changeColor(color)
  }

  return (
    <motion.div
      data-testid="blendModeMenu"
      key={'dzBlendModeMenu'}
      initial={{
        opacity: 1,
        y: '0%',
        x: '-50%',
      }}
      animate={{
        opacity: 1,
        y: '-110%',
        x: '-50%',
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 23,
          duration: 0.1,
        }
      }}
      exit={{
        opacity: 1,
        y: '0%',
        x: '-50%',
        transition: {
          duration: 0.1,
          type: "spring",
          stiffness: 260,
          damping: 30,
        }
      }} ref={menuRef} className='absolute left-[50%] min-w-[600px] bg-white opacity-50 z-1 rounded-2xl shadow-2xl overflow-hidden p-5'>
      <div className='flex flex-row'>

        <div className='flex-1'>
          <DzColorPicker color={blendMode.color?.rgb} hex={blendMode.color?.hex} onChange={handleColorChange} />
        </div>

        <div className='flex flex-wrap flex-1 gap-2 blendModes w-[250px] ml-4'>
          {blendModesList.map((blendModeItem, index) => (<DzBlendModeBtn isSelected={blendMode.type?.value === blendModeItem.value} handleClick={changeBlendMode} key={index} mode={blendModeItem} />))}

          <DzBlendModeBtn
            isSelected={false}
            handleClick={resetBlendMode}
            mode={{
              name: 'Reset',
              value: 'reset'
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default DzBlendModeMenu
