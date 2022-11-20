import { createImgixSizes, imgixServerRoot } from '@App/utils/imageHelpers'
import { Link } from '@remix-run/react'
import React from 'react'
import IpadDevice from '../images/ipadDevice'
import AccentHeaderText from '../layout/accentHeaderText'

/**
 * @function ProcreateBrushes
 * @description - Used on the Homepage as the Featured Procreate Brush section
 * @tested - Snapshot 11/19/2022
 */
function ProcreateBrushes() {

  const iPadImage = createImgixSizes({
    compress: true,
    height: 1049,
    width: 1400,
    alt: "Every Tuesday Makers Library",
    mobileSize: 400,
    src: `${imgixServerRoot.images}/ipad-align.jpg`
  })

  return (
    <section className='et-grid-basic overflow-hidden tablet:grid-row-[auto_auto]'>

      {/* IMAGE 1 */}
      <div className='relative col-span-2 col-start-2 h-[350px] mt-8 tablet:col-start-2 tablet:col-span-8 tablet:row-start-2 tablet:h-[200px] laptop:mt-16 desktop:h-[350px] desktopXl:col-start-2 desktopXl:col-span-7 desktopXl:mr-16'>
        <div className='absolute top-0 left-0 tablet:left-auto tablet:right-0 w-[530px] desktop:w-[882px] desktopXl:w-[1002px]'>
          <IpadDevice id={'ipadArt'} ipadArt={iPadImage} />
        </div>
      </div>

      {/* IMAGE 2 */}
      <div className='hidden relative col-span-2 col-start-2 h-[350px] mt-8 tablet:col-start-10 tablet:col-span-4 tablet:row-start-2 tablet:h-[200px] tablet:block laptop:mt-16 desktop:h-[350px] desktopXl:col-start-8 desktopXl:col-span-4 desktopXl:ml-16'>
        <div className='absolute top-0 left-0 w-[530px] desktop:w-[882px] desktopXl:w-[1002px]'>
          <IpadDevice id={'ipadArt'} ipadArt={iPadImage} />
        </div>
      </div>

      {/* IMAGE 3 */}
      <div className='hidden relative col-span-2 col-start-2 h-[350px] tablet:col-start-9 tablet:col-span-5 tablet:row-start-1 tablet:h-[400px] tablet:block'>
        <div className='absolute top-[-40px] left-[-110px] w-[580px] rotate-90 scale-y-[-1] desktop:w-[882px] desktop:top-[-225px] desktopXl:w-[1002px] desktopXl:top-[-305px]'>
          <IpadDevice id={'ipadArt'} ipadArt={iPadImage} />
        </div>
      </div>

      {/* CONTENT */}
      <div className='flex flex-col items-start col-span-2 col-start-2 py-16 tablet:row-start-1 tablet:col-start-3 tablet:col-span-6 tablet:mt-32 tablet:pb-8 desktop:col-start-3 desktop:col-span-5'>
        <h3 className='relative mt-8 mb-8 text-4xl font-sentinel__SemiBoldItal desktop:text-6xl'>
          <AccentHeaderText text={'Brand New!'} cssOverride={'left-[-22px] tablet:!top-[-59px] text-4xl tablet:left-[-52px]'} />
          Make inspiring art using custom procreate brushses!
        </h3>
        <Link
          className='btn btn-primary btn-xl'
          to={'/products'}
          prefetch={'intent'}>
          View my brushes
        </Link>
      </div>

    </section>
  )
}

export default ProcreateBrushes
