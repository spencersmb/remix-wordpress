import React from 'react'

interface Props {
  resources: IPostResource[]
}

function TutorialResources(props: Props) {
  const { resources } = props

  if (resources.length === 0) {
    return null
  }

  return (
    <div className='bg-white p-7 border-t-[1px] border-grey-200'>

      <h3 className="mb-3 text-2xl laptop:text-5xl font-sentinel__SemiBoldItal">Additional Resources</h3>

      {resources.map((resource, index) => {

        if (resource.colorSwatch) {
          const colorSwatch = resource.colorSwatch
          return (
            <div key={`colorSwatch-${index}`} className='mb-2'>
              Free Color Swatch
              <p>
                {colorSwatch.url}
              </p>
            </div>
          )
        }

        if (resource.course) {
          const course = resource.course
          return (
            <div key={`course-${index}`} className='mb-2'>
              {course.title}
            </div>
          )
        }

        if (resource.product) {
          const product = resource.product
          return (
            <div key={`product-${index}`} className='mb-2'>
              {product.title}
            </div>
          )
        }

        if (resource.download) {
          const download = resource.download
          return (
            <div key={`download-${index}`} className='mb-2'>
              {download.name}
            </div>
          )
        }

        return null
      })}
    </div>
  )
}

export default TutorialResources
