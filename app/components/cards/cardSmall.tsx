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
      className='flex flex-col p-4 mb-12 transition-shadow bg-white shadow-et_1 will-change-auto hover:shadow-xxl-grey'>
      <div className={`cardWrapper relative overflow-hidden`}>
        <LazyImageBase image={image} id={id} scrollPosition={scrollPosition} />
      </div>
      <h3 className='my-2 mt-4 text-2xl font-sentinel__SemiBoldItal text-primary-900'>{title}</h3>
      <p className='flex-1 mb-8'>{excerpt}</p>
      <button data-testid='card-button' className='flex flex-row items-center justify-center flex-none text-lg font-medium btn btn-sage-600' onClick={handleButtonClick}>
        <span>{buttonText}</span>
        <span className='max-w-[24px] ml-4'><UploadSvg stroke={'currentColor'} /></span>
      </button>
    </div>
  )
}

export default CardSmall

