import { AnimatePresence, motion } from 'framer-motion'
import PostCardOne from '../cards/postCardOne'
import type { LazyComponentProps } from 'react-lazy-load-image-component';
import { trackWindowScroll }
  from 'react-lazy-load-image-component';
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

function BlogPostGrid(props: IProps) {
  const { posts, category, categories, scrollPosition } = props

  return (
    <div className='grid grid-flow-row grid-cols-1 tablet:grid-cols-2 tablet:gap-x-5 laptop:grid-cols-3 desktop:gap-x-8 '>
      {/* @ts-ignore */}
      <AnimatePresence>
        {category === 'all' && posts.map((post: any, index) => {
          return (<PostCardOne key={post.slug} post={post} scrollPosition={scrollPosition} />)
        }).slice(1) // Remove first time because its the featured post
        }

        {category !== 'all' && categories[category] && categories[category].posts.map(post => (<PostCardOne key={post.slug} post={post} scrollPosition={scrollPosition} />)
        )}

        {category !== 'all' && categories[category] && categories[category].posts.length === 0 &&
          <motion.div>
            <h4>Sorry, There are no posts in Category: {category} yet.</h4>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default trackWindowScroll(BlogPostGrid)
