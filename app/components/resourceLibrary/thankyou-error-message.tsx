import { Link } from '@remix-run/react'
import React from 'react'
import NavPaddingLayout from '../layoutTemplates/navPaddingLayout'
import RedWreathSvg from '../svgs/redWreathSvg'

interface Props {
  message: string
}

function ThankyouErrorMessage(props: Props) {
  const { message } = props

  return (
    <NavPaddingLayout bgColor='bg-cream-100'>
      <div className='relative overflow-hidden et-grid-basic'>
        <div className='w-[1000px] absolute bottom-[250px] laptop:bottom-[-520px] left-1/2 -translate-x-1/2 z-1 laptop:w-[1170px] desktop:bottom-[-600px]'>
          <RedWreathSvg />
        </div>
        <div className='relative col-span-2 col-start-2 px-12 py-12 my-16 text-center bg-white shadow-2xl z-2 tablet:col-start-5 tablet:col-span-6 laptop:my-60 desktop:col-span-4 desktop:col-start-6 desktop:my-40'>

          {/* TEXT */}
          <div className='mb-4 text-5xl font-sentinel__SemiBoldItal text-lfm-cinnamon-700'>
            Error
          </div>
          <div className='mb-10 text-xl text-lfm-cinnamon-700'>
            {message}
          </div>

          {/* BUTTON */}
          <Link prefetch='intent' to={'/tuesday-makers'} className="btn btn-cinnamon btn-lg">
            Try Sign up again
          </Link>
        </div>
      </div>
    </NavPaddingLayout>
  )
}

export default ThankyouErrorMessage
