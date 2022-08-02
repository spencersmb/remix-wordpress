import LazyImgix from '@App/components/images/lazyImgix'
import { classNames } from '@App/utils/appUtils'
import React from 'react'

interface Props { }
const rl1Url = 'https://et-website.imgix.net/et-website/images/tuesday-makers/tm-rl-1_1.jpg'
const rl1 = {
  width: 1600,
  height: 2030,
  alt: `Tuesday Makers Library Preview 1`,
  src: `${rl1Url}?auto=format&w=900&fit=clip`,
  placeholder: `${rl1Url}?auto=format&w=20&fit=clip`
}
const items = [
  {
    id: 'tm-rl',
    title: 'Free Procreate Brushes',
    description: 'Download several lettering, illustraion and painting brushes!',
    img: {
      obj: rl1,
      url: rl1Url
    }
  },
  {
    id: 'tm-rl',
    title: '100+ Color Swatches',
    description: 'Download several lettering, illustraion and painting brushes!',
    img: {
      obj: rl1,
      url: rl1Url
    }
  },
  {
    id: 'tm-rl',
    title: 'Free Fonts & Lettering Guides',
    description: 'Download several lettering, illustraion and painting brushes!',
    img: {
      obj: rl1,
      url: rl1Url
    }
  }
]

function TmResourceLibraryModule(props: Props) {

  return (
    <div className='my-10 laptop:my-20 desktop:my-32 et-grid-basic'>
      <div className='col-span-2 col-start-2 mb-16 tablet:col-start-3 tablet:col-span-10 tablet:text-center desktop:col-start-4 desktop:col-span-8 desktop:mb-24 desktopXl:col-start-4 desktopXl:col-span-8 desktop:max-w-[837px] desktop:mx-auto'>
        <div className='mb-4 text-4xl font-sentinel__SemiBoldItal laptop:text-5xl'>
          The Resource Library
        </div>
        <p className='text-lg laptop:text-xl'>
          When you become a Tuesday Maker, you’re the first to nab special deals on courses + brush sets *and* you get instant access to our Resource Library, stocked with hundreds of Procreate brushes, color palettes, textures, fonts and more!
        </p>
      </div>

      <div className='grid grid-cols-1 col-span-2 col-start-2 tablet:grid-cols-3 tablet:col-start-2 tablet:col-span-12 laptop:max-w-[1127px] laptop:mx-auto desktop:max-w-[1157px]'>

        {items.map((item, index) => (
          <TextImageTall
            key={index}
            index={index}
            {...item}
          />
        ))}

      </div>
    </div>
  )
}

export default TmResourceLibraryModule

interface TextImageProps {
  index: number
  img: {
    obj: ImgixImageType
    url: string
  }
  title: string
  description: string
}
const TextImageTall = (props: TextImageProps) => {
  const { index, img, title, description } = props
  return (
    <div className={classNames(index === 1 ? 'tablet:mt-0' : 'tablet:mt-12', 'mb-16 last:mb-0 tablet:mx-4 tablet:mb-0 desktop:mx-7')}>

      {/* IMAGE */}
      <div className='relative'>

        <div className='text-5xl italic absolute top-[-20px] left-[5px] z-1 tablet:text-3xl laptop:text-5xl laptop:left-[15px]'>
          0{index + 1}
        </div>

        <LazyImgix
          id='tm-rl-1'
          image={img.obj}
          sizes="(max-width: 400px) 150px, 300px, (max-width: 600px) 50vw, (max-width: 900px) 33vw, 900px"
          srcSet={`
                ${img.obj.src} 400w,
                ${img.url}?auto=format&w=1400&fit=clip 900w,
              `}
        />
      </div>

      <div className='my-4 text-center tablet:mx-4'>
        <div className='mb-4 text-3xl font-sentinel__SemiBoldItal tablet:text-xl tablet:leading-7 laptop:text-3xl laptop:mx-4'>
          {title}
        </div>
        <p className='text-lg tablet:text-base laptop:text-lg'>
          {description}
        </p>
      </div>

    </div>
  )
}
