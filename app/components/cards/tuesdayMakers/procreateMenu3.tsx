import StrokeOneSvg from "~/components/svgs/strokes/stroke-1"

interface Props { }

function ProcreateMenu3(props: Props) {
  const className = 'flex justify-center py-1'
  return (
    <div className='bg-white shadow-xxl-red w-[130px] h-[147px] rounded-xl overflow-hidden relative'>
      <div className="image_container absolute w-[300px] top-6 left-[-5px]">
        <StrokeOneSvg fill={'#F0D6C7'} />
      </div>
      <div className="flex flex-col justify-end h-full py-2">
        <div className={`item ${className}`}>
          <div className='line bg-primary-600 h-[7px] rounded-xl w-[50px]'></div>
        </div>
        <div className={`item ${className}`}>
          <div className='line bg-primary-200 h-[7px] rounded-xl w-[35px]'></div>
        </div>
      </div>
    </div>
  )
}

export default ProcreateMenu3
