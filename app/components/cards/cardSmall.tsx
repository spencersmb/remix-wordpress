import React from 'react'
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component'
import LazyImageBase from '../images/lazyImage-base'
import UploadSvg from '../svgs/uploadSvg'

interface Props {
  image: IMediaDetailSize
  title: string,
  excerpt: string
  id: string | number
  scrollPosition: ScrollPosition
  buttonText: string
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

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
  const imagePadding = parseInt(image.height, 10) / parseInt(image.width, 10)
  return (
    <div className='mb-12 flex flex-col bg-white rounded-2.5xl p-4 shadow-et_1 transition-shadow will-change-auto hover:shadow-xxl-red'>
      <div className={`cardWrapper relative overflow-hidden rounded-2xl`}>
        <LazyImageBase image={image} id={id} scrollPosition={scrollPosition} />
      </div>
      <h3 className='text-2xl font-sentinel__SemiBoldItal text-primary-900 my-2 mt-4'>{title}</h3>
      <p className='mb-8 flex-1'>{excerpt}</p>
      <button className=' btn rounded-[13px] btn-teal-300 text-lg font-normal  flex flex-row flex-none justify-center items-center' onClick={handleButtonClick}>
        <span className='max-w-[24px] mr-3'><UploadSvg stroke={'currentColor'} /></span>
        <span>{buttonText}</span>
      </button>
    </div>
  )
}

export default CardSmall

