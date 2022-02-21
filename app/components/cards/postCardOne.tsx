import { motion } from "framer-motion";
import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
import { Link } from "remix"
import { checkTitleForBrackets, findSkillLevel, splitProgramNameInTitle } from "~/utils/posts";
import BarChartSvg from "../svgs/barChartSvg";
import { defaultImages, ImageSizeEnums, loadImageSrc, loadThumbnailSrc } from "~/utils/imageHelpers";

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
      className='card_conainter flex flex-col mb-8 col-start-2 col-span-2 tablet:col-start-auto tablet:col-auto z-20 desktop:mb-16'>

      <div className='flex rounded-xl overflow-hidden transform transition-all shadow-md duration-500 translate-y-0 laptop:hover:shadow-et_4 laptop:hover:translate-y-[-5px] relative flex-1 bg-white'>
        <Link className='flex flex-col justify-start' to={`../${post.slug}`} prefetch={'intent'}>

          <div className="wrapper">
            {/* Make This */}
            {post.tutorialManager && post.tutorialManager.thumbnail.image && post.tutorialManager.thumbnail.type === 'make' && (
              <div className={'absolute top-[10px] left-[15px] w-[40%] z-10'}>
                <div className='lazy-load-wrapper lazy-load-image-full relative z-10'>
                  <LazyLoadImage
                    height={'373px'}
                    width={'162px'}
                    alt={`Make this tutorial: ${post.title}`}
                    effect="blur"
                    src="/images/make-this.png" // use normal <img> attributes as props
                  />
                </div>
                <div className={'absolute w-[40%] left-[71%] z-[5] top-[20px]'}>
                  <div className='lazy-load-wrapper lazy-load-image-full'>
                    <LazyLoadImage
                      width={'272px'}
                      height={'340px'}
                      alt={`Make this tutorial: ${post.title}`}
                      effect="blur"
                      src="/images/make-this-arrow-1.png"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CARD IMAGE */}
            <div className={`relative ${paddingBottom} ${marginBottom}`}>
              <div className="rounded-t-2.5xl overflow-hidden flex absolute h-full top-0 w-full lazy-load-wrapper">
                <LazyLoadImage
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
                />
              </div>
            </div>

            {/* CARD TEXT */}
            <div className='flex flex-col flex-1 pt-2 px-3 pb-7 text-center justify-center items-center desktop:px-9'>
              <div className='text-h3 text-primary-700 font-black  desktop:text-h3 tracking-widest'>
                <div className='mb-2'>
                  {postTitle.subTitle && <div style={{ textTransform: 'inherit' }} className='text-h5 font-medium tracking-normal mb-3 block font-sentinel__SemiBoldItal lowercase'>{postTitle.subTitle}</div>}
                  <span className="uppercase">{postTitle.title}</span>
                </div>
                {splitTitle.subTitle && <div className='font-light text-xl tablet:text-lg desktop:text-xl mb-3 tracking-wide'>{splitTitle.subTitle}</div>}
              </div>
              {skill
                ?
                <div className='flex flex-row justify-center items-center text-warning-700 my-3'>
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
