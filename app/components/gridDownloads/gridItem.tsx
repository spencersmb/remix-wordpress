import { ImageSizeEnums } from '@App/enums/imageEnums'
import { defaultImages, loadImageSrc } from '@App/utils/imageHelpers'
import React from 'react'
import type { ScrollPosition } from 'react-lazy-load-image-component'
import CardSmall from '../cards/cardSmall'

/**
 * @component - GridItem
 * @tested - 5/30/2022
 */


interface IProps {
  item: IGridItem
  scrollPosition: ScrollPosition
}
function GridItem(props: IProps) {
  const { title, downloadLink, excerpt, tags, image } = props.item

  const imageSrc = loadImageSrc({
    imageSizeName: ImageSizeEnums.MEDIUM, // image name to try and get
    imageObject: image, // the featured image object
    fallbackSize: ImageSizeEnums.WPRP, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    window.open(downloadLink);
  }

  return (
    <div>
      {/* <h3>{title}</h3>
      <p>{excerpt}</p>
      <button onClick={handleButtonClick}>Download</button> */}
      <CardSmall
        buttonText='Download'
        excerpt={excerpt}
        image={imageSrc}
        title={title}
        handleButtonClick={handleButtonClick}
        id={title}
        scrollPosition={props.scrollPosition}
      />
    </div>
  )
}

export default GridItem
