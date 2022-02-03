import ColorSwatches from "./colorSwatches"

interface IProps {
  post: IPost
}

function PaidProducts(props: IProps) {
  const { post } = props

  return (
    <div className='mb-8 col-start-2 col-span-2 tablet:col-start-3 tablet:col-span-10 desktop:col-start-4 desktop:col-span-8'>
      <div className='flex flex-row'>

        <ColorSwatches />

        <div className='bg-teal-200 flex-1'>
          Paid Product 1
        </div>
      </div>
    </div>
  )
}

export default PaidProducts
