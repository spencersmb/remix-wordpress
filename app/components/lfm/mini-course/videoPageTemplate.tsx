import ProductCardMini from '@App/components/cards/productCardMini'
import LazyImgix from '@App/components/images/lazyImgix'
import useSite from '@App/hooks/useSite'
import { staticImages } from '@App/lib/imgix/data'
import { breakpointConvertPX } from '@App/utils/appUtils'
import React from 'react'

interface Props {
  children?: React.ReactNode
  video: MiniCoureVideoItem
  products?: IProduct[]
}

//TODO: Test this
function VideoPageTemplate(props: Props) {
  const { video, children, products } = props

  const { state: { breakpoint } } = useSite()

  return (
    <div className='et-grid-basic'>

      <div className='col-span-2 col-start-2 mb-12 tablet:col-start-2 tablet:col-span-12 tablet:px-5 laptop:col-start-3 laptop:col-span-10 laptop:px-5 desktop:col-start-4 desktop:col-span-8'>

        {/* VIDEO */}
        <div className="relative w-full mb-8 content">
          <div className="embed-responsive-16by9 relative pb-[56.25%] h-0 block mx-auto text-center z-2">
            <div className="wistia_responsive_padding">
              <div className="wistia_responsive_wrapper"
                style={{ height: '100%', left: '0', position: 'absolute', top: '0', width: '100%' }}>
                <div className={`wistia_embed wistia_async_${video.videoId} videoFoam=true`} style={{ height: ' 100%', width: ' 100%' }}>
                  &nbsp;
                </div>
              </div>
            </div>
          </div>


          {
            breakpointConvertPX(breakpoint) >= 1200 && <>
              {/* Alphabet Img */}
              <div className="absolute top-[-50px] left-[-300px] max-w-[850px] w-full h-full z-1">
                <LazyImgix
                  id={'alphabet'}
                  image={{
                    width: staticImages.lettering.alphabet.width,
                    height: staticImages.lettering.alphabet.height,
                    alt: 'Learn Font Making Free Mini Course Alphabet Sketch',
                    src: staticImages.lettering.alphabet.src,
                    placeholder: staticImages.lettering.alphabet.placeholder
                  }} />
              </div>

              <div className="absolute top-[50px] left-[300px] max-w-[850px] w-full h-full z-1 desktopXl:top-[100px]">
                <LazyImgix
                  id={'alphabet'}
                  image={{
                    width: staticImages.lettering.alphabet.width,
                    height: staticImages.lettering.alphabet.height,
                    alt: '',
                    src: staticImages.lettering.alphabet.src,
                    placeholder: staticImages.lettering.alphabet.placeholder
                  }} />
              </div>
            </>
          }

        </div>

        {/* TITLE */}
        <div className='mb-4 text-3xl font-sentinel__SemiBoldItal'>
          {video.title}
        </div>

        {/* DESCRIPTION */}
        <p className='text-lg tablet:text-xl'>
          {video.description}
        </p>

        {children}
      </div>

      {/* PRODUCTS Divider */}
      <div className='col-span-full bg-lfm-pink-200 et-grid-basic'>

        <div className='col-span-2 col-start-2 py-10 tablet:py-16 tablet:col-start-2 tablet:col-span-12 tablet:px-5 laptop:px-0 laptop:col-start-3 laptop:col-span-10 desktop:col-start-2 desktop:col-span-12'>
          <div className='mb-8 text-3xl text-center font-sentinel__SemiBoldItal'>
            Popular Lettering Brushes
          </div>
          {/* PRODUCTS */}
          <div className='grid grid-cols-1 tablet:grid-cols-2 tablet:gap-6 desktop:grid-cols-4'>
            {products && products.map((product, index) => {
              return (
                <ProductCardMini
                  key={index}
                  index={index}
                  product={product} />
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}

export default VideoPageTemplate
