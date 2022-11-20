import { ImageSizeEnums } from '@App/enums/imageEnums';
import { staticImages } from '@App/lib/imgix/data';
import { defaultImages, loadImageSrc } from '@App/utils/imageHelpers';
import { findSkillLevel, formatDate } from '@App/utils/posts';
import React from 'react'
import { Link } from '@remix-run/react';
import LazyImgix from '../images/lazyImgix';
import PolaroidImg from '../images/polaroidImg';
import AccentHeaderText from '../layout/accentHeaderText';

interface Props { post: IPost }

/**
 * @function BlogFeaturePostHomePage
 * @description - Used on the Homepage in the blog section
 * @tested - Snapshot 11/19/2022
 */
function BlogFeaturePostHomePage(props: Props) {
  const { post } = props
  const skill = findSkillLevel(post.categories);
  const image = loadImageSrc({
    imageSizeName: ImageSizeEnums.BLOCK_MEDIUM,
    imageObject: post.featuredImage,
    fallbackSize: ImageSizeEnums.THUMBNAIL,
    fallbackImage: defaultImages.thumbnail
  })

  return (
    <div className='flex flex-col tablet:flex-row tablet:gap-4 tablet:items-start laptop:flex-row-reverse laptop:items-center laptop:justify-end'>

      {/* BLOG IMAGE */}
      <div className="relative max-w-[450px] w-full px-4 mb-[68px] tablet:max-w-[300px] tablet:mb-0 tablet:mt-8 laptop:w-[50%] desktop:max-w-[480px]">
        {/* PIN */}
        <div className='z-2 absolute top-[-48px] left-[45%] -translate-x-1/2 w-[95px] desktop:top-[-50px]'>
          <LazyImgix
            id={'tm-pin'}
            image={{
              alt: 'Tuesday Makers Silver Pin',
              width: staticImages.assets.pins.black_1.width,
              height: staticImages.assets.pins.black_1.height,
              src: staticImages.assets.pins.black_1.src,
              placeholder: staticImages.assets.pins.black_1.placeholder,
            }}
          />
        </div>
        <PolaroidImg wpImage={image} rotate='left' />
      </div>

      <div className='flex flex-col items-start flex-1 mb-12 tablet:mb-0 tablet:mt-14 laptop:max-w-[430px] laptop:w-full'>

        {/* TITLE */}
        <Link to={`/${post.slug}`} prefetch={`intent`} className={`group`}>
          <h2 className='relative text-3xl transition-all duration-300 font-sentinel__SemiBoldItal tablet:text-4xl desktop:text-5xl laptop:group-hover:text-sage-500'>
            <AccentHeaderText text={'Latest Post'} cssOverride={'!top-[-50px] left-[-15px] tablet:!top-[-63px] text-grey-800 laptop:group-hover:text-grey-800 text-4xl'} />
            {post.title}
          </h2>
        </Link>

        <div className='flex flex-row gap-8 mt-4 text-sm desktop:text-base'>
          {/* SKILL LEVEL */}
          {skill && <div>
            {skill.name} Level
          </div>}

          {/* DATE */}
          <div>
            {formatDate(post.date)}
          </div>

        </div>

        {post.tutorialManager.postExcerpt &&
          <div className='mt-4 desktop:text-lg'
            dangerouslySetInnerHTML={{ __html: post.tutorialManager.postExcerpt }} />}

        <Link to={`/${post.slug}`} prefetch={`intent`} className="mt-8 btn btn-xl btn-primary tablet:mt-6 tablet:btn-flex">
          View the post
        </Link>

      </div>
    </div>
  )
}

export default BlogFeaturePostHomePage
