import { motion } from "framer-motion";
import type { ScrollPosition } from "react-lazy-load-image-component";
import { checkTitleForBrackets, findSkillLevel, splitProgramNameInTitle } from "@App/utils/posts";
import BarChartSvg from "../svgs/barChartSvg";
import { defaultImages, loadImageSrc, loadThumbnailSrc } from "@App/utils/imageHelpers";
import LazyImageBase from "../images/lazyImage-base";
import { Link } from "@remix-run/react";
import { ImageSizeEnums } from "@App/enums/imageEnums";
// import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  post: IPost
  scrollPosition: ScrollPosition
}
/**
 * PostCardOne Component
 * @tested - 5/28/2022
 */
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

  const makeThisImage: ImageLookupReturn = {
    altTitle: `Make this tutorial: ${post.title}`,
    height: '373',
    width: '162',
    sourceUrl: "/images/make-this.png",
    srcSet: '',
    sizes: '',
    placeholder: '/images/make-this.png',
    file: 'make-this.png',
    mimeType: 'image/png',
    name: 'make-this',
  }
  const makeThisArrow: ImageLookupReturn = {
    altTitle: `Make this tutorial: ${post.title}`,
    height: '340',
    width: '272',
    sourceUrl: "/images/make-this-arrow-1.png",
    srcSet: '',
    sizes: '',
    placeholder: '/images/make-this-arrow-1.png',
    file: 'make-this-arrow-1.png',
    mimeType: 'image/png',
    name: 'make-this-arrow-1',

  }

  return (
    <motion.div
      data-testid="post-card-one"
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

      <div className='flex overflow-hidden transform transition-all shadow-md duration-500 translate-y-0 laptop:hover:shadow-et_4 laptop:hover:translate-y-[-5px] relative flex-1 bg-white'>
        <Link className='flex flex-col justify-start' to={`../${post.slug}`} prefetch={'intent'}>

          <div data-testid="post-card-one-image-wrapper" className="wrapper">
            {/* Make This */}
            {/* {post.tutorialManager
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
              )} */}

            {/* CARD IMAGE */}
            <div className={`relative ${marginBottom}`}>
              <div className="top-0 flex w-full h-full overflow-hidden">
                <LazyImageBase testId="post-card-one-feature-image" image={image} id={post.id} scrollPosition={scrollPosition} disableSrcSet={true} />
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
              <div className='font-black tracking-widest text-h3 tablet:text-xl tablet:leading-[1.75rem] laptop:text-2xl text-primary-700 desktop:text-h3'>
                <div className='mb-2'>
                  {postTitle.subTitle && <div aria-label="subTitle" style={{ textTransform: 'inherit' }} className='block mb-3 font-medium tracking-normal lowercase text-h5 font-sentinel__SemiBoldItal'>{postTitle.subTitle}</div>}
                  <span data-testid="post-card-one-title" className="uppercase">{postTitle.title}</span>
                </div>
                {splitTitle.subTitle && <div aria-label="split-title" className='mb-3 text-xl font-light tracking-wide tablet:text-lg desktop:text-xl'>{splitTitle.subTitle}</div>}
              </div>
              {skill
                ?
                <div aria-label="post-card-skill-level" className='flex flex-row items-center justify-center my-3 text-warning-700'>
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
