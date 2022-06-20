import { ImageSizeEnums } from "@App/enums/imageEnums"
import { defaultImages, fallBackImageEnum, fallBackImages, loadImageSrc, loadThumbnailSrc } from "@App/utils/imageHelpers"
import { formatDate } from "@App/utils/posts"
import { Link } from "@remix-run/react"
import type { ScrollPosition } from "react-lazy-load-image-component"
import LazyImageBase from "../images/lazyImage-base"

//Todo: test
interface CardProps {
  post: ISearchResult
  scrollPosition: ScrollPosition
}
const SmallPostCard = ({ post, scrollPosition }: CardProps) => {
  const { slug, title, date } = post
  const image = loadImageSrc({
    imageSizeName: ImageSizeEnums.THUMBNAIL, // image name to try and get
    imageObject: post.featuredImage?.node || null, // the featured image object
    fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
    fallbackImage: fallBackImages[fallBackImageEnum.THUMBNAIL]
  })

  let postImage = loadThumbnailSrc(post.tutorialManager, image)

  return (
    <div className='py-10 text-lg'
    >
      <Link to={`/${slug}`} prefetch='intent'>
        <LazyImageBase
          testId="post-card-one-feature-image"
          image={postImage}
          id={post.slug}
          scrollPosition={scrollPosition}
          disableSrcSet={true} />
        <h3>{title}</h3>
        <p>{formatDate(date)}</p>
      </Link>
    </div>
  )
}

export default SmallPostCard
