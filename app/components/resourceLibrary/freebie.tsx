import React from 'react'
import useSite from '~/hooks/useSite'
import LicenseAgreementPopUp from '~/components/modals/licenseAgreementPopUp'
import { consoleHelper } from '~/utils/windowUtils'
import { getImageSizeUrl } from '~/utils/posts'


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

const Freebie = (item: IResourceItem) => {
  consoleHelper('item', item)
  const { openModal, closeModal } = useSite()
  function popUpDownload() {
    openModal({
      template: <LicenseAgreementPopUp
        closeModal={closeModal}
        download_link={item.freebie.downloadLink}
        product={item.freebie.product} />
    })
  }

  function normalDownload() {
    window.open(item.freebie.downloadLink);
  }

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (item.freebie.licenseRequired) {
      popUpDownload()
      return
    }
    normalDownload()
  }

  const featuredImage = getImageSizeUrl(item.featuredImage.mediaDetails.sizes, 'medium')

  return (
    <div>
      <div>
        <img src={featuredImage.sourceUrl} alt={item.title} />
      </div>
      <h3>{item.title}</h3>
      <p>{item.freebie.excerpt}</p>
      <button onClick={handleButtonClick}>Download</button>
    </div>
  )
}

export default Freebie
