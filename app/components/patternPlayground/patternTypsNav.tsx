import { classNames } from '@App/utils/appUtils'
import React from 'react'
import PPFullBlock from '../svgs/patternPlayground/fullblock'
import PPHalfBlockSvg from '../svgs/patternPlayground/halfBlockSvg'
import PPHalfBrickSvg from '../svgs/patternPlayground/halfBrick'
import DzRange from './ppControls/dzRange'
import DzReactRange from './ppControls/dzReactRange'
import DzStyleButton from './ppControls/dzStyleButton'
import usePatternPlayground from './usePatternProvider'


function PatternNav() {
  const { state: { patternType, backgroundImage }, setPatternType } = usePatternPlayground()
  return (
    <>
      <div className='fixed bottom-0 left-0 w-full h-[var(--pp-nav)] bg-white z-10 flex flex-row p-4 justify-center'>

        <div className={classNames(backgroundImage ? 'opacitiy-100' : 'opacity-0', 'transition-all ease-in-out duration-600 overflow-hidden flex-1 controls max-w-[600px] w-full flex flex-col gap-y-2')}>

          {/* RANGE SLIDER */}
          <div className='flex flex-row gap-x-2'>
            <DzReactRange rtl={false} />
          </div>

          {/* BUTTONS */}
          <div className='flex flex-row gap-2'>
            <DzStyleButton
              text='Full Drop'
              patternType={0}
              setPatternType={setPatternType}
              isSelected={patternType === 0}
              Icon={PPFullBlock}
            />
            <DzStyleButton
              text='Half Drop'
              patternType={1}
              setPatternType={setPatternType}
              isSelected={patternType === 1}
              Icon={PPHalfBlockSvg}
            />
            <DzStyleButton
              text='Half Brick'
              patternType={2}
              setPatternType={setPatternType}
              isSelected={patternType === 2}
              Icon={PPHalfBrickSvg}
            />
          </div>

        </div>
      </div>

    </>
  )
}

export default PatternNav

const variants = {
  enter: {
    width: 'auto',
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 30,
      duration: .2
    }
  },
  initial: {
    width: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30
    }
  },
  exit: {
    width: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30
    }
  }
}