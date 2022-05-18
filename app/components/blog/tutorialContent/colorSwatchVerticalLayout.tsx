import CircularStrokeBtn from "~/components/buttons/circularStrokeBtn"

interface Props {
  downloadUrl: string
}

function ColorSwatchesVerticalLayout(props: Props) {
  const { downloadUrl } = props
  const cssSingleContainer = 'laptop:mr-4 flex-auto'
  const cssMultipleContainer = `tablet:flex-auto laptop:mr-0`

  const handleDownloadClick = () => {
    window.open(downloadUrl);
  }

  return (
    <div className="relative flex laptop:mr-0 tablet:flex-[0_1_50%]">
      <div className={`bg-white text-white relative rounded-2.5xl overflow-hidden px-[45px] py-[30px] shadow-xs mb-8 tablet:mb-0 flex tablet:items-end ${cssSingleContainer}`}>
        <div className={`swatch_content relative flex flex-col z-10 mt-[75%] tablet:mt-0 tablet:mb-8`}>
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
        <div className={`swatch_img w-full max-w-[400px] top-[-80px] right-[0px] left-[50%] translate-x-[-50%] absolute z-0 tablet:top-[7%]`}>
          <img src="/images/swatch-color-card.jpg" alt="Every Tuesday Ipad Color Swatches" />
        </div>
      </div>
    </div>
  )
}

export default ColorSwatchesVerticalLayout
