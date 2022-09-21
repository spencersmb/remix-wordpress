import React from 'react'
import { ArrowRightIcon } from '@heroicons/react/solid'
import { findSkillLevel, formatDate } from '@App/utils/posts'
import AccentHeaderText from '../layout/accentHeaderText';
import { Link } from '@remix-run/react';
interface Props { post: IPost }

function LatestPost(props: Props) {
  const { post } = props
  const skill = findSkillLevel(post.categories);

  return (
    <Link
      to={`/${post.slug}`}
      prefetch={`intent`}
      className='flex flex-col pb-10 mb-6 border-b border-grey-600 group'>

      <div className='flex flex-row justify-between'>

        {/* TITLE */}
        <div className='relative flex-1 text-xl font-semibold laptop:text-base laptop:max-w-[240px] desktop:text-2xl desktop:max-w-[340px] laptop:group-hover:text-sage-600 transition-colors duration-300'>
          {post.title}
        </div>

        {/* ARROW */}
        <div className='w-[20px] mt-[.5rem] relative transition-all duration-200 translate-x-0 laptop:group-hover:translate-x-[15px] laptop:group-hover:text-sage-600'>
          <ArrowRightIcon />
        </div>
      </div>

      <div className='flex flex-row gap-8'>
        {skill && <div className='text-sm'>
          {skill.name} Level
        </div>}

        {/* DATE */}
        <div className='text-sm'>
          {formatDate(post.date)}
        </div>
      </div>

    </Link>
  )
}

export default LatestPost
