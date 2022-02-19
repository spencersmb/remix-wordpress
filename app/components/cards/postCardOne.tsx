import { motion } from "framer-motion";
import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
import { Link } from "remix"
import { checkTitleForBrackets, createThumbnailImage, findSkillLevel, ImageSizeEnums, loadImageSrc, loadThumbnailSrc, parseStringForSpecialCharacters, splitProgramNameInTitle } from "~/utils/posts";
import BarChartSvg from "../svgs/barChartSvg";

import { defaultImages } from "~/utils/imageHelpers";

interface Props {
  post: IPost
  scrollPosition: ScrollPosition
}

function PostCardOne(props: Props) {
  const { post, scrollPosition } = props
  const splitTitle = splitProgramNameInTitle(post.title)
  const skill = findSkillLevel(post.categories);
  const image = loadImageSrc({
    name: ImageSizeEnums.THUMBNAIL, // image name to try and get
    postFeaturedImage: post.featuredImage, // the featured image object
    fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.thumbnail
  })

  let postTitle = checkTitleForBrackets(splitTitle.title)
  let postImage = loadThumbnailSrc(post.tutorialManager, image)
  const paddingBottom = post.tutorialManager && post.tutorialManager.thumbnail.image ? "pb-[92%]" : "pb-[80%]"

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
            {/* CARD IMAGE */}
            <div className={`relative ${paddingBottom}`}>
              <div className="rounded-2.5xl overflow-hidden flex absolute h-full top-0 w-full lazy-load-wrapper">
                {/* {createThumbnailImage(post.tutorialManager, image, post.title, false)} */}
                <LazyLoadImage
                  key={post.id}
                  alt={postImage.altTitle}
                  effect="blur"
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
