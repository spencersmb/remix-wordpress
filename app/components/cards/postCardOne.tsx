import { motion } from "framer-motion";
import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
import { Link } from "remix"
import { checkTitleForBrackets, findSkillLevel, splitProgramNameInTitle } from "~/utils/posts";
import BarChartSvg from "../svgs/barChartSvg";
import { defaultImages, ImageSizeEnums, loadImageSrc, loadThumbnailSrc } from "~/utils/imageHelpers";
import LazyImageBase from "../images/lazyImage-base";

interface Props {
  post: IPost
  scrollPosition: ScrollPosition
}

function PostCardOne(props: Props) {
  const { post, scrollPosition } = props
  const splitTitle = splitProgramNameInTitle(post.title)
  const skill = findSkillLevel(post.categories);
  const image = loadImageSrc({
    imageSizeName: ImageSizeEnums.THUMBNAIL, // image name to try and get
    imageObject: post.featuredImage, // the featured image object
    fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })

  let postTitle = checkTitleForBrackets(splitTitle.title)
  let postImage = loadThumbnailSrc(post.tutorialManager, image)
  const paddingBottom = post.tutorialManager && post.tutorialManager.thumbnail.image
    ? "pb-[92%]"
    : "pb-[48.25%]"
  const marginBottom = post.tutorialManager && post.tutorialManager.thumbnail.image
    ? "mb-0"
    : "mb-4"

  const makeThisImage: IMediaDetailSize = {
    altTitle: `Make this tutorial: ${post.title}`,
    height: '373px',
    width: '162px',
    sourceUrl: "/images/make-this.png",
    srcSet: '',
    sizes: '',
    placeholder: '/images/make-this.png',
  }
  const makeThisArrow: IMediaDetailSize = {
    altTitle: `Make this tutorial: ${post.title}`,
    height: '340px',
    width: '272px',
    sourceUrl: "/images/make-this-arrow-1.png",
    srcSet: '',
    sizes: '',
    placeholder: '/images/make-this-arrow-1.png',
  }

  return (
    <motion.div
      key={post.slug}
      initial={{
        opacity: 0,

      }}
      animate={{
        opacity: 1,
        transition: {
          delay: .3,
        }
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0
        }
      }}
      className='z-20 flex flex-col col-span-2 col-start-2 mb-8 card_conainter tablet:col-start-auto tablet:col-auto desktop:mb-16'>

      <div className='flex rounded-xl overflow-hidden transform transition-all shadow-md duration-500 translate-y-0 laptop:hover:shadow-et_4 laptop:hover:translate-y-[-5px] relative flex-1 bg-white'>
        <Link className='flex flex-col justify-start' to={`../${post.slug}`} prefetch={'intent'}>

          <div className="wrapper">
            {/* Make This */}
            {post.tutorialManager
              && post.tutorialManager.thumbnail.image
              && post.tutorialManager.thumbnail.type === 'make'
              && (
                <div className={'absolute top-[10px] left-[15px] w-[40%] z-10'}>
                  <div className='relative z-10'>
                    <LazyImageBase
                      image={makeThisImage}
                      id={post.id}
                      scrollPosition={scrollPosition}
                      reverse={true}
                    />
                  </div>
                  <div className={'absolute w-[40%] left-[71%] z-[5] top-[20px]'}>
                    <LazyImageBase
                      image={makeThisArrow}
                      id={post.id}
                      scrollPosition={scrollPosition}
                    />
                  </div>
                </div>
              )}

            {/* CARD IMAGE */}
            <div className={`relative ${paddingBottom} ${marginBottom}`}>
              <div className="rounded-t-2.5xl overflow-hidden flex absolute h-full top-0 w-full">
                <LazyImageBase image={postImage} id={post.id} scrollPosition={scrollPosition} />
                {/* <LazyLoadImage
                  key={post.id}
                  alt={postImage.altTitle}
                  effect="blur"
                  srcSet={postImage.srcSet}
                  sizes={postImage.sizes}
                  placeholderSrc={postImage.placeholder}
                  // Make sure to pass down the scrollPosition,
                  // this will be used by the component to know
                  // whether it must track the scroll position or not
                  scrollPosition={scrollPosition}
                  src={postImage.sourceUrl}
                  height={`${postImage.height}px`}
                  width={`${postImage.width}px`}
                /> */}
              </div>
            </div>

            {/* CARD TEXT */}
            <div className='flex flex-col items-center justify-center flex-1 px-3 pt-2 text-center pb-7 desktop:px-9'>
              <div className='font-black tracking-widest text-h3 text-primary-700 desktop:text-h3'>
                <div className='mb-2'>
                  {postTitle.subTitle && <div style={{ textTransform: 'inherit' }} className='block mb-3 font-medium tracking-normal lowercase text-h5 font-sentinel__SemiBoldItal'>{postTitle.subTitle}</div>}
                  <span className="uppercase">{postTitle.title}</span>
                </div>
                {splitTitle.subTitle && <div className='mb-3 text-xl font-light tracking-wide tablet:text-lg desktop:text-xl'>{splitTitle.subTitle}</div>}
              </div>
              {skill
                ?
                <div className='flex flex-row items-center justify-center my-3 text-warning-700'>
                  <div className='w-[24px] mr-1'><BarChartSvg fill={'var(--warning-700)'} /></div>
                  <div className='mr-1'>Skill Level:</div>
                  <div className='font-semibold capitalize'>{skill.name}</div>
                </div>
                : null}
            </div>
          </div>

        </Link>

      </div>

    </motion.div>
  )
}

export default PostCardOne
