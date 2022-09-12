import { classNames } from '@App/utils/appUtils'
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import LazyLoadVideo from './lazyLoadVideo'

interface Props {
  children?: React.ReactNode
  video: string
}

function BackgroundVideoFull(props: Props) {
  const { children, video } = props


  return (
    <>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[730px] overflow-hidden tablet:h-full tablet:w-full tablet:left-auto tablet:translate-x-0 tablet:relative tablet:col-start-1 tablet:col-end-full tablet:row-start-1'>
        <div className='relative block w-full h-full p-0 overflow-hidden'>
          <div data-testid="embed-parent" className='relative h-full'>
            <LazyLoadVideo
              className='h-full video-objectFit'
              video={video} />
          </div>
        </div>
      </div>
      {children}
    </>
  )
}

export default BackgroundVideoFull
