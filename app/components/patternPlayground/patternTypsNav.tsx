import React from 'react'
import PPFullBlock from '../svgs/patternPlayground/fullblock'
import PPHalfBlockSvg from '../svgs/patternPlayground/halfBlockSvg'
import PPHalfBrickSvg from '../svgs/patternPlayground/halfBrick'
import DzRange from './ppControls/dzRange'
import DzStyleButton from './ppControls/dzStyleButton'
import usePatternPlayground from './usePatternProvider'


function PatternNav() {
  const { state: { patternType }, setPatternType, saveImage } = usePatternPlayground()
  return (
    <>
      <div className='fixed bottom-0 left-0 w-full h-[185px] bg-white z-10 flex flex-row p-4 justify-center'>
        {/* <div className='min-w-[220px] pr-4'>
          <h3 className='text-xl font-bold'>
            Pattern Types
          </h3>
          <p className='text-sm'>
            Simply drag your image into the browser and test it out!
          </p>
        </div> */}
        <div className="flex-1 controls max-w-[500px] w-full flex flex-col gap-y-2">
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
            {/* <button
              className={patternType === 2 ? 'text-red-700' : 'text-grey-600'}
              onClick={() => setPatternType(1)}
            >
              Half-Drop</button>
            <button
              className={patternType === 2 ? 'text-red-700' : 'text-grey-600'}
              onClick={() => setPatternType(2)}
            >
              Half-Brick</button>
            <button
              className={'text-grey-600'}
              onClick={saveImage}
            >
              Save Image</button> */}
          </div>

          <DzRange />
        </div>
      </div>

    </>
  )
}

export default PatternNav
