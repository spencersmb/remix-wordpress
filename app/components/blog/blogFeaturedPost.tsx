import { Link } from '@remix-run/react'
import { defaultImages, loadImageSrc, loadThumbnailSrc } from '@App/utils/imageHelpers'
import { findSkillLevel, formatDate, getResource, POST_RESOURCE_ENUMS } from '@App/utils/posts'
import CircularStrokeBtn, { CircularStrokeLink } from '../buttons/circularStrokeBtn'
import LazyImageBase from '../images/lazyImage-base'
import BarChartSvg from '../svgs/barChartSvg'
import ClockSvg from '../svgs/clockSvg'
import EditSvg from '../svgs/editSvg'
import { ImageSizeEnums } from '@App/enums/imageEnums'
import LazyImgix from '../images/lazyImgix'
import { staticImages } from '@App/lib/imgix/data'
import { CalendarIcon } from '@heroicons/react/outline'
interface Props {
  featuredPost: IPost | undefined
}

/**
 * BlogFeaturedPost
 * @tested - 5/27/2022
 * 
 * @returns 
 */
function BlogFeaturedPost(props: Props) {
  const { featuredPost } = props

  if (!featuredPost) {
    return null
  }

  const skill = findSkillLevel(featuredPost.categories);
  const image = loadImageSrc({
    imageSizeName: ImageSizeEnums.THUMBNAIL,
    imageObject: featuredPost.featuredImage,
    fallbackSize: ImageSizeEnums.MEDIUM,
    fallbackImage: defaultImages.thumbnail
  })

  const [tutorialMin] = featuredPost.tutorialManager.youtube?.duration && typeof featuredPost.tutorialManager.youtube.duration === 'string'
    ? featuredPost.tutorialManager.youtube.duration.split(':') : ['00', '00']

  // let postImage = loadThumbnailSrc(featuredPost.tutorialManager, image)
  // console.log('featuredPost', featuredPost);

  const colorSwatch = getResource({
    resources: featuredPost.tutorialManager.resources,
    resourceName: POST_RESOURCE_ENUMS.SWATCH
  })

  return (
    <div className={`grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 laptop:grid-rows-[minmax(50px,auto)_auto_1fr_minmax(50px,auto)] desktop:grid-cols-desktop desktopXl:grid-rows-[minmax(70px,auto)_auto_1fr_minmax(70px,auto)]`}>

      {/* FEATURED IMAGE */}
      <div className="relative z-10 w-full col-span-2 col-start-2 row-start-1 mx-auto mt-8 featured_image tablet:col-start-3 tablet:col-span-10 laptop:flex laptop:items-center laptop:col-start-7 laptop:col-span-7 laptop:row-start-2 laptop:row-span-2 laptop:my-0 laptop:mr-[-30px]
      desktop:mr-0 desktop:max-w-[720px] desktop:col-start-8 desktop:col-span-6 desktopXl:col-start-7 desktopXl:col-span-7">
        <Link className='w-full' to={`/${featuredPost.slug}`} prefetch="intent">

          <div className="relative">
            <LazyImageBase
              visibleByDefault={true}
              testId='feature-image'
              id={featuredPost.id}
              image={image} />

          </div>
        </Link>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col col-span-2 col-start-2 row-start-2 mt-4 ml-0 featured-content tablet:mb-2 tablet:col-start-4 tablet:col-span-8 tablet:mt-8 laptop:col-start-2 laptop:col-span-5 laptop:row-start-2 laptop:mt-0 desktop:col-start-2 desktop:col-span-6">

        <span className="py-4 text-sm font-medium leading-none text-emerald-700 tablet:pt-0 laptop:pb-3 laptop:pt-2">LATEST POST</span>

        <h2 className="mb-4 font-sentinel__SemiBoldItal text-heading-3 text-emerald-800 tablet:text-4xl laptop:text-5xl desktop:text-6xl desktop:text-[64px]">
          <Link data-testid="blog-title" to={`/${featuredPost.slug}`} prefetch="intent">
            {featuredPost.title}
          </Link>
        </h2>

        <div className="flex flex-row flex-wrap items-start mb-3 text-base text-emerald-800 tablet:mb-4 tablet:flex-row tablet:gap-x-6 tablet:content-start laptop:gap-y-1 laptop:gap-x-0 desktop:gap-x-8">

          <div data-testid="blog-date" className="flex flex-row items-center flex-auto mb-2  tablet:mb-0 font-semibold tablet:flex-none laptop:flex-[1_0_50%] desktop:flex-none">
            <span className="mr-1 max-w-[18px] text-tangerine-700">
              <CalendarIcon path={'currentColor'} />
              {/* <ClockSvg fill={'currentColor'} /> */}
            </span>
            {formatDate(featuredPost.date)}
          </div>

          {skill && <div data-testid="blog-skill" className="flex flex-row items-center mb-2 tablet:mb-0 laptop:flex-[1_0_50%] desktop:flex-none">
            <span className="mr-1 max-w-[17px] text-tangerine-700">
              <BarChartSvg fill={'currentColor'} /></span>
            <div className='font-semibold'>
              <span className='mr-1'>Skill</span>
              <span className=''>{skill.name}</span>
            </div>
          </div>}

          {/* TIME */}
          {tutorialMin && tutorialMin !== '00' &&
            <div className='flex flex-row items-center tablet:flex-1 laptop:flex-[1_0_50%]desktop:flex-1'>
              <div className='max-w-[14px] w-full mr-2 text-tangerine-700'>
                <ClockSvg fill='currentColor' />
              </div>
              <div className='flex flex-row gap-1 font-semibold'>
                {tutorialMin} min tutorial
              </div>
            </div>
          }



          {/* <div data-testid="blog-author" className="flex flex-row items-center mb-2 laptop:mb-0">
            <span className="mr-2 max-w-[12px]"><EditSvg fill={'currentColor'} /></span>
            by Teela Cunningham</div>*/}

        </div>
      </div>

      {/* DESCRIPTIOM */}
      <div className="relative z-10 col-span-2 col-start-2 row-start-3 mb-8 featured-content tablet:col-start-4 tablet:col-span-8 laptop:col-start-2 laptop:col-span-5 laptop:row-start-3 laptop:mb-0">

        {featuredPost.tutorialManager.postExcerpt && <div data-testid="blog-desc" className='overflow-hidden text-lg text-emerald-700 blog-preview-text' dangerouslySetInnerHTML={{ __html: featuredPost.tutorialManager.postExcerpt }} />}

        <div className='flex mt-9'>

          <Link
            data-testid="test-CircularStrokeBtn"
            to={`/${featuredPost.slug}`}
            className={`relative btn btn-primary btn-xl btn-primary-ring`}>
            View Post
          </Link>

        </div>
      </div>

      {/* BACKGROUND */}
      {/* <div className="bg-[#F7F6F7] relative z-0 col-start-1 row-span-4 row-start-1 col-span-full laptop:row-start-1 laptop:row-span-4"></div> */}
    </div>
  )
}

export default BlogFeaturedPost
