import { staticImages } from '@App/lib/imgix/data'
import { createImgixSizes } from '@App/utils/imageHelpers'
import { Link } from '@remix-run/react'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import LazyImgix from '../images/lazyImgix'


interface Props {
  post: IPost
}

/**
 * Blog Post Author
 * 
 * @tested - 5/26/2022
 * 
 * 
 */
function BlogAuthor() {
  const author = createImgixSizes({
    width: 200,
    height: 200,
    alt: `Every Tuesday IPad Art`,
    src: staticImages.profiles.teela.square.src,
    mobileSize: 200
  })
  return (
    <div data-testid="blogAuthor-test" className='flex flex-col flex-wrap items-center tablet:flex-row'>

      {/* IMAGE */}
      <div className='relative z-1 tablet:mr-2'>
        <div className='w-[100px]'>
          <div className='overflow-hidden rounded-full max-w-none lazy-load-wrapper lazy-load-wrapper-block lazy-load-image-full'>
            <LazyImgix
              sizes="(max-width: 666px) 70vw, (max-width: 1023px) 75vw, (max-width: 1399px) 70vw, 1180px"
              id={"iPadArt"}
              image={author.image} />
          </div>

        </div>
      </div>

      {/* AUTHOR INFO */}
      <div className='relative z-2 my-4 flex flex-col justify-center flex-[1] text-center tablet:my-0 tablet:text-left text-sage-600 tablet:mt-8'>
        <div className='absolute text-3xl left-[-6px] top-[-45px] tablet:left-[-35px] rotate-[-6deg] mb-2 tablet:text-4xl text-grey-700 font-bonVivant'>Written By</div>
        <div className=' font-sentinel__SemiBoldItal text-h3'>Teela Cunningham</div>
        <div className='text-base text-sage-700'>Every Tuesday's content creator and founder.</div>
      </div>

      {/* BUTTON */}
      <div className='mt-2 flex-[1_1_100%] tablet:flex-[0_1_auto] items-center justify-center tablet:self-end pb-2 tablet:mt-0 laptop:self-auto'>
        <Link to={'/about/our-story'} prefetch='intent' className='btn btn-outline' >About Me</Link>
      </div>
    </div>
  )
}

export default BlogAuthor
