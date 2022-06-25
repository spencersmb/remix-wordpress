import React from 'react'

interface Props {
  children: React.ReactNode
}

/**
 * 
 * @component Header1 
 * @description Header that has text on the right half, and a large absolute image on the left half.
 * 
 */
// TODO:ADD TEST
function Header1(props: Props) {
  const { children } = props

  return (
    <div className='flex flex-col px-6 tablet:flex-row-reverse laptop:flex-row'>
      {/* IMAGE CONTAINER */}
      <div className='flex-1 tablet:flex-[0_1_40%] laptop:flex-[0_1_50%]'>

      </div>

      {/* TEXT CONTAINER */}
      <div className='flex-1 tablet:flex-[0_1_60%] laptop:flex-[0_1_50%]'>
        {children && children}
      </div>
    </div>
  )
}

export default Header1
