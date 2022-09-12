import { ImageSizeEnums } from '@App/enums/imageEnums'
import { defaultImages, loadImageSrc } from '@App/utils/imageHelpers'
import React from 'react'
import LazyImageBase from '../images/lazyImage-base'

interface Props {
  course: ICourse
}
// TODO: TEST THIS
function CourseCardSmall(props: Props) {
  const { course } = props
  const image = loadImageSrc({
    imageSizeName: ImageSizeEnums.WP_THUMBNAIL,
    imageObject: course.featuredImage,
    fallbackSize: ImageSizeEnums.MEDIUM,
    fallbackImage: defaultImages.thumbnail
  })
  return (
    <a
      target={'_blank'}
      rel={'noreferrer'}
      href={course.details.courseUrl}
      className='flex flex-row items-center p-4 mb-4 bg-cream-100'>

      {/* IMAGE */}
      <div className='rounded-full w-[113px] h-[113px] overflow-hidden bg-sage-500'>
        <LazyImageBase
          testId='course-feature-image'
          id={course.id}
          image={image}
          disableSrcSet={true}
        />
      </div>

      {/* TITLE */}
      <div className='flex flex-col flex-1 ml-4'>
        <div className='text-xs font-semibold uppercase text-sage-600'>course</div>
        <div className='text-xl font-semibold leading-7'>
          {course.title}
        </div>
      </div>
    </a>
  )
}

export default CourseCardSmall
