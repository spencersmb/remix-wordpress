import React from 'react'
import LazyImageBase from '@App/components/images/lazyImage-base'
import ProcreateMenu4Svg from '@App/components/svgs/procreateMenu/procreateMenuFourSvg'
import ProcreateMenu2 from '@App/components/svgs/procreateMenu/procreateMenuTwoSvg'
import ProcreateMenu1 from './procreateMenu1'
import ProcreateMenu3 from './procreateMenu3'
import ProcreateTitleCard from './procreateTitleCard'

interface Props { }

function ProcreateMenuLayout(props: Props) {

  const colorPickerImg: IMediaDetailSize = {
    width: '236',
    height: '236',
    altTitle: 'Procreate Menu Color Picker',
    placeholder: '/images/procreate-menu-color-picker.png',
    sizes: '',
    sourceUrl: '/images/procreate-menu-color-picker.png',
    srcSet: '',
  }

  return (
    <>
      <div className='absolute top-[30px] tablet:top-[90px] right-[-100px] desktop:right-[-187px] '>
        <ProcreateMenu1 />
      </div>

      <div className='relative z-10 tablet:z-20 '>
        <ProcreateTitleCard />
      </div>

      <div className='absolute top-[170px] w-full max-w-[110px] right-[-60px] tablet:max-w-[180px] tablet:top-[280px] desktop:right-[-220px] '>
        <ProcreateMenu2 />
      </div>

      <div className='hidden absolute z-10 top-[320px] left-[-50px] tablet:block laptop:left-[-107px] laptop:top-[220px] laptop:z-0 desktop:left-[-150px] desktop:top-[320px]'>

        <ProcreateMenu3 />
      </div>

      <div className='absolute top-[50px] left-[-76px] w-[130px] tablet:w-auto tablet:z-20 tablet:top-[70px] tablet:left-[-130px] laptop:top-[-40px] desktop:left-[-200px] desktop:top-[60px] '>
        <div className='absolute top-[64px] left-[50%] translate-x-[-50%] w-full max-w-[90px] tablet:top-[50px] tablet:max-w-[120px] mx-auto opacity-80'>
          <LazyImageBase id={'procreate-menu-color-picker'} image={colorPickerImg} />
        </div>
        <ProcreateMenu4Svg />
      </div>
    </>
  )
}

export default ProcreateMenuLayout
