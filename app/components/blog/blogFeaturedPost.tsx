import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'remix'
import { defaultImages, ImageSizeEnums, loadImageSrc, loadThumbnailSrc } from '~/utils/imageHelpers'
import { createThumbnailImage, findSkillLevel, formatDate } from '~/utils/posts'
import CircularStrokeBtn, { CircularStrokeLink } from '../buttons/circularStrokeBtn'
import LazyImageBase from '../images/lazyImage-base'
import BarChartSvg from '../svgs/barChartSvg'
import ClockSvg from '../svgs/clockSvg'
import EditSvg from '../svgs/editSvg'
interface Props {
  featuredPost: IPost | undefined
}

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

  const makeThisImage: IMediaDetailSize = {
    altTitle: `Make this tutorial: ${featuredPost.title}`,
    height: '373px',
    width: '162px',
    sourceUrl: "/images/make-this.png",
    srcSet: '',
    sizes: '',
    placeholder: '/images/make-this.png',
  }
  const makeThisArrow: IMediaDetailSize = {
    altTitle: `Make this tutorial: ${featuredPost.title}`,
    height: '340px',
    width: '272px',
    sourceUrl: "/images/make-this-arrow-1.png",
    srcSet: '',
    sizes: '',
    placeholder: '/images/make-this-arrow-1.png',
  }

  return (
    <div className='grid grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop grid-flow-row row-auto'>

      {/* FEATURED IMAGE */}
      <div className="featured_image mt-12 row-start-1 col-span-2 col-start-2 relative z-10 tablet:col-end-8 tablet:row-span-3 tablet:row-start-1 desktop:col-start-2 max-w-[660px] ml-auto mr-0 desktop:mt-24 w-full">
        <Link to={`/${featuredPost.slug}`} prefetch="intent">
          {/* {createThumbnailImage(featuredPost.tutorialManager, image, featuredPost.title, true)} */}
          <div className={`absolute top-[-20px] left-[15px] w-[45%] rotate-[352deg] z-10`}>
            <div className='relative z-10 lazy-load-image-full'>
              <LazyImageBase id={featuredPost.id} image={makeThisImage} reverse />
            </div>
            <span className={`top-[45px] absolute w-[40%] left-[71%] z-[5]`}>
              <LazyImageBase id={featuredPost.id} image={makeThisArrow} />
            </span>
          </div>
          <div className="relative pb-[92%]">
            <div className="rounded-2.5xl overflow-hidden flex absolute h-full top-0 w-full">
              <LazyImageBase id={featuredPost.id} image={postImage} />
            </div>
            {featuredPost.tutorialManager.colorPalette && <div style={{ backgroundColor: featuredPost.tutorialManager.colorPalette.iconBackgroundColor }} className="absolute rounded-full bottom-[-10px] tablet:bottom-[-10%] right-[30px] w-[100px] h-[100px] laptop:bottom-[-6%] desktop:w-[138px] desktop:h-[138px] bg-slate-500 desktop:top-auto desktop:bottom-[-10px] flex justify-center items-center">
              <span style={{ color: featuredPost.tutorialManager.colorPalette.iconTextColor }} className="transform rotate-[-8deg] text-center font-sentinel__SemiBoldItal tablet:leading-4 desktop:text-xl desktop:leading-6">
                Free Color Swatches
              </span>
            </div>}
          </div>
        </Link>
      </div>

      {/* CONTENT */}
      <div className="featured-content ml-0 mt-4 row-start-2 col-span-2 col-start-2 relative z-10 flex flex-col tablet:col-span-6 tablet:col-start-8 tablet:row-start-1 tablet:mt-12 tablet:ml-6 desktop:ml-12 desktop:col-span-5 desktop:col-start-8 desktop:mt-24 ">
        <span className="py-4 text-sm text-primary-400 tablet:pt-0 laptop:pb-7 laptop:pt-2 leading-none">LATEST POST</span>
        <h2 className="mb-6 font-sentinel__SemiBoldItal text-heading-3 text-primary-600 laptop:text-5xl laptop:mb-8">
          <Link to={`/${featuredPost.slug}`} prefetch="intent">
            {featuredPost.title}
          </Link>
        </h2>
        <div className="mb-6 flex flex-row flex-wrap text-primary-600 text-base items-start tablet:mb-3 laptop:mb-6">
          {skill && <div className="flex flex-row items-center mr-4 tablet:mr-12 mb-2">
            <span className="mr-1 max-w-[15px]"><BarChartSvg fill={'var(--warning-700)'} /></span>
            <div>
              <span className='mr-1'>Skill Level:</span>
              <span className='font-semibold'>{skill.name}</span>
            </div>
          </div>}
          <div className="mb-2 flex flex-row flex-auto items-center">
            <span className="mr-2 max-w-[12px]"><ClockSvg fill={'var(--warning-700)'} /></span>
            {formatDate(featuredPost.date)}</div>
          <div className="mb-2 flex flex-row flex-[0_1_100%] items-center">
            <span className="mr-2 max-w-[12px]"><EditSvg fill={'var(--warning-700)'} /></span>
            by Teela Cunningham</div>
        </div>
      </div>

      {/* DESCRIPTIOM */}
      <div className="featured-content row-start-3 col-span-2 col-start-2 relative z-10 tablet:col-span-6 tablet:col-start-8 tablet:row-start-2 desktop:col-span-5 desktop:col-start-8 tablet:mt-5 tablet:ml-6 laptop:mt-7 desktop:ml-12">
        <div className='text-lg' dangerouslySetInnerHTML={{ __html: featuredPost.tutorialManager.postExcerpt }} />
        <div className='mt-8'>
          <CircularStrokeLink href={`/${featuredPost.slug}`} text='Read More' classes="py-[17px] px-[24px] text-base text-primary-700" />
        </div>
      </div>

      {/* BACKGROUND */}
      <div className="featured-content-bg tablet:bg-neutral-100 row-start-1 row-span-2 col-start-1 col-span-4 relative z-0 tablet:col-span-full tablet:row-end-2"></div>
    </div>
  )
}

export default BlogFeaturedPost
