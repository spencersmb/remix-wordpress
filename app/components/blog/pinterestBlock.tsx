import { LazyLoadImage } from "react-lazy-load-image-component"
import { defaultImages, ImageSizeEnums, loadImageSrc } from "~/utils/imageHelpers"
import CircularStrokeBtn from "../buttons/circularStrokeBtn"
import PinterestP_Svg from "../svgs/social/Pinterest-P-Svg"
import Stroke1 from "../svgs/strokes/stroke-1"

interface IProps {
  post: IPost
  postUrl: string
}

function PinterestBlock(props: IProps) {
  const { post, postUrl } = props

  let description = post.etSocialNav.pinterestMeta.description

  let pinterestImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.THUMBNAIL, //rename to imageSizeName
    imageObject: post.etSocialNav.pinterestImage, // rename to Image Object
    fallbackSize: ImageSizeEnums.THUMBNAIL, // rename to imageSizeName
    fallbackImage: {
      ...defaultImages.pinterest,
    }
  })

  return (
    <div className="col-start-2 col-span-2 mt-2 mb-8 tablet:col-start-3 tablet:col-span-10 desktop:col-start-4 desktop:col-span-8">

      {/* UI CARD */}
      <div className="relative max-w-[350px] tablet:max-w-[500px] mx-auto">

        {/* CARD CONTAINER */}
        <div className="bg-white flex flex-col-reverse shadow-xl rounded-lg overflow-hidden z-10 relative tablet:flex-row">

          {/* Content */}
          <div className="flex py-7 px-9 pl-11">
            <a
              className="flex flex-col justify-center items-center "
              rel="nofollow"
              target="_blank"
              href={`https://pinterest.com/pin/create/button/?url=${postUrl}&media=${pinterestImage.sourceUrl}&description=${description}`}>
              <div className="bg-primary-500 rounded-full w-[42px] h-[42px] flex justify-center items-center mb-4 shadow-xl">
                <div>
                  <PinterestP_Svg fill={'#fff'} width={'24px'} height={'24px'} />
                </div>
              </div>
              <div className="font-sentinel__SemiBoldItal text-primary-500 text-h4 mb-2">Save for later</div>
              <p className="text-center mb-8">Create your own personal library of my tutorials you love!</p>

              <CircularStrokeBtn text='Pin It' classes="py-[21px] px-[38px]" />
            </a>

          </div>

          {/* IMAGE */}

          <div className="w-[100%] max-w-[350px] mx-auto my-0 relative h-[200px] overflow-hidden tablet:h-auto">
            <div className="absolute top-0 left-0 tablet:top-[50%] tablet:left-[50%] w-full tablet:max-w-none transform tablet:translate-x-[-50%] tablet:translate-y-[-50%] desktop:rounded-xl overflow-hidden">
              <div className="lazy-load-wrapper">
                <LazyLoadImage
                  height={`${pinterestImage.height}px`}
                  width={`${pinterestImage.width}px`}
                  alt={`Save to Pinterest: ${post.title}`}
                  effect="blur"
                  className="w-full max-w-none"
                  sizes={pinterestImage.sizes}
                  srcSet={pinterestImage.srcSet}
                  src={pinterestImage.sourceUrl} // use normal <img> attributes as props
                  placeholderSrc={pinterestImage.placeholder}
                />
              </div>

            </div>
          </div>
        </div>

        {/* STROKE */}
        <div className="absolute w-[1161px] top-1/2 left-[50%] transform translate-x-[-50%] -translate-y-1/2 z-0">
          <Stroke1 fill="#EBBFB6" />
        </div>
      </div>


    </div>
  )
}
export default PinterestBlock