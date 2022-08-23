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
    <ul className='flex flex-row flex-wrap'>
      {categories.map(cat =>
        <li data-testid="test-category" key={cat.id} className='flex mb-5 mr-5 overflow-hidden'>
          <Link prefetch="intent" to={`/category/${cat.slug}`} className='btn btn-sm btn-outlineFill'>
            {cat.name}
          </Link>
        </li>
      )}
    </ul>
  )
}

export default BlogCategories
