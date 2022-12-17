import { ImageSizeEnums } from '@App/enums/imageEnums'
import { defaultImages, loadImageSrc } from '@App/utils/imageHelpers'
import React from 'react'
import LazyImageBase from '../images/lazyImage-base'

interface Props {
  course: ICourse
}
/**
 * @function CourseCardSmall
 * @description - Used on the Homepage in the Featured Courses section
 * @tested - Snapshot 11/19/2022
 */
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
      className='relative flex flex-row items-center p-4 mb-4 transition-all duration-300 translate-y-0 z-3 bg-tangerine-200 group laptop:hover:shadow-et_4 laptop:hover:z-2 laptop:hover:-translate-y-1'>

      {/* IMAGE */}
      <div className='rounded-full w-[113px] h-[113px] overflow-hidden border-0 transition-all duration-200'>
        <LazyImageBase
          testId='course-feature-image'
          id={course.id}
          image={image}
          disableSrcSet={true}
        />
      </div>

      {/* TITLE */}
      <div className='flex flex-col flex-1 ml-4'>
        <div className='text-xs font-semibold uppercase text-emerald-900'>course</div>
        <div className='text-xl font-semibold leading-7 text-emerald-900'>
          {course.title}
        </div>
      </div>
    </a>
  )
}

export default CourseCardSmall
