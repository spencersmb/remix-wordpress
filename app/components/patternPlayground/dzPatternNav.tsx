import { classNames } from '@App/utils/appUtils'
import { AnimatePresence } from 'framer-motion'
import PPFullBlock from '../svgs/patternPlayground/fullblock'
import PPHalfBlockSvg from '../svgs/patternPlayground/halfBlockSvg'
import PPHalfBrickSvg from '../svgs/patternPlayground/halfBrick'
import DzBlendMode from './dzNavControls/dzBlendMode'
import DzBlendModeMenu from './dzNavControls/dzBlendModeMenu'
import DzReactRange from './dzNavControls/dzReactRange'
import DzStyleButton from './dzNavControls/dzStyleButton'
import usePatternPlayground from './usePatternProvider'


function PatternNav() {
  const { state: { patternType, backgroundImage, blendMode }, setPatternType } = usePatternPlayground()
  return (
    <>
      <div className='fixed bottom-0 left-0 z-10 flex w-full bg-white '>
        <div id={`pp-nav`} className='bg-white relative z-2 p-4 flex justify-center w-full h-[var(--pp-nav)]'>
          <div className={classNames(backgroundImage ? 'opacitiy-100' : 'opacity-0', 'transition-all ease-in-out duration-600 flex-1 controls max-w-[600px] w-full flex flex-col gap-y-2')}>

            {/* RANGE SLIDER */}
            <div className='flex flex-row gap-x-2'>
              <DzBlendMode />
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
        <AnimatePresence>
          {blendMode.isOpen && <DzBlendModeMenu />}
        </AnimatePresence>
      </div>

    </>
  )
}

export default PatternNav
