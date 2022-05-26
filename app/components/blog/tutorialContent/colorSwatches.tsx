import Imgix, { Picture, Source } from "react-imgix"
import CircularStrokeBtn from "@App/components/buttons/circularStrokeBtn"
import { staticImages } from "@App/lib/imgix/data"

interface Props {
  multipleLayout: boolean
  downloadUrl: string
}

/**
 * ColorSwatches Component
 * @tested - 5/25/2022
 * @param props 
 */
function ColorSwatches(props: Props) {
  const { multipleLayout, downloadUrl } = props

  const handleDownloadClick = () => {
    window.open(downloadUrl, '_blank');
  }

  // Mulitple Layouts means we need the show the horizontal layout
  const wrapper = multipleLayout
    ? 'swatch_horizontal relative items-center tablet:flex-auto laptop:mr-0'
    : 'swatch_vertical relative flex laptop:mr-0 tablet:flex-[0_1_50%]'

  const inner = multipleLayout
    ? 'tablet:py-[52px] tablet:flex-auto laptop:mr-0'
    : 'tablet:mb-0 flex tablet:items-end'

  const swatchContent = multipleLayout
    ? 'tablet:max-w-[300px] tablet:mt-0 tablet:mr-44 mt-[75%]'
    : 'mt-[75%] tablet:mt-0 tablet:mb-8'

  const imageStyles = multipleLayout
    ? `swatch_img w-full top-[-80px] right-[0px] left-auto absolute z-0 tablet:top-auto tablet:bottom-0 tablet:right-[-350px]`
    : `swatch_img w-full max-w-[400px] top-[-80px] right-[0px] left-[50%] translate-x-[-50%] absolute z-0 tablet:top-[7%]`
  return (
    <div
      data-testid="test-colorSwatch"
      className={wrapper}>
      <div className={`bg-white text-white relative rounded-2.5xl overflow-hidden px-[45px] py-[30px] shadow-xs tablet:py-[52px] mb-8 ${inner}`}>

        <div className={`swatch_content relative flex flex-col z-10 ${swatchContent}`}>

          <div className="mb-2 text-primary-600 font-sentinel__SemiBoldItal text-h4">
            Free Color Swatches
          </div>

          <p className="mb-5 text-lg text-primary-500">
            Download the free clolor swatches instantly for this tutorial!
          </p>
          <div className="text-primary-600">
            <CircularStrokeBtn handleClick={handleDownloadClick} text="Download" classes="py-[21px] px-[24px]" />
          </div>
        </div>
        <div className={imageStyles}>
          <Picture >
            <Source
              attributeConfig={{
                src: 'data-src',
                srcSet: 'data-srcset',
                sizes: 'data-sizes'
              }}
              src={staticImages.assets.swatchPalette.freebie.src}
              width={800}
              htmlAttributes={{ media: "(min-width: 768px)" }}
            />
            <Imgix
              className="w-full lazyload"
              src={staticImages.assets.swatchPalette.freebie.src}
              attributeConfig={{
                src: 'data-src',
                srcSet: 'data-srcset',
                sizes: 'data-sizes'
              }}
              imgixParams={{ w: 400 }}
              htmlAttributes={{
                src: staticImages.assets.swatchPalette.freebie.placeholder, // low quality image here
              }} />
          </Picture>
        </div>
      </div>
    </div>
  )
}

export default ColorSwatches
