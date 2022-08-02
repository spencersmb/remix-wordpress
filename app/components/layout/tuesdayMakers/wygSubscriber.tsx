import LazyImgix from '@App/components/images/lazyImgix'
import ArrowLrgSvg from '@App/components/svgs/arrowLrgSvg'
import { BreakpointEnums } from '@App/enums/breakpointEnums'
import useSite from '@App/hooks/useSite'
import { classNames } from '@App/utils/appUtils'
import React from 'react'

interface Props { }

const items = [
  {
    title: 'New Emails every week',
    description: 'Receive something new in your inbox every Tuesday to push your digital skills further - from free fonts, to brushes, tutorials, textures and more!'
  },
  {
    title: 'New Emails every week',
    description: 'Receive something new in your inbox every Tuesday to push your digital skills further - from free fonts, to brushes, tutorials, textures and more!'
  },
  {
    title: 'New Emails every week',
    description: 'Receive something new in your inbox every Tuesday to push your digital skills further - from free fonts, to brushes, tutorials, textures and more!'
  },
  {
    title: 'New Emails every week',
    description: 'Receive something new in your inbox every Tuesday to push your digital skills further - from free fonts, to brushes, tutorials, textures and more!'
  },
  {
    title: 'New Emails every week',
    description: 'Receive something new in your inbox every Tuesday to push your digital skills further - from free fonts, to brushes, tutorials, textures and more!'
  }
]
const collage1Url = `https://et-website.imgix.net/et-website/images/photo-collage-1_1-min.png`
const collage1 = {
  width: 2400,
  height: 2362,
  alt: `Every Tuesday IPad Art`,
  src: `${collage1Url}?auto=format&w=900&fit=clip`,
  placeholder: 'https://et-website.imgix.net/et-website/images/photo-collage-1_1-min.png?auto=format&w=20&fit=clip'
}
const collage2Url = `https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png`
const collage2 = {
  width: 2600,
  height: 2167,
  alt: `Every Tuesday IPad Art`,
  src: `${collage2Url}?auto=format&w=900&fit=clip`,
  placeholder: 'https://et-website.imgix.net/et-website/images/photo-collage-2_1-min.png?auto=format&w=20&fit=clip'
}
function WygSubscriber(props: Props) {
  const { state: { breakpoint } } = useSite()

  return (
    <div className='my-10 laptop:my-20 et-grid-basic'>

      {/* PHOTO COLLAGE TOP */}
      {breakpoint !== BreakpointEnums.mobile &&
        <div className='relative row-span-4 row-start-1 col-span-full tablet:col-start-8 tablet:col-end-full tablet:min-h-[580px] laptop:min-h-0'>
          <div className='max-w-[560px] w-[900px] absolute tablet:top-0 laptop:top-0 left-0 laptop:max-w-[730px] desktop:top-[-100px]'>
            <LazyImgix
              id={"collage-1"}
              sizes="(max-width: 400px) 150px, 300px, (max-width: 600px) 50vw, (max-width: 900px) 33vw, 900px"
              srcSet={
                `${collage1.src} 400w,
              ${collage1Url}?auto=format&w=1800&fit=clip 900w,
              `
              }
              image={collage1} />
          </div>
        </div>
      }

      <h3 className='col-span-2 col-start-2 mb-8 text-4xl font-sentinel__SemiBoldItal tablet:col-start-2 tablet:col-span-6 laptop:text-5xl desktop:col-start-3 desktop:col-span-5 laptop:mb-16'>
        What you get as a subscriber
      </h3>

      {items.map((item, index) => (
        <WygSubscribeItem key={index} {...{
          ...item,
          index
        }} />
      ))}

      {/* PHOTO COLLAGE BOTTOM */}
      {breakpoint !== BreakpointEnums.mobile &&
        <div className='relative col-span-6 col-start-8 row-span-2 row-start-5 z-2'>
          <div className='w-[900px] max-w-[460px] absolute tablet:top-[-20px] left-[-570px] laptop:top-[20px] laptop:max-w-[570px] desktop:max-w-[615px] desktop:top-0 desktop:left-[-710px] z-2'>
            <div className='absolute tablet:w-[128px] tablet:top-[-30px] laptop:w-[168px] laptop:top-0 tablet:right-0 z-1'>
              <ArrowLrgSvg />
            </div>
            <LazyImgix
              id={"collage-1"}
              sizes="(max-width: 400px) 150px, 300px, (max-width: 600px) 50vw, (max-width: 900px) 33vw, 900px"
              srcSet={
                `${collage2.src} 400w,
              ${collage2Url}?auto=format&w=1400&fit=clip 900w,
              `
              }
              image={collage2} />
          </div>
        </div>
      }
    </div>
  )
}

export default WygSubscriber

interface itemProps {
  title: string
  index: number
  description: string
}
const WygSubscribeItem = (item: itemProps) => {

  const first3Items = item.index < 3
    ? 'tablet:col-start-2 tablet:col-span-6 desktop:col-start-3 desktop:col-span-5'
    : 'tablet:col-start-8 tablet:col-span-6 desktop:col-start-8 desktop:col-span-5'

  const checkCssRows = (index: number) => {
    switch (index) {
      case 0:
      case 1:
      case 2:
        return ''
      case 3:
        return 'tablet:row-start-5'
      case 4:
        return 'tablet:row-start-6'
    }
  }

  const cssMargins = (index: number) => {
    switch (index) {
      case 0:
      case 1:
        return 'laptop:ml-6'
      case 2:
        return 'tablet:mb-16 laptop:ml-6 laptop:mb-6 '
      case 3:
        return 'laptop:mr-6'
      case 4:
        return 'laptop:mr-6'
    }
  }

  const containerCss = `
    col-start-2 col-span-2 tablet:mx-4 ${first3Items}
    ${checkCssRows(item.index)} ${cssMargins(item.index)}
  `

  return (
    <div className={classNames('flex flex-row mb-6', containerCss)}>
      <div className='mr-2 text-3xl italic laptop:mr-5'>
        0{item.index + 1}
      </div>
      <div>
        <h4 className='text-xl font-sentinel__SemiBoldItal laptop:text-2xl laptop:mb-4 desktop:text-[28px]'>{item.title}</h4>
        <p className='laptop:text-xl'>{item.description}</p>
      </div>
    </div>
  )
}