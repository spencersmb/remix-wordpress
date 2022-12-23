import { TagIcon } from '@heroicons/react/solid'
import { Link } from '@remix-run/react'
import React from 'react'

interface Props {
  categories: ICategories[]
}
/**
 * List out blog categories that user can click on to see posts under that category
 * @tested - 5/26/2022
 * 
 * @param props 
 * @returns 
 */
function BlogCategories(props: Props) {
  const { categories } = props

  return (
    <>
      <h5 className='flex items-center mb-4 text-xl font-sentinel__SemiBoldItal text-emerald-900'><span className='max-w-[23px] w-full mr-1'><TagIcon fill={'var(--tangerine-700)'} /></span> Categories</h5>
      <ul className='flex flex-row flex-wrap gap-2'>
        {categories.map(cat =>
          <li data-testid="test-category" key={cat.id} className='flex mb-3 overflow-hidden tablet:mb-0'>
            <Link prefetch="intent" to={`/category/${cat.slug}`} className='font-medium btn btn-sm bg-sage-100 border-sage-100 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white'>
              {cat.name}
            </Link>
          </li>
        )}
      </ul>
    </>
  )
}

export default BlogCategories
