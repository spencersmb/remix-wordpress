import React from 'react'
import LazyImageBase from '../images/lazyImage-base'

interface Props {
  children?: React.ReactNode
  title: string
  description?: string
  image?: IMediaDetailSize
}

function CardTall(props: Props) {
  const { children, title, description, image } = props

  return (
    <div className='bg-white rounded-2.5xl p-4 desktop:mb-0 flex-1 flex flex-col'>

      <div className='mt-5 max-w-[278px] mx-auto flex-1'>
        <div className='mb-6 text-center text-slate-600 font-sentinel__SemiBoldItal text-heading-3'>
          {title}
        </div>

        {description && <div className='mb-10 text-center'>{description}</div>}
      </div>

      {image && <div className='overflow-hidden rounded-xl'><LazyImageBase id={title.replace(' ', '-')} image={image} /></div>}


      {children}

    </div>
  )
}

export default CardTall
