import CircularStrokeBtn from "~/components/buttons/circularStrokeBtn"

interface Props {
  multipleLayout: boolean
}

function ColorSwatches(props: Props) {
  const { multipleLayout } = props
  const cssSingleContainer = 'laptop:mr-8 flex-auto'
  const cssMultipleContainer = `tablet:flex-auto laptop:mr-0`

  return (
    <div className={`bg-white text-white relative rounded-2.5xl overflow-hidden px-[45px] py-[30px] shadow-xs flex items-center tablet:py-[50px] laptop:mb-0 ${multipleLayout ? cssMultipleContainer : cssSingleContainer}`}>
      <div className={`swatch_content relative max-w-[300px] flex flex-col z-10 tablet:mt-0 tablet:mr-44 ${multipleLayout ? 'mt-52 tablet:mr-44' : 'mt-52 laptop:mr-4'}`}>
        <div className="text-primary-600 font-sentinel__SemiBoldItal text-h4 mb-2">
          Free Color Swatches
        </div>
        <p className="text-primary-500 text-lg mb-5">
          Download the free clolor swatches instantly for this tutorial!
        </p>
        <div className="text-primary-600">
          <CircularStrokeBtn text="Download" classes="py-[21px] px-[24px]" />
        </div>
      </div>
      <div className={`swatch_img w-full max-w-400px top-[-80px] right-[0px] left-auto absolute z-0 tablet:top-auto tablet:bottom-0 tablet:right-[-350px] ${multipleLayout ? '' : ''}`}>
        <img src="/images/swatch-color-card.jpg" alt="Every Tuesday Ipad Color Swatches" />
      </div>
    </div>
  )
}

export default ColorSwatches
