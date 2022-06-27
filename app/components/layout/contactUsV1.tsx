import { ChatIcon } from '@heroicons/react/solid'
import { Link } from '@remix-run/react'

interface Props { }

function ContactUsV1(props: Props) {

  return (
    <div className='flex flex-col items-center justify-center col-span-2 col-start-2 mb-32 text-center mt-18 tablet:col-start-2 tablet:col-span-12'>
      <div className='w-[57px] mb-1'>
        <ChatIcon fill='#788F92' />
      </div>
      <div className='mb-8 text-4xl font-sentinel__SemiBoldItal'>
        Still have questions?
      </div>
      <Link
        className='btn btn-primary btn-sage-600'
        to={'/contact-us'}>
        Contact Us
      </Link>
    </div>
  )
}

export default ContactUsV1
