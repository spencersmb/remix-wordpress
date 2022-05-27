import { Link } from '@remix-run/react'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'


interface Props {
  post: IPost
}

function BlogAuthor(props: Props) {
  const { post } = props

  return (
    <div data-testid="blogAuthor-test" className='flex flex-col flex-wrap items-center tablet:flex-row'>

      {/* IMAGE */}
      <div className='tablet:mr-2'>
        <div className='w-[100px]'>
          <div className='overflow-hidden rounded-full max-w-none lazy-load-wrapper lazy-load-wrapper-block lazy-load-image-full'>
            <LazyLoadImage
              height={`96px`}
              width={`96px`}
              alt="Teela Cunningham Author"
              effect="blur"
              src={post.author.avatar.url} // use normal <img> attributes as props
            />
          </div>

          {/* <img className='rounded-full max-w-none' src={post.author.avatar.url} alt="Teela Cunningham Author" /> */}
        </div>
      </div>

      {/* AUTHOR INFO */}
      <div className='my-4 flex flex-col justify-center flex-[1] text-center tablet:my-0 tablet:text-left'>
        <div className='mb-2 text-sm text-neutral-600'>Written By</div>
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
