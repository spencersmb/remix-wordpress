import Imgix, { Picture, Source } from "react-imgix"
import CircularStrokeBtn from "~/components/buttons/circularStrokeBtn"

interface Props {
  multipleLayout: boolean
  downloadUrl: string
}

function ColorSwatches(props: Props) {
  const { multipleLayout, downloadUrl } = props
  const cssSingleContainer = 'laptop:mr-8 flex-auto'
  const cssMultipleContainer = `tablet:flex-auto laptop:mr-0`
  const src = 'https://et-website.imgix.net/et-website/images/free-swatch-card.jpg'
  const placeholder = 'https://et-website.imgix.net/et-website/images/free-swatch-card.jpg?w=20&fit=clip'

  const handleDownloadClick = () => {
    window.open(downloadUrl);
  }

  return (
    <div className="relative items-center tablet:flex-auto laptop:mr-0">
      <div className={`bg-white text-white relative rounded-2.5xl overflow-hidden px-[45px] py-[30px] shadow-xs tablet:py-[52px] mb-8 ${multipleLayout ? cssMultipleContainer : cssSingleContainer}`}>
        <div className={`swatch_content relative tablet:max-w-[300px] flex flex-col z-10 tablet:mt-0 tablet:mr-44 mt-[75%]`}>
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
        <div className={`swatch_img w-full top-[-80px] right-[0px] left-auto absolute z-0 tablet:top-auto tablet:bottom-0 tablet:right-[-350px] ${multipleLayout ? '' : ''}`}>
          <Picture >
            <Source
              attributeConfig={{
                src: 'data-src',
                srcSet: 'data-srcset',
                sizes: 'data-sizes'
              }}
              src={src}
              width={800}
              htmlAttributes={{ media: "(min-width: 768px)" }}
            />
            <Imgix
              className="w-full lazyload"
              src={src}
              attributeConfig={{
                src: 'data-src',
                srcSet: 'data-srcset',
                sizes: 'data-sizes'
              }}
              imgixParams={{ w: 400 }}
              htmlAttributes={{
                src: placeholder, // low quality image here
              }} />
          </Picture>
        </div>
      </div>
    </div>
  )
}

export default ColorSwatches
