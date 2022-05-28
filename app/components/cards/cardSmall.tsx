import React from 'react'
import type { ScrollPosition } from 'react-lazy-load-image-component';
import LazyImageBase from '../images/lazyImage-base'
import UploadSvg from '../svgs/uploadSvg'

interface Props {
  image: ImageLookupReturn
  title: string,
  excerpt: string
  id: string | number
  scrollPosition: ScrollPosition
  buttonText: string
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
/**
 * Card Small
 * 
 * @tested - 5/28/2022
 * @returns 
 */
function CardSmall(props: Props) {
  const {
    id,
    image,
    title,
    excerpt,
    scrollPosition,
    buttonText,
    handleButtonClick
  } = props

  return (
    <div
      data-testid="card-small"
      className='mb-12 flex flex-col bg-white rounded-2.5xl p-4 shadow-et_1 transition-shadow will-change-auto hover:shadow-xxl-red'>
      <div className={`cardWrapper relative overflow-hidden rounded-2xl`}>
        <LazyImageBase image={image} id={id} scrollPosition={scrollPosition} />
      </div>
      <h3 className='my-2 mt-4 text-2xl font-sentinel__SemiBoldItal text-primary-900'>{title}</h3>
      <p className='flex-1 mb-8'>{excerpt}</p>
      <button data-testid='card-button' className=' btn rounded-[13px] btn-teal-400 text-lg font-medium  flex flex-row flex-none justify-center items-center' onClick={handleButtonClick}>
        <span className='max-w-[24px] mr-3'><UploadSvg stroke={'currentColor'} /></span>
        <span>{buttonText}</span>
      </button>
    </div>
  )
}

export default CardSmall

