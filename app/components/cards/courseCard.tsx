import { ImageSizeEnums } from "@App/enums/imageEnums"
import { defaultImages, loadImageSrc } from "@App/utils/imageHelpers"
import LazyImageBase from "../images/lazyImage-base"

interface Props {
  course: ICourse
}

/**
 * Course Card
 * 
 * @tested - 5/28/2022
 * @returns 
 */
function CourseCard(props: Props) {
  const { course } = props
  const featuredImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.SOURCE, // image name to try and get
    imageObject: course.featuredImage, // the featured image object
    fallbackSize: ImageSizeEnums.FULL, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })
  return (
    <div data-testid="course-card" className="col-span-2 col-start-2 tablet:col-auto">
      <div className="bg-white rounded-[10px] shadow-md overflow-hidden mb-8 hover:shadow-2xl laptop:transition-all hover:-translate-y-3 laptop:ease-in-out laptop:duration-200">
        <a href={course.details.courseUrl} target='_blank' rel="noreferrer" >

          {/* IMAGE */}
          <div>
            <LazyImageBase image={featuredImage} id={`course-feature-${course.slug}`} />
          </div>

          {/* CTA */}
          <div className="py-[5%] relative text-center overflow-hidden">
            <div className="min-h-[80px] flex justify-center items-center flex-1">
              <div className="text-xl font-sentinel__SemiBoldItal">
                {course.title}
              </div>
            </div>
          </div>

        </a>

      </div>
    </div>
  )
}

export default CourseCard
