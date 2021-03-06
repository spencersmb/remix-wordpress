import { Link } from '@remix-run/react'
import { defaultImages, loadImageSrc, loadThumbnailSrc } from '@App/utils/imageHelpers'
import { findSkillLevel, formatDate } from '@App/utils/posts'
import CircularStrokeBtn, { CircularStrokeLink } from '../buttons/circularStrokeBtn'
import LazyImageBase from '../images/lazyImage-base'
import BarChartSvg from '../svgs/barChartSvg'
import ClockSvg from '../svgs/clockSvg'
import EditSvg from '../svgs/editSvg'
import { ImageSizeEnums } from '@App/enums/imageEnums'
import LazyImgix from '../images/lazyImgix'
import { staticImages } from '@App/lib/imgix/data'
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
  let postImage = loadThumbnailSrc(featuredPost.tutorialManager, image)

  return (
    <div className='grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>

      {/* FEATURED IMAGE */}
      <div className="featured_image mt-12 row-start-1 col-span-2 col-start-2 relative z-10 tablet:col-end-8 tablet:row-span-3 tablet:row-start-1 desktop:col-start-2 max-w-[660px] ml-auto mr-0 desktop:mt-24 w-full">
        <Link to={`/${featuredPost.slug}`} prefetch="intent">

          <div className={`absolute top-[-20px] left-[15px] w-[167px] rotate-[352deg] z-10 laptop:w-[227px] desktop:w-[373px]`}>
            <div className='relative z-10 lazy-load-image-full'>
              <LazyImgix
                id={'make-this'}
                image={{
                  width: staticImages.assets.makeThis.width,
                  height: staticImages.assets.makeThis.height,
                  alt: `Make this tutorial: ${featuredPost.title}`,
                  src: staticImages.assets.makeThis.src,
                  placeholder: staticImages.assets.makeThis.placeholder
                }}
              />
            </div>
            <span className={`top-[45px] absolute w-[40%] left-[71%] z-[5]`}>
              <LazyImgix
                id={'make-this-arrow'}
                image={{
                  width: staticImages.assets.arrows.arrow_1.width,
                  height: staticImages.assets.arrows.arrow_1.height,
                  alt: `Make this hand drawn arrow`,
                  src: staticImages.assets.arrows.arrow_1.src,
                  placeholder: staticImages.assets.arrows.arrow_1.placeholder
                }}
              />
            </span>
          </div>

          <div className="relative pb-[92%]">
            <div className="rounded-2.5xl overflow-hidden flex absolute h-full top-0 w-full">
              <LazyImageBase
                visibleByDefault={true}
                testId='feature-image'
                id={featuredPost.id}
                image={postImage} />
            </div>

            {featuredPost.tutorialManager.colorPalette && <div data-testid="color-swatch" style={{ backgroundColor: featuredPost.tutorialManager.colorPalette.iconBackgroundColor }} className="absolute rounded-full bottom-[-10px] tablet:bottom-[-10%] right-[30px] w-[100px] h-[100px] laptop:bottom-[-6%] desktop:w-[138px] desktop:h-[138px] bg-slate-500 desktop:top-auto desktop:bottom-[-10px] flex justify-center items-center">
              <span style={{ color: featuredPost.tutorialManager.colorPalette.iconTextColor }} className="transform rotate-[-8deg] text-center font-sentinel__SemiBoldItal tablet:leading-4 desktop:text-xl desktop:leading-6">
                Free Color Swatches
              </span>
            </div>}

          </div>
        </Link>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col col-span-2 col-start-2 row-start-2 mt-4 ml-0 featured-content tablet:col-span-6 tablet:col-start-8 tablet:row-start-1 tablet:mt-12 tablet:ml-6 desktop:ml-12 desktop:col-span-5 desktop:col-start-8 desktop:mt-24 ">

        <span className="py-4 text-sm font-medium leading-none text-sage-700 tablet:pt-0 laptop:pb-7 laptop:pt-2">LATEST POST</span>

        <h2 className="mb-6 font-sentinel__SemiBoldItal text-heading-3 text-primary-600 laptop:text-5xl laptop:mb-8">
          <Link data-testid="blog-title" to={`/${featuredPost.slug}`} prefetch="intent">
            {featuredPost.title}
          </Link>
        </h2>

        <div className="flex flex-row flex-wrap items-start mb-6 text-base text-primary-600 tablet:mb-3 laptop:mb-6">

          {skill && <div data-testid="blog-skill-level" className="flex flex-row items-center mb-2 mr-4 tablet:mr-12">
            <span className="mr-1 max-w-[15px]"><BarChartSvg fill={'var(--warning-700)'} /></span>
            <div>
              <span className='mr-1'>Skill Level:</span>
              <span className='font-semibold'>{skill.name}</span>
            </div>
          </div>}

          <div data-testid="blog-date" className="flex flex-row items-center flex-auto mb-2">
            <span className="mr-2 max-w-[12px]"><ClockSvg fill={'var(--warning-700)'} /></span>
            {formatDate(featuredPost.date)}
          </div>

          <div data-testid="blog-author" className="mb-2 flex flex-row flex-[0_1_100%] items-center">
            <span className="mr-2 max-w-[12px]"><EditSvg fill={'var(--warning-700)'} /></span>
            by Teela Cunningham</div>

        </div>
      </div>

      {/* DESCRIPTIOM */}
      <div className="relative z-10 col-span-2 col-start-2 row-start-3 featured-content tablet:col-span-6 tablet:col-start-8 tablet:row-start-2 desktop:col-span-5 desktop:col-start-8 tablet:mt-5 tablet:ml-6 laptop:mt-7 desktop:ml-12">

        {featuredPost.tutorialManager.postExcerpt && <div data-testid="blog-desc" className='text-lg' dangerouslySetInnerHTML={{ __html: featuredPost.tutorialManager.postExcerpt }} />}

        <div className='mt-12'>

          <CircularStrokeLink href={`/${featuredPost.slug}`} text='View Post' classes="font-semibold py-[21px] px-[30px]" />

        </div>
      </div>

      {/* BACKGROUND */}
      <div className="relative z-0 col-span-4 col-start-1 row-span-2 row-start-1 featured-content-bg tablet:bg-neutral-100 tablet:col-span-full tablet:row-end-2"></div>
    </div>
  )
}

export default BlogFeaturedPost
