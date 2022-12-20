import { AnimatePresence, motion } from 'framer-motion'
import PostCardOne from '../cards/postCardOne'

import { consoleHelper } from '@App/utils/windowUtils';
import type { LazyComponentProps } from 'react-lazy-load-image-component';
import { trackWindowScroll } from 'react-lazy-load-image-component';

interface Props {
  posts: IPost[]
  category: string
  categories: {
    [id: string]: {
      posts: IPost[]
      pageInfo: {
        page: number,
        endCursor: string,
        hasNextPage: boolean,
      }
    }
  }
}
type IProps = LazyComponentProps & Props

/**
 * BlogPostGrid
 * @tested - 5/27/2022
 * 
 * @returns 
 */
function BlogPostGrid(props: IProps) {
  const { posts, category, categories, scrollPosition } = props
  consoleHelper('categories', categories, 'components/blog/blogPostGrid.tsx');

  return (
    <div data-testid="post-grid" className='grid grid-flow-row grid-cols-1 tablet:grid-cols-2 tablet:gap-x-5 laptop:grid-cols-3 desktop:gap-x-8 '>

      {/* @ts-ignore */}
      <AnimatePresence>

        {/* {category === 'all' && categories[category] && categories[category].posts.map((post: IPost) => (<PostCardOne key={post.slug} post={post} scrollPosition={scrollPosition} />)
        ).slice(1)} */}

        {categories[category] && categories[category].posts.map((post: IPost) => (<PostCardOne key={post.slug} post={post} scrollPosition={scrollPosition} />)
        )}

        {/* Iif Cat === all and no posts */}
        {/* {(posts.length === 0 && category === 'all')
          ?
          <motion.div>
            <h4>Sorry, There are no posts in Category: {category} yet.</h4>
          </motion.div>
          : null
        } */}

        {((categories[category] && categories[category].posts.length === 0))
          ?
          <motion.div>
            <h4>Sorry, There are no posts in Category: {category} yet.</h4>
          </motion.div>
          : null
        }

      </AnimatePresence>
    </div>
  )
}

export default trackWindowScroll(BlogPostGrid)
