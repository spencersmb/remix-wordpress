function ProcreateMenu1() {
  const className = 'py-4 flex justify-center border-b-[1px] border-neutral-300'
  return (
    <div className='card1_wrapper w-[150px] bg-white rounded-xl shadow-xxl-red'>
      <div className={`item ${className}`}>
        <div className='line bg-primary-100 h-[7px] rounded-xl w-[50%]'></div>
      </div>
      <div className={`item ${className}`}>
        <div className='line bg-primary-100 h-[7px] rounded-xl w-[80%]'></div>
      </div>
      <div className={`item ${className}`}>
        <div className='line bg-primary-100 h-[7px] rounded-xl w-[50%]'></div>
      </div>
      <div className={`item ${className}`}>
        <div className='line bg-primary-100 h-[7px] rounded-xl w-[80%]'></div>
      </div>
    </div>
  )
}

export default ProcreateMenu1
