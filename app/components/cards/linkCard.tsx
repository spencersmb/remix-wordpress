import { Link } from '@remix-run/react'
import React from 'react'

interface Props {
  subTitle: string
  title: string
  desciption: string
  link: {
    url: string
    text: string
  }
}

function LinkCard(props: Props) {
  const { title, desciption, link, subTitle } = props

  return (
    <div className='relative flex'>
      <div className='z-1 absolute left-[50%] -translate-x-1/2 w-[80%] bottom-0 bg-red-500 h-[80%] shadow-[0_40px_111px_rgba(0,0,0,0.7)]'></div>
      <div className='relative flex flex-col justify-between w-full p-6 bg-white z-2 rounded-2xl text-grey-800'>
        <div>
          <h3 className='text-sm font-medium text-grey-400'>{subTitle}</h3>
          <h2 className='text-2xl font-semibold'>{title}</h2>
          <p className='py-3 text-grey-700 max-w-[202px]'>
            {desciption}
          </p>
        </div>

        <div className='flex pt-2'>
          <a href={link.url} rel='noreferrer' target={'_blank'} className={'btn btn-outline btn-sm'} >{link.text}</a>
        </div>
      </div>
    </div>
  )

}

export default LinkCard
