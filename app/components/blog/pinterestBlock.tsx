import { createImgixSizes, defaultImages, loadImageSrc } from "@App/utils/imageHelpers"
import CircularStrokeBtn from "../buttons/circularStrokeBtn"
import LazyImageBase from "../images/lazyImage-base"
import PinterestSvg from "../svgs/social/Pinterest-P-Svg"
import Stroke1 from "../svgs/strokes/stroke-1"
import { ImageSizeEnums } from "@App/enums/imageEnums"
import LazyImgix from "../images/lazyImgix"
import { staticImages } from "@App/lib/imgix/data"

interface IProps {
  post: IPost
  postUrl: string
}
/**
 * PinterestBlock
 * 
 * @tested - 5/27/2022
 * 
 * @param props 
 * @returns 
 */
function PinterestBlock(props: IProps) {
  const { post, postUrl } = props

  let description = post.etSocialNav.pinterestMeta.description

  let pinterestImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.MEDIUM, //rename to imageSizeName
    imageObject: post.etSocialNav.pinterestImage, // rename to Image Object
    fallbackSize: ImageSizeEnums.THUMBNAIL, // rename to imageSizeName
    fallbackImage: {
      ...defaultImages.pinterest,
    }
  })
  let pinterestScribble = createImgixSizes({
    width: staticImages.scribbles.scribble_6.width,
    height: staticImages.scribbles.scribble_6.height,
    alt: 'Hand drawn scribble in Procreate',
    src: staticImages.scribbles.scribble_6.src,
    mobileSize: 600
  })
  let tape = createImgixSizes({
    width: staticImages.tape.tape_1.width,
    height: staticImages.tape.tape_1.height,
    alt: 'Every-Tuesday custom tape',
    src: staticImages.tape.tape_1.src,
    mobileSize: 600
  })

  return (
    <div className="col-span-2 col-start-2 mt-2 mb-8 tablet:col-start-3 tablet:col-span-10 desktop:col-start-4 desktop:col-span-8">

      {/* UI CARD */}
      <div className="relative max-w-[350px] tablet:max-w-[500px] mx-auto rotate-[-5deg]">

        <div className=" hidden tablet:block absolute w-[130px] top-[-15px] left-[75px] z-[11]">
          <LazyImgix
            id={'iPadTape'}
            image={tape.image}
          />
        </div>


        {/* CARD CONTAINER */}
        <div className="relative z-10 flex flex-col-reverse overflow-hidden bg-white rounded-lg shadow-xl tablet:flex-row">

          {/* Content */}
          <div className="flex pt-10 py-7 px-9 pl-11">
            <a
              data-testid="pinterest-link"
              className="flex flex-col items-center justify-center "
              rel="nofollow noreferrer"
              target="_blank"
              href={`https://pinterest.com/pin/create/button/?url=${postUrl}&media=${pinterestImage.sourceUrl}&description=${description}`}>
              <div className="bg-[#E60023] rounded-full w-[42px] h-[42px] flex justify-center items-center mb-4">
                <div>
                  <PinterestSvg fill={'#fff'} width={'24px'} height={'24px'} />
                </div>
              </div>
              <div className="mb-2 font-sentinel__SemiBoldItal text-grey-800 text-h4">Save for later</div>
              <p className="mb-8 text-center text-grey-700">Create your own personal library of my tutorials you love!</p>

              <CircularStrokeBtn text='Pin It' classes="py-[21px] px-[38px]" />
            </a>

          </div>

          {/* IMAGE */}

          <div className="w-[100%] max-w-[350px] mx-auto my-0 relative h-[200px] overflow-hidden tablet:h-auto flex">
            <div className="flex absolute top-0 left-0 tablet:top-[50%] tablet:left-[50%] w-full tablet:max-w-none transform tablet:translate-x-[-50%] tablet:translate-y-[-50%] h-full overflow-hidden">
              <LazyImageBase
                alt={`Pinterest: ${post.title}`}
                testId="pinterest-image"
                image={pinterestImage}
                id={post.id}
                reverse />
            </div>
          </div>
        </div>

        {/* STROKE */}
        {/* <div className="absolute w-[1161px] top-1/2 left-[50%] transform translate-x-[-50%] -translate-y-1/2 z-0">
          <Stroke1 fill="#EBBFB6" />
        </div> */}
        <div className="absolute w-[381px] top-[100px] left-[-181px] transform rotate-[75deg] origin-center z-0">
          <LazyImgix
            id={'pinterestScribble'}
            image={pinterestScribble.image}
          // sizes="(max-width: 666px) 40vw, 1200px"
          // srcSet={
          //   `
          //   ${flowerBouquet.defaultSrc}&w=600&fit=clip 600w,
          //   ${flowerBouquet.defaultSrc}&w=1200&fit=clip 1200w,
          //   `}
          />
        </div>
      </div>


    </div>
  )
}
export default PinterestBlock