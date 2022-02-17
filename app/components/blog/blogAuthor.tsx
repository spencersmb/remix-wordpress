import React from 'react'
import { Link } from 'remix'

interface Props {
  post: IPost
}

function BlogAuthor(props: Props) {
  const { post } = props

  return (
    <div className='flex flex-col tablet:flex-row flex-wrap items-center'>

      {/* IMAGE */}
      <div className='tablet:mr-2'>
        <div className='w-[100px]'>
          <img className='max-w-none rounded-full' src={post.author.avatar.url} alt="Teela Cunningham Author" />
        </div>
      </div>

      {/* AUTHOR INFO */}
      <div className='my-4 flex flex-col justify-center flex-[1] text-center tablet:my-0 tablet:text-left'>
        <div className='text-sm text-neutral-600 mb-2'>Written By</div>
        <div className='text-primary-600 font-sentinel__SemiBoldItal text-h3'>Teela Cunningham</div>
        <div className='text-base text-primary-600'>Every Tuesday's content creator and founder.</div>
      </div>

      {/* BUTTON */}
      <div className='mt-2 flex-[1_1_100%] tablet:flex-[0_1_auto] items-center justify-center tablet:self-end pb-2 tablet:mt-0'>
        <Link to={'/about'} prefetch='intent' className='btn btn-primary' >About Me</Link>
      </div>
    </div>
  )
}

export default BlogAuthor
