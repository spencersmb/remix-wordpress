import { staticImages } from '@App/lib/imgix/data'
import { createImgixSizes } from '@App/utils/imageHelpers'
import { Link } from '@remix-run/react'
import React from 'react'
import CourseCardSmall from '../cards/courseCardSmall'
import LazyImgix from '../images/lazyImgix'

interface Props {
  courses: ICourse[]
}

// TODO: TEST THIS
function FeatureCourses(props: Props) {
  const { courses } = props

  // get the first 3 courses
  const letteringCourses = courses.slice(0, 3)
  const illustrationCourses = courses.slice(3, 6)
  const shortStrokes = createImgixSizes({
    staticImage: staticImages.scribbles.shortStrokes,
    alt: `Short Paint Strokes using Teela's custom Procreate Brush set - Gouache Lovers`,
    mobileSize: 500,
    params: '&monochrome=7F5A3A'
  })

  return (
    <section className='et-grid-basic bg-cream-300'>

      {/* TITLE */}
      <div className='relative col-span-2 col-start-2 my-8 text-center tablet:col-start-2 tablet:col-span-7 tablet:text-left tablet:mt-16 laptop:col-start-3 desktop:col-start-4'>
        <div className='relative text-5xl font-sentinel__SemiBoldItal z-2'>
          Find a Course
        </div>
        <div className='z-1 max-w-[275px] w-full mt-6 left-[-80px] absolute bottom-[-40px]'>
          <LazyImgix
            id={`shortStrokes`}
            image={shortStrokes.image}
          />
        </div>
      </div>

      {/* LETTERING COURSES */}
      <div className='relative max-w-[315px] mx-auto flex flex-col col-span-2 col-start-2 mb-8 tablet:col-start-3 tablet:col-span-5 tablet:row-start-2 tablet:mt-20 tablet:ml-auto tablet:mr-0 laptop:col-start-4 laptop:col-span-4 desktop:col-start-5 desktop:col-span-3'>

        {/* HEADER */}
        <div className='flex flex-col mb-8 text-center tablet:text-left'>

          <div className='text-3xl font-sentinel__SemiBoldItal'>
            Illustration Courses
          </div>

          <p>
            Starting out with Procreate
          </p>

        </div>

        {/* COURSES */}
        <div className='flex flex-col'>
          {illustrationCourses.map((course, index) => {
            return (
              <CourseCardSmall course={course} key={index} />
            )
          })
          }
        </div>

        {/* HAND QUOTE */}
        <div className="hidden absolute font-bonVivant text-5xl w-[300px] top-1/2 -translate-y-1/2 left-[-250px] -rotate-6 desktop:block">
          Free Procreate color palettes
        </div>

      </div>

      {/* ILLUSTRATION COURSES */}
      <div className='relative max-w-[315px] mx-auto flex flex-col col-span-2 col-start-2 mb-8 tablet:col-start-8 tablet:col-span-5 tablet:row-start-2 tablet:ml-0 laptop:col-span-4 desktop:col-start-8 desktop:col-span-3'>

        {/* HEADER */}
        <div className='flex flex-col mb-8 text-center tablet:text-left'>

          <div className='text-3xl font-sentinel__SemiBoldItal'>
            Lettering
          </div>

          <p>
            Starting out with Procreate
          </p>

        </div>

        {/* COURSES */}
        <div className='flex flex-col'>
          {letteringCourses.map((course, index) => {
            return (
              <CourseCardSmall course={course} key={index} />
            )
          })
          }
        </div>

        {/* HAND QUOTE */}
        <div className="hidden absolute text-5xl w-[250px] top-1/2 -translate-y-1/2 right-[-275px] rotate-6 desktop:block">
          <div className='mb-2 text-xl leading-6 font-sentinel__SemiBoldItal'>
            Free Procreate Brushes with course purchase
          </div>
          <div className='text-sm'>
            Each course comes with a special set of brushes designed specially for that course.
          </div>
        </div>

      </div>

      {/* BTN VIEW ALL */}
      <div className='flex justify-center col-span-2 col-start-2 mb-12 tablet:col-start-5 tablet:col-span-6'>
        <Link to='/courses' className='btn btn-primary btn-xl' prefetch='intent'>
          View All Courses
        </Link>
      </div>

    </section>
  )
}

export default FeatureCourses
