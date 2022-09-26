import { ImageSizeEnums } from '@App/enums/imageEnums'
import { createImgixSizes, defaultImages, loadImageSrc } from '@App/utils/imageHelpers'
import React, { useState } from 'react'
import ResourceCourse from './resource/resourceCourse'
import ResourceDownload from './resource/resourceDownload'
import ResourceColorSwatch from './resource/resourceDownload'
import ResourceLink from './resource/resourceLink'
import ResourceProduct from './resource/resourceProduct'
import ResourceTemplate from './resource/resourceTemplate'

interface Props {
  resources: IPostResource[]
}

function TutorialResources(props: Props) {
  const { resources } = props

  const [productState, setProductState] = useState<{
    index: number | null
    product: IProduct | null
  }>({
    product: null,
    index: null
  })

  if (resources.length === 0) {
    return null
  }

  return (
    <div className='mt-8 bg-white py-4 tablet:py-7 tablet:pb-0 border-t-[1px] border-grey-200'>

      <h3 className="px-4 pb-4 text-2xl border-b laptop:text-3xl laptop:px-7 font-sentinel__SemiBoldItal border-sage-200">Additional Resources</h3>

      {resources.map((resource, index) => {

        if (resource.colorSwatch) {
          const colorSwatch = resource.colorSwatch
          const image = createImgixSizes({
            width: 150,
            height: 150,
            alt: `Every-Tuesday Free Color Swatches for Procreate`,
            src: 'https://et-website.imgix.net/et-website/images/swatch-small_1_1.jpg',
            mobileSize: 150
          })
          return (
            <ResourceDownload
              title='Color Swatches'
              description='Download the free clolor swatches instantly for this tutorial!'
              key={index}
              index={index}
              imgix={image}
              url={colorSwatch.url}
            />
          )
        }

        if (resource.course) {
          const course = resource.course
          const image = loadImageSrc({
            imageSizeName: ImageSizeEnums.WP_THUMBNAIL,
            imageObject: course.featuredImage.node,
            fallbackSize: ImageSizeEnums.MEDIUM,
            fallbackImage: defaultImages.thumbnail
          })

          return (
            <ResourceCourse
              key={index}
              index={index}
              title={course.title}
              description={resource.description}
              image={image}
              url={course.details.courseUrl}
            />
          )
        }

        if (resource.product) {
          const product = resource.product
          return (
            <ResourceProduct
              key={index}
              index={index}
              product={product}
              description={resource.description}
              selected={productState.index === index}
              handleClick={setProductState}
            />
          )
        }

        if (resource.download) {
          const download = resource.download
          const image = createImgixSizes({
            width: 150,
            height: 150,
            alt: `Every-Tuesday Free Color Swatches for Procreate`,
            src: 'https://et-website.imgix.net/et-website/images/swatch-small_1_1.jpg',
            mobileSize: 150
          })
          return (
            <ResourceDownload
              title={download.name}
              description={download.description}
              key={index}
              index={index}
              imgix={image}
              url={download.url}
            />
          )
        }

        if (resource.link) {
          const { description, name, url } = resource.link
          const image = createImgixSizes({
            width: 150,
            height: 150,
            alt: `Every-Tuesday Free Color Swatches for Procreate`,
            src: 'https://et-website.imgix.net/et-website/images/swatch-small_1_1.jpg',
            mobileSize: 150
          })
          return (
            <ResourceLink
              title={name}
              description={description}
              key={index}
              index={index}
              imgix={image}
              url={url}
            />
          )
        }

        return null
      })}
    </div>
  )
}

export default TutorialResources
