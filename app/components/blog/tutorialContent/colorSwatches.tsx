import CircularStrokeBtn from "~/components/buttons/circularStrokeBtn"

interface Props {
  multipleLayout: boolean
  downloadUrl: string
}

function ColorSwatches(props: Props) {
  const { multipleLayout, downloadUrl } = props
  const cssSingleContainer = 'laptop:mr-8 flex-auto'
  const cssMultipleContainer = `tablet:flex-auto laptop:mr-0`

  const handleDownloadClick = () => {
    window.open(downloadUrl);
  }

  return (
    <div className={`bg-white text-white relative rounded-2.5xl overflow-hidden px-[45px] py-[30px] shadow-xs flex items-center tablet:py-[52px] laptop:mb-0 ${multipleLayout ? cssMultipleContainer : cssSingleContainer}`}>
      <div className={`swatch_content relative max-w-[300px] flex flex-col z-10 tablet:mt-0 tablet:mr-44 ${multipleLayout ? 'mt-52 tablet:mr-44' : 'mt-52 laptop:mr-4'}`}>
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
      <div className={`swatch_img w-full max-w-400px top-[-80px] right-[0px] left-auto absolute z-0 tablet:top-auto tablet:bottom-0 tablet:right-[-350px] ${multipleLayout ? '' : ''}`}>
        <img src="/images/swatch-color-card.jpg" alt="Every Tuesday Ipad Color Swatches" />
      </div>
    </div>
  )
}

export default ColorSwatches
