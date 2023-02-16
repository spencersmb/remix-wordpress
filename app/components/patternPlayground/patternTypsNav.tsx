import React from 'react'
import usePatternPlayground from './usePatternProvider'


function PatternNav() {
  const { state: { patternType }, setPatternType, saveImage } = usePatternPlayground()
  return (
    <div className='fixed bottom-0 left-0 w-full h-[130px] bg-red-500 z-10'>
      <button
        className={patternType === 0 ? 'text-red-700' : 'text-grey-600'}
        onClick={() => setPatternType(0)}
      >
        Normal</button>
      <button
        className={patternType === 1 ? 'text-red-700' : 'text-grey-600'}
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
        Save Image</button>
    </div>
  )
}

export default PatternNav
