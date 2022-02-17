import { Link } from 'remix'
import { createThumbnailImage, findSkillLevel, formatDate, getImageSizeUrl } from '~/utils/posts'
import CircularStrokeBtn, { CircularStrokeLink } from '../buttons/circularStrokeBtn'
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
  const defaultImage = getImageSizeUrl(featuredPost.featuredImage, 'headless_ipad')
  return (
    <div className='grid grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop grid-flow-row row-auto'>

      {/* FEATURED IMAGE */}
      <div className="featured_image mt-12 row-start-1 col-span-2 col-start-2 relative z-10 tablet:col-end-8 tablet:row-span-3 tablet:row-start-1 desktop:col-start-2 max-w-[660px] ml-auto mr-0 desktop:mt-24">
        <Link to={`/${featuredPost.slug}`} prefetch="intent">
          {createThumbnailImage(featuredPost.tutorialManager, defaultImage, featuredPost.title, true)}
        </Link>
      </div>

      {/* CONTENT */}
      <div className="featured-content ml-0 mt-4 row-start-2 col-span-2 col-start-2 relative z-10 flex flex-col tablet:col-span-6 tablet:col-start-8 tablet:row-start-1 tablet:mt-12 tablet:ml-6 desktop:col-span-5 desktop:col-start-8 desktop:mt-24 ">
        <span className="py-4 text-sm text-primary-400 tablet:pt-0 laptop:pb-7 laptop:pt-2 leading-none">LATEST POST</span>
        <h2 className="mb-6 font-sentinel__SemiBoldItal text-heading-3 text-primary-600 laptop:text-5xl laptop:mb-8">
          <Link to={`/${featuredPost.slug}`} prefetch="intent">
            {featuredPost.title}
          </Link>
        </h2>
        <div className="mb-6 flex flex-row flex-wrap text-primary-600 text-sm items-start tablet:mb-3 laptop:mb-8">
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
      <div className="featured-content row-start-3 col-span-2 col-start-2 relative z-10 tablet:col-span-6 tablet:col-start-8 tablet:row-start-2 desktop:col-span-5 desktop:col-start-8 tablet:mt-5 tablet:ml-6 laptop:mt-7">
        <div className='text-base' dangerouslySetInnerHTML={{ __html: featuredPost.tutorialManager.postExcerpt }} />
        <div className='mt-8'>
          <CircularStrokeLink href={`/${featuredPost.slug}`} text='Read More' classes="py-[17px] px-[18px] text-lg text-primary-700" />
        </div>
      </div>

      {/* BACKGROUND */}
      <div className="featured-content-bg tablet:bg-neutral-100 row-start-1 row-span-2 col-start-1 col-span-4 relative z-0 tablet:col-span-full tablet:row-end-2"></div>
    </div>
  )
}

export default BlogFeaturedPost
