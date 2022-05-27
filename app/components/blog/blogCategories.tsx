import { Link } from '@remix-run/react'
import React from 'react'

interface Props {
  categories: ICategories[]
}

function BlogCategories(props: Props) {
  const { categories } = props

  return (
    <ul className='flex flex-row flex-wrap'>
      {categories.map(cat =>
        <li data-testid="test-category" key={cat.id} className='flex mb-5 mr-5 overflow-hidden duration-200 ease-in-out  text-neutral-800 rounded-2xl hover:ring hover:ring-teal-400 ring-offset-neutral-50 focus:ring ring-offset-4 focus:ring-primary-300'>
          <Link prefetch="intent" to={`/category/${cat.slug}`} className='bg-neutral-200 px-5 py-2.5'>
            {cat.name}
          </Link>
        </li>
      )}
    </ul>
  )
}

export default BlogCategories
