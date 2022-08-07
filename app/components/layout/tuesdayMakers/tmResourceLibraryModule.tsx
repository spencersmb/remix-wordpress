import TextImageTall from '../textImageTall'

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

/**
 * 
 * @function TmResourceLibraryModule 
 * @tested 08/04/2022 
 */
function TmResourceLibraryModule(props: Props) {

  return (
    <div className='my-10 laptop:my-20 desktop:my-32 et-grid-basic'>
      <div className='col-span-2 col-start-2 mb-16 tablet:col-start-3 tablet:col-span-10 tablet:text-center desktop:col-start-4 desktop:col-span-8 desktop:mb-24 desktopXl:col-start-4 desktopXl:col-span-8 desktop:max-w-[837px] desktop:mx-auto'>
        <h3 className='mb-4 text-4xl font-sentinel__SemiBoldItal laptop:text-5xl'>
          The Resource Library
        </h3>
        <p data-testid="description" className='text-lg laptop:text-xl'>
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


