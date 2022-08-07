import IpadLongShadow from '@App/components/images/ipadLongShadow'
import React from 'react'

interface Props {
  children?: React.ReactNode
}
/**
 * 
 * @function IpadHeader1 
 * @tested 08/04/2022 
 */
function IpadHeader1(props: Props) {
  const { children } = props
  const iPadArt = {
    width: 1400,
    height: 1049,
    alt: `Every Tuesday IPad Art`,
    src: 'https://et-teachable.imgix.net/procreate601/class-projects.jpg',
    placeholder: 'https://et-teachable.imgix.net/procreate601/class-projects.jpg?auto=format&w=20&fit=clip'
  }
  return (
    <>
      {/* IPAD WRAPPER */}

      {/* <div className='overflow-hidden absolute top-[-2.85%] left-[-2.65%] scale-[.81] z-3 w-full rounded-lg tablet:rounded-xl laptop:rounded-2xl desktop:rounded-3xl'></div> */}
      <div className='absolute max-w-[340px] w-full m-auto top-[-250px] left-[54%] -translate-x-1/2 tablet:top-[-510px] tablet:max-w-[713px] laptop:max-w-[707px] desktop:top-[-290%] desktop:max-w-[1180px]'>
        <IpadLongShadow
          visibleByDefault={true}
          image={iPadArt} />
      </div>

      {/* HEADER TITLE */}
      <div className='flex flex-col mt-0 mb-5 tablet:mb-4 tablet:flex-row tablet:max-w-[800px] tablet:mx-auto laptop:max-w-[1060px] desktop:items-center'>
        <h1 style={{ color: '#404764' }} className='relative flex mb-3 text-4xl tablet:text-5xl font-sentinel__SemiBoldItal tablet:mr-4 tablet:flex-1 tablet:text-right laptop:justify-end laptop:text-5xl desktop:text-6xl'>
          <span className='relative z-10'>
            200+ Procreate downloads
          </span>
        </h1>
        <p data-testid='desc' className='relative z-10 text-lg tablet:flex-[1] tablet:ml-4 tablet:mr-6 laptop:flex-[1.25] desktop:flex-[1.4] desktop:text-xl'>
          When you’re part of Tuesday Makers, you’re the first to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!
        </p>
      </div>

      {children}

    </>
  )
}

export default IpadHeader1
