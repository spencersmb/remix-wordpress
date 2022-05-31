import React from 'react'
import CardTall from '../cards/cardTall'
import BulletLayoutOne from './bulletLayoutOne'

interface Props { }

/**
 * 
 * Old design for the Tuesday Makers Page
 * 
 */

function TuesdayMakersBulletCards(props: Props) {
  const { } = props


  const card_1_image: ImageLookupReturn = {
    altTitle: 'Free Procreate Brushes',
    height: 790,
    width: 791,
    placeholder: '/images/tm-card-1.jpg',
    sizes: '',
    srcSet: '',
    sourceUrl: '/images/tm-card-1.jpg'
  }
  const card_2_image: ImageLookupReturn = {
    altTitle: '100+ Procreate Color Swatches',
    height: 790,
    width: 791,
    placeholder: '/images/tm-card-2.jpg',
    sizes: '',
    srcSet: '',
    sourceUrl: '/images/tm-card-2.jpg'
  }
  const card_3_categories: {
    title: string,
    image: ImageLookupReturn,
    type: string,
    category: string
  }[] = [
      {
        title: 'Corner Bakery',
        image: {
          altTitle: '100+ Procreate Color Swatches',
          height: 790,
          width: 791,
          placeholder: '/images/tm-card-2.jpg',
          sizes: '',
          srcSet: '',
          sourceUrl: '/images/tm-card-2.jpg'
        },
        type: 'Free Font',
        category: 'Fonts',
      },
      {
        title: 'Lettering Guides',
        image: {
          altTitle: 'Lettering Guides',
          height: 790,
          width: 791,
          placeholder: '/images/tm-card-2.jpg',
          sizes: '',
          srcSet: '',
          sourceUrl: '/images/tm-card-2.jpg'
        },
        type: 'Practice Sheets',
        category: 'Hand Lettering',
      },
      {
        title: 'Digital or Printable',
        image: {
          altTitle: 'Digital or Printable',
          height: 790,
          width: 791,
          placeholder: '/images/tm-card-2.jpg',
          sizes: '',
          srcSet: '',
          sourceUrl: '/images/tm-card-2.jpg'
        },
        type: 'Practice Sheets',
        category: 'Hand Lettering',
      }
    ]

  return (
    <div style={{ background: '#F5D6CD' }} className='col-span-full'>

      <div className='grid grid-flow-row row-auto col-span-full grid-cols-mobile gap-x-0 max-w-[1340px] mx-auto px-4 py-12 tablet:grid-cols-12 desktop:grid-cols-3 tablet:gap-x-10 tablet:px-6 tablet:py-14 desktop:py-28 desktop:px-12'>

        <div className='flex flex-col col-span-2 col-start-2 text-4xl text-center font-sentinel__SemiBoldItal mb-7 tablet:col-start-1 tablet:col-span-full desktop:col-start-1 desktop:col-span-3 tablet:text-display-2 tablet:mb-14'>
          <span className='text-primary-500'>Become a member and,</span>
          <span style={{ color: '#404764' }} className=''>get over 200+ free downloads</span>
        </div>

        <div className='col-span-2 col-start-2 mb-8 tablet:col-start-2 tablet:col-end-7 tablet:flex desktop:col-start-auto desktop:col-auto desktop:mb-0'>
          <CardTall
            title='Free Procreate Brushes'
            description='Download several lettering, illustraion and painting brushes!'
            image={card_1_image}
          />
        </div>

        <div className='col-span-2 col-start-2 mb-8 tablet:col-start-7 tablet:col-end-12 tablet:flex desktop:col-start-auto desktop:col-auto desktop:mb-0'>
          <CardTall
            title='100+ Procreate Color Swatches'
            description='Choose from tons of different color combinations to start any project!'
            image={card_2_image}
          />
        </div>

        <div className='col-span-2 col-start-2 tablet:flex tablet:col-start-2 tablet:col-end-12 desktop:col-start-auto desktop:col-auto'>
          <CardTall
            title='Fonts & Lettering'
          >
            <div className='flex flex-col flex-1 mt-2 tablet:mt-6 desktop:mt-2'>
              <div className='flex flex-col tablet:flex-1 laptop:flex-col laptop:items-center'>

                <div className='flex flex-col tablet:justify-center tablet:flex-row desktop:flex-col'>
                  {card_3_categories.map((category, index) => (
                    <BulletLayoutOne key={index} {...category} />
                  ))}
                </div>

                <div className='bg-primary-300 rounded-2.5xl text-center p-4 flex-1 flex flex-col justify-center tablet:items-center'>

                  <div className='text-xl font-semibold leading-6 text-center text-white mb-7 tablet:px-8 tablet:text-3xl laptop:max-w-[500px] laptop:px-0 laptop:mx-0 laptop:text-center desktop:text-xl desktop:text-center desktop:max-w-none'>
                    Get instant access to <span className='italic underline underline-offset-2'>all</span> the Resources for <span className='italic underline underline-offset-2'>free</span>
                  </div>

                  <button className='text-lg btn btn-primary font-sentinel__SemiBoldItal hover:ring-offset-primary-300 focus:ring-offset-primary-300'>
                    Join Today!
                  </button>
                </div>
              </div>
            </div>

          </CardTall>
        </div>

        {/* <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full bg-primary-600 opacity-50 w-[300px] h-[300px] tablet:w-[450px] tablet:h-[450px]">
          circle
        </div> */}

      </div>
    </div>
  )
}

export default TuesdayMakersBulletCards
