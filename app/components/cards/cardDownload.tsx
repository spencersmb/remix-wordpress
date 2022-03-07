import React from 'react'
import useSite from '~/hooks/useSite'
import { defaultImages, ImageSizeEnums, loadImageSrc } from '~/utils/imageHelpers'
import LazyImageBase from '../images/lazyImage-base'
import LicenseAgreementPopUp from '../modals/paidProductPopUp'
import UploadSvg from '../svgs/uploadSvg'

interface Props {
  title: string
  buttonText: string
  freebie: IResourceFreebie
  featuredImage: IFeaturedImage | null
}

function CardDownload(props: Props) {
  const { featuredImage, title, buttonText, freebie } = props
  const image = loadImageSrc({
    imageSizeName: ImageSizeEnums.MEDIUM, // image name to try and get
    imageObject: featuredImage, // the featured image object
    fallbackSize: ImageSizeEnums.WPRP, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })

  const { openModal, closeModal } = useSite()
  function popUpDownload() {
    openModal({
      template: <LicenseAgreementPopUp
        closeModal={closeModal}
        download_link={freebie.downloadLink}
        product={freebie.product} />
    })
  }

  function normalDownload() {
    window.open(freebie.downloadLink);
  }

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (freebie.licenseRequired) {
      popUpDownload()
      return
    }
    normalDownload()
  }

  return (
    <div className='p-5 bg-white rounded-2.5xl shadow-md w-full max-w-[547px] mx-auto desktop:max-w-[652px]'>
      <div className='rounded-xl overflow-hidden'>
        <LazyImageBase id={'tuesdayMakersFeaturedImage'} image={image} />
      </div>
      <div className='pt-5 pr-[12%] laptop:pr-[20%] desktop:pr-0 desktop:flex desktop:flex-row desktop:justify-between desktop:items-center'>
        <div>
          <div className='text-sm text-success-700 mb-1'>
            Latest Download
          </div>
          <div className='font-medium text-xl text-success-700 leading-7'>
            {title}
          </div>
        </div>
        <div className='desktop:hidden'>
          <button
            className='rounded-[13px] font-medium flex flex-row flex-none justify-center items-center mt-4'
            onClick={handleButtonClick}>
            <span className='uppercase text-success-500 font-bold'>{buttonText}</span>
          </button>
        </div>
        <div className='hidden desktop:flex'>
          <button onClick={handleButtonClick} className='bg-success-50 text-success-500 rounded-xl flex justify-center items-center p-3 scale-100 duration-200 ease-in-out active:bg-success-200 active:text-success-600 active:scale-[.8] transform transition-all'>
            <span className='w-[35px]'>
              <UploadSvg stroke={'currentColor'} />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardDownload
