import { Link } from '@remix-run/react'
import React from 'react'

interface Props { }

function ViewLicenseBtn(props: Props) {
  const { } = props

  return (
    <div className='flex flex-row mb-1'>
      <div>License Type</div>
      <div className='pt-[2px] ml-2 text-[14px] italic font-bold text-tangerine-700'>
        <Link
          target={'_blank'}
          className='underline underline-offset-4'
          to={'/licenses'}>What are these?</Link>
      </div>
    </div>
  )
}

export default ViewLicenseBtn
