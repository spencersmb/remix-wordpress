import { fallBackImageEnum, ImageSizeEnums } from "@App/enums/imageEnums"
import { fallBackImages, loadImageSrc } from "@App/utils/imageHelpers"
import { formatDate } from "@App/utils/posts"
import { Link } from "@remix-run/react"

// Todo: test
interface CardProps {
  post: SearchPostResult
}
const SmallPostCard = ({ post }: CardProps) => {
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
    <Link
      className='bg-white transition-all translate-y-0 duration-300 rounded-2.5xl shadow-et_1 overflow-hidden hover:shadow-et_4 hover:-translate-y-1'
      to={`/${slug}`} prefetch='intent'
    >
      <div className='w-full lazy-load-wrapper lazy-load-wrapper-block lazy-load-image-full'>
        <img
          className='animate-fadeIn'
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
  )
}

export default SmallPostCard
