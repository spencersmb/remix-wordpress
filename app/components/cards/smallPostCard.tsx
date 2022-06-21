import { ImageSizeEnums } from "@App/enums/imageEnums"
import { checkForPx, defaultImages, fallBackImageEnum, fallBackImages, loadImageSrc, loadThumbnailImage, loadThumbnailSrc } from "@App/utils/imageHelpers"
import { formatDate } from "@App/utils/posts"
import { Link } from "@remix-run/react"
import type { ScrollPosition } from "react-lazy-load-image-component";
import { LazyLoadImage } from "react-lazy-load-image-component"
import LazyImageBase from "../images/lazyImage-base"

//Todo: test
interface CardProps {
  post: ISearchResult
  scrollPosition: ScrollPosition
}
const SmallPostCard = ({ post, scrollPosition }: CardProps) => {
  const { slug, title, date } = post
  const postImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.MEDIUM, // image name to try and get
    imageObject: post.featuredImage?.node || null, // the featured image object
    fallbackSize: ImageSizeEnums.MEDIUM, // fallback size to use if the image name doesn't exist
    fallbackImage: fallBackImages[fallBackImageEnum.MEDIUM]
  })

  // let postImage = loadThumbnailSrc(post.tutorialManager, image)
  // let postImage = loadThumbnailImage(
  //   post.tutorialManager,
  //   post.featuredImage?.node || null,
  //   ImageSizeEnums.THUMBNAIL_SM
  // )


  return (
    <div className='bg-white transition-all translate-y-0 duration-300 rounded-2.5xl shadow-et_1 overflow-hidden mb-4 hover:shadow-et_4 hover:-translate-y-1'>
      <Link to={`/${slug}`} prefetch='intent'>
        <div className='w-full lazy-load-wrapper lazy-load-wrapper-block lazy-load-image-full'>
          <img
            src={postImage.sourceUrl}
            aria-label='Product Image'
            key={slug}
          />
        </div>
        <div className="px-6 py-4">
          <p className="mb-1 text-sm text-grey-600">{formatDate(date)}</p>
          <h3 className="text-2xl font-sentinel__SemiBoldItal">{title}</h3>
        </div>
      </Link>
    </div>
  )
}

export default SmallPostCard
