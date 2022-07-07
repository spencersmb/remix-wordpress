import { staticImages } from '@App/lib/imgix/data'
import React from 'react'
import LazyImgix from '../images/lazyImgix'

interface Props { }

/**
 * 
 * @component LFM: MadeBy
 * 
 * @tested: 7/6/2022
 */
function MadeBy(props: Props) {

  return (
    <div className='py-10 lfmmc-about__container et-grid-basic tablet:py-20'>
      <div className='col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12'>
        <div className='lfmmc-about flex flex-col items-center mx-auto py-8 tablet:max-w-[913px] tablet:flex-row-reverse'>

          {/* RIGHT */}
          <div className="flex-1 w-full lfmmc-about__right bg-lfm-pink-200">
            <div className="lfmmc-about__img min-h-[575px] pt-12 pb-8 px-5 relative laptop:max-w-[410px]">
              <div className='relative z-2'>
                <LazyImgix
                  id={'madeByBrushes'}
                  image={{
                    width: staticImages.assets.brushes.fan.width,
                    height: staticImages.assets.brushes.fan.height,
                    alt: 'Paint brushes by Teela from Every-Tuesday',
                    src: staticImages.assets.brushes.fan.src,
                    placeholder: staticImages.assets.brushes.fan.placeholder,
                  }}
                />
              </div>
              <div className='watercolor z-1 absolute top-[-69px] left-[-140px] w-[390px]'>
                <LazyImgix
                  id={'madeByOrangeTexture'}
                  image={{
                    width: 800,
                    height: 819,
                    alt: 'Every-Tuesday watercolor texture orange',
                    src: staticImages.textures.orangeWatercolor03.src,
                    placeholder: staticImages.textures.orangeWatercolor03.placeholder,
                  }}
                />
              </div>
            </div>
          </div>

          {/* LEFT */}
          <div className="flex-1 mx-5 lfmmc-about__left tablet:mx-11 laptop:ml-0">
            <div className="lfmmc-about__headline">
              <LazyImgix
                id={'madeByTitle'}
                blur={false}
                image={{
                  width: 457,
                  height: 394,
                  alt: 'Made by Designers for Designers',
                  src: 'https://s3.amazonaws.com/et-courses/lfm/bydesingerfordesigners.png',
                }}
              />
            </div>
            <p
              data-testid='madeByText'
              className='max-w-[625px] text-lg'>
              There are helpful tutorials online for font making, but a lot of them use language that can get confusing fast. We're speaking the same language here: no confusion, and as straightforward as possible. From one lettering artist to another.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MadeBy
