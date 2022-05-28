import PostCardOne from '../cards/postCardOne'
import type { LazyComponentProps } from 'react-lazy-load-image-component';
import { trackWindowScroll }
  from 'react-lazy-load-image-component';
interface Props {
  posts: IPost[]
  tabletGrid3x?: boolean
}
type IProps = LazyComponentProps & Props
/**
 * PostsGrid
 * 
 * @tested - 5/27/2022
 * 
 * @param props 
 * @returns 
 */
function PostsGrid(props: IProps) {
  const { posts, scrollPosition, tabletGrid3x } = props

  const cssGrid = tabletGrid3x ? 'tablet_3x_grid pb-12 col-span-full grid grid-flow-row row-auto grid-cols-mobile gap-x-0 tablet:grid-cols-3 tablet:gap-x-5' : 'tablet_2x_grid grid grid-flow-row grid-cols-1 tablet:grid-cols-2 tablet:gap-x-5 laptop:grid-cols-3 desktop:gap-x-8'

  return (
    <div className='col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12'>
      <div data-testid="post-grid-css" className={cssGrid}>
        {posts.map(post => <PostCardOne key={post.slug} post={post} scrollPosition={scrollPosition} />)}
      </div>
    </div>
  )
}

export default trackWindowScroll(PostsGrid)
