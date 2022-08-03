import React from 'react'
import BackgroundImage from '../images/backgroundImage'

interface Props { }

function DoubleBgImageLayout(props: Props) {
  const { } = props

  return (
    <div className='et-grid-basic grid-rows-[auto_minmax(60px,auto)_1fr_auto] relative'>

      {/* BG1 */}
      <div className='relative col-span-full h-[259px] bg-slate-500 row-start-1 row-span-2 z-0'>
        <BackgroundImage
          placeholder='https://et-website.imgix.net/et-website/images/photo-collage-1_1-min.png?auto=format&w=100&fit=clip'
          source='https://et-website.imgix.net/et-website/images/photo-collage-1_1-min.png?auto=format'
        />

      </div>

      {/* CONTENT */}
      <div className='col-start-2 col-span-2 h-[600px] bg-white row-start-2 row-span-2 z-1 relative'>

      </div>

      {/* BG2 */}
      <div className='row-start-3 col-span-full bg-red-300 h-[600px] z-0 relative'>

      </div>

    </div>
  )
}

export default DoubleBgImageLayout
