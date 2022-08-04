import React from 'react'

interface Props {
  text: string
}

/**
 * 
 * @function AccentHeaderText 
 * @tested 8/4/2022 
 */
function AccentHeaderText(props: Props) {
  const { text } = props

  return (
    <div className='absolute font-sans text-[33px] italic top-[-30px] left-[-15px] rotate-[-15deg]'>
      {text}
    </div>
  )
}

export default AccentHeaderText
