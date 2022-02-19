import PostCardOne from '../cards/postCardOne'
import { LazyComponentProps, trackWindowScroll }
  from 'react-lazy-load-image-component';
interface Props {
  post: IPost
}
type IProps = LazyComponentProps & Props
function RelatedPostsGrid(props: IProps) {
  const { post, scrollPosition } = props

  return (
    <div className='col-start-2 col-span-2 tablet:col-start-2 tablet:col-span-12'>

      <div className='pb-12 col-span-full grid grid-flow-row row-auto grid-cols-mobile gap-x-0 tablet:grid-cols-3 tablet:gap-x-5'>

        <div className='font-sentinel__SemiBoldItal flex flex-col text-4xl mb-7 mt-14 col-start-2 col-span-2 tablet:col-start- tablet:col-span-3 tablet:text-5xl laptop:text-display-2 laptop:mt-28 laptop:mb-14'>
          <span className='text-primary-500'>You may also like...</span>
        </div>

        {post.relatedPosts.map(relatedPost => <PostCardOne key={relatedPost.slug} post={relatedPost} scrollPosition={scrollPosition} />)}
      </div>
    </div>
  )
}

export default trackWindowScroll(RelatedPostsGrid)
