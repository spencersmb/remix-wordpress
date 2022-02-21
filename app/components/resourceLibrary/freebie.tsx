import React from 'react'
import useSite from '~/hooks/useSite'
import LicenseAgreementPopUp from '~/components/modals/licenseAgreementPopUp'
import { consoleHelper } from '~/utils/windowUtils'
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component'
import { defaultImages, ImageSizeEnums, loadImageSrc } from '~/utils/imageHelpers'
import CardSmall from '../cards/cardSmall'


/**
 * @Component Freebie
 *
 * Resource Item
 * Displays Name, Desc and Download
 *
 * Download open in modal is determined by requirement set in DB
 *
 * @param {IResourceFreebie} item
 */
type Props = {
  resource: IResourceItem
  scrollPosition: ScrollPosition
}
const Freebie = (props: Props) => {
  const { resource, scrollPosition } = props
  // consoleHelper('resource', resource)
  const image = loadImageSrc({
    imageSizeName: ImageSizeEnums.MEDIUM, // image name to try and get
    imageObject: resource.featuredImage, // the featured image object
    fallbackSize: ImageSizeEnums.WPRP, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })
  const { openModal, closeModal } = useSite()
  function popUpDownload() {
    openModal({
      template: <LicenseAgreementPopUp
        closeModal={closeModal}
        download_link={resource.freebie.downloadLink}
        product={resource.freebie.product} />
    })
  }

  function normalDownload() {
    window.open(resource.freebie.downloadLink);
  }

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (resource.freebie.licenseRequired) {
      popUpDownload()
      return
    }
    normalDownload()
  }

  return (
    <CardSmall
      title={resource.title}
      id={resource.id}
      image={image}
      excerpt={resource.freebie.excerpt}
      buttonText={'Download'}
      scrollPosition={scrollPosition}
      handleButtonClick={handleButtonClick}
    />
  )
}

export default Freebie
