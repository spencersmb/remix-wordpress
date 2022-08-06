import React from 'react'
import useSite from '@App/hooks/useSite'
import { defaultImages, loadImageSrc } from '@App/utils/imageHelpers'
import LazyImageBase from '../images/lazyImage-base'
import LicenseAgreementPopUp from '../modals/paidProductPopUp'
import UploadSvg from '../svgs/uploadSvg'
import { ImageSizeEnums } from '@App/enums/imageEnums'

interface Props {
  title: string
  buttonText: string
  freebie: IResourceFreebie
  featuredImage: IFeaturedImage | null
}

/**
 * Card Download Component
 * @tested - 5/28/2022
 */
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
    <div
      data-testid="card-download"
      className='p-5 bg-white shadow-xxl-grey w-full max-w-[547px] mx-auto desktop:max-w-[652px]'>
      <div className='overflow-hidden'>
        <LazyImageBase testId='download-image' id={'tuesdayMakersFeaturedImage'} image={image} />
      </div>
      <div className='pt-5 pr-[12%] laptop:pr-[20%] desktop:pr-0 desktop:flex desktop:flex-row desktop:justify-between desktop:items-center'>
        <div>
          <div className='mb-1 text-sm text-success-700'>
            Latest Freebie
          </div>
          <div className='text-xl font-medium leading-7 text-success-700'>
            {title}
          </div>
        </div>
        <div className='desktop:hidden'>
          <button
            data-testid="download-btn"
            className='rounded-[13px] font-medium flex flex-row flex-none justify-center items-center mt-4'
            onClick={handleButtonClick}>
            <span className='font-bold uppercase text-success-500'>{buttonText}</span>
          </button>
        </div>
        <div className='hidden desktop:flex'>
          <button data-testid="download-btn" onClick={handleButtonClick} className='flex flex-row items-center btn btn-sage-600'>
            <span>Download</span>
            <span className='w-[21px] ml-4'>
              <UploadSvg stroke={'currentColor'} />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardDownload
