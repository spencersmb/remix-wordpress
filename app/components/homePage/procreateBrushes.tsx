import { createImgixSizes, imgixServerRoot } from '@App/utils/imageHelpers'
import { Link } from '@remix-run/react'
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
  const iPadWidth = {
    laptop: 'desktop:w-[772px]',
    desktop: 'desktopXl:w-[882px]',
  }

  return (
    <section
      style={{ backgroundImage: `url(${imgixServerRoot.images}/flower-pattern-01.jpg)` }}
      className='et-grid-basic bg-repeat overflow-hidden tablet:grid-row-[auto_auto] py-20'>

      {/* IMAGE 1 */}
      <div className='image-1 relative col-span-2 col-start-2 h-[350px] tablet:col-start-2 tablet:mt-8 tablet:col-span-8 tablet:row-start-2 tablet:h-[200px] laptop:mt-0 desktop:h-[410px] desktop:col-start-5 desktop:col-span-7 desktop:mr-16'>
        <div className={`absolute top-0 left-0 tablet:left-auto tablet:right-0 w-[530px] ${iPadWidth.laptop} ${iPadWidth.desktop}`}>
          <IpadDevice id={'ipadArt'} ipadArt={iPadImage} />
        </div>
      </div>

      {/* IMAGE 2 */}
      <div className='image-2 hidden relative col-span-2 col-start-2 h-[350px] mt-8 tablet:col-start-10 tablet:col-span-4 tablet:row-start-2 tablet:h-[200px] tablet:block laptop:mt-0 desktop:col-start-11 desktop:col-span-4 desktop:h-[410px] desktopXl:ml-16'>
        <div className={`absolute top-0 left-0 w-[530px] ${iPadWidth.laptop} ${iPadWidth.desktop}`}>
          <IpadDevice id={'ipadArt'} ipadArt={iPadImage} />
        </div>
      </div>

      {/* IMAGE 3 */}
      <div className='image-3 hidden relative col-span-2 col-start-2 h-[350px] tablet:col-start-9 tablet:col-span-5 tablet:row-start-1 tablet:h-[400px] tablet:block'>
        <div className={`absolute top-[-40px] left-[-110px] w-[530px] rotate-90 scale-y-[-1] tablet:left-0 ${iPadWidth.laptop} tablet:top-5 desktop:top-[-20px] desktop:left-[-120px] ${iPadWidth.desktop} desktopXl:top-[-135px]`}>
          <IpadDevice id={'ipadArt'} ipadArt={iPadImage} />
        </div>
      </div>

      {/* CONTENT */}
      <div className='flex flex-col items-start col-span-2 col-start-2 px-8 py-8 mt-16 tablet:row-start-1 tablet:col-start-3 tablet:col-span-6 tablet:my-[78px] tablet:pb-8 laptop:mt-36 desktop:mb-32 desktop:px-16 desktop:pb-16 desktop:col-start-2 desktop:col-span-6 desktop:max-w-[725px] bg-white'>
        <h3 className='relative mb-8 text-3xl font-sentinel__SemiBoldItal tablet:text-4xl laptop:text-[2.75rem] laptop:leading-[3rem] desktop:text-6xl'>
          <AccentHeaderText text={'Brand New!'} cssOverride={'left-[-22px] tablet:!top-[-59px] text-4xl tablet:left-[-52px] text-[#FF551F]'} />
          Make inspiring art using custom procreate brushses!
        </h3>
        <Link
          className='btn btn-primary btn-xl btn-primary-ring'
          to={'/products'}
          prefetch={'intent'}>
          View my brushes
        </Link>
      </div>

    </section>
  )
}

export default ProcreateBrushes
