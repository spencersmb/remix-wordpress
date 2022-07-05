import { staticImages } from '@App/lib/imgix/data'
import React from 'react'
import LazyImgix from '../images/lazyImgix'

interface Props { }

function MadeBy(props: Props) {
  const { } = props

  return (
    <div className='py-10 lfmmc-about__container et-grid-basic tablet:py-20'>
      <div className='col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12'>
        <div className='lfmmc-about flex flex-col items-center mx-auto py-8 tablet:max-w-[913px] tablet:flex-row-reverse'>

          {/* RIGHT */}
          <div className="w-full lfmmc-about__right bg-lfm-pink-200">
            <div className="lfmmc-about__img">
              <LazyImgix
                id={''}
                image={{
                  width: staticImages.assets.brushes.fan.width,
                  height: staticImages.assets.brushes.fan.height,
                  alt: 'Paint brushes by Teela from Every-Tuesday',
                  src: staticImages.assets.brushes.fan.src,
                  placeholder: staticImages.assets.brushes.fan.placeholder,
                }}
              />
              <div>
                <LazyImgix
                  id={''}
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
          <div className="mx-5 lfmmc-about__left tablet:mx-11 laptop:ml-0">
            <div className="lfmmc-about__headline">
              <LazyImgix
                id={''}
                blur={false}
                image={{
                  width: 457,
                  height: 394,
                  alt: 'Made by Designers for Designers',
                  src: 'https://s3.amazonaws.com/et-courses/lfm/bydesingerfordesigners.png',
                }}
              />
            </div>
            <p className='max-w-[625px]'>
              There are helpful tutorials online for font making, but a lot of them use language that can get confusing fast. We're speaking the same language here: no confusion, and as straightforward as possible. From one lettering artist to another.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MadeBy
