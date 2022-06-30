import { fallBackImageEnum, ImageSizeEnums } from "@App/enums/imageEnums"
import { fallBackImages, loadImageSrc } from "@App/utils/imageHelpers"
import { formatDate } from "@App/utils/posts"
import { Link } from "@remix-run/react"


interface CardProps {
  post: SearchPostResult
}

/**
* @Component SmallPostCard - Card used for search results
* @teststed - 6/29/2022
*/
const SmallPostCard = ({ post }: CardProps) => {
  const { slug, title, date } = post
  const postImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.MEDIUM, // image name to try and get
    imageObject: post.featuredImage?.node || null, // the featured image object
    fallbackSize: ImageSizeEnums.MEDIUM, // fallback size to use if the image name doesn't exist
    fallbackImage: fallBackImages[fallBackImageEnum.MEDIUM]
  })

  // postImage Example for loadThumbnail layout
  // let postImage = loadThumbnailSrc(post.tutorialManager, image)
  // let postImage = loadThumbnailImage(
  //   post.tutorialManager,
  //   post.featuredImage?.node || null,
  //   ImageSizeEnums.THUMBNAIL_SM
  // )


  return (
    <Link
      data-testid="small-post-card"
      className='bg-white transition-all translate-y-0 duration-300 rounded-2.5xl shadow-et_1 overflow-hidden hover:shadow-et_4 hover:-translate-y-1'
      to={`/${slug}`} prefetch='intent'
    >
      <div className='w-full lazy-load-wrapper lazy-load-wrapper-block lazy-load-image-full'>
        <img
          data-testid="small-post-card-image"
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
