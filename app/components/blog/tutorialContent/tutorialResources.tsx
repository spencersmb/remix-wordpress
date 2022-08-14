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
    <div className='bg-white'>
      {resources.map((resource, index) => {
        const keys = Object.keys(resource)

        if (keys.includes('colorSwatch')) {
          return (
            <div>
              Color Swatch
            </div>
          )
        }

        if (keys.includes('course')) {
          return (
            <div>
              Course
            </div>
          )
        }

        if (keys.includes('product')) {
          return (
            <div>
              Product
            </div>
          )
        }

        return (
          <div key={index}>
            Default Download Generic
          </div>
        )
      })}
    </div>
  )
}

export default TutorialResources
