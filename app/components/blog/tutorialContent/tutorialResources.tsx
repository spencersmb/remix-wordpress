import { ImageSizeEnums } from '@App/enums/imageEnums'
import { createImgixSizes, defaultImages, loadImageSrc } from '@App/utils/imageHelpers'
import React, { useState } from 'react'
import ResourceCourse from './resource/resourceCourse'
import ResourceDownload from './resource/resourceDownload'
import ResourceColorSwatch from './resource/resourceDownload'
import ResourceDownloadLink from './resource/resourceDownloadLink'
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
    <div className='px-8 mt-8 bg-white py-7'>

      <h3 className="pb-8 text-xl font-bold text-emerald-900">Mentioned in the video</h3>

      <div className='flex flex-col gap-y-10 tablet:flex-row tablet:gap-x-4 tablet:flex-wrap desktop:gap-x-8'>
        {resources.map((resource, index) => {

          if (resource.colorSwatch) {
            const colorSwatch = resource.colorSwatch
            return (
              <ResourceDownloadLink
                title='Color Swatches'
                description='Download the free clolor swatches instantly for this tutorial!'
                key={index}
                url={colorSwatch.url}
                btnText='Download'
                external={true}
              />
            )
          }

          if (resource.course) {
            const course = resource.course

            return (
              <ResourceDownloadLink
                title={course.title}
                description={resource.description || 'no desc found'}
                key={index}
                url={course.details.courseUrl}
                btnText='View Course'
                external={true}
              />
            )
          }

          if (resource.product) {
            const product = resource.product
            return (
              <ResourceDownloadLink
                title={product.title}
                description={resource.description || 'no desc found'}
                key={index}
                btnText='View'
                external={true}
                product={product}
              />
            )
          }

          if (resource.download) {
            const download = resource.download
            return (
              <ResourceDownloadLink
                title={download.name}
                description={download.description}
                key={index}
                btnText='Download'
                url={download.url}
                external={true}
              />
            )
          }

          if (resource.link) {
            const { description, name, url } = resource.link
            return (
              <ResourceDownloadLink
                title={name}
                description={description}
                key={index}
                btnText='Download'
                url={url}
                external={true}
              />
            )
          }

          return null
        })}
      </div>

    </div>
  )
}

export default TutorialResources
