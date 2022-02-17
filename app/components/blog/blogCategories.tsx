import React from 'react'
import { Link } from 'remix'

interface Props {
  categories: ICategories[]
}

function BlogCategories(props: Props) {
  const { categories } = props

  return (
    <ul className='flex flex-row flex-wrap'>
      {categories.map(cat =>
        <li key={cat.id} className=' text-neutral-800 flex rounded-2xl overflow-hidden mr-5 mb-5 hover:ring hover:ring-teal-400 ring-offset-neutral-50 focus:ring ring-offset-4 focus:ring-primary-300 duration-200 ease-in-out'>
          <Link prefetch="intent" to={`/category/${cat.slug}`} className='bg-neutral-200 px-5 py-2.5'>
            {cat.name}
          </Link>
        </li>
      )}
    </ul>
  )
}

export default BlogCategories
