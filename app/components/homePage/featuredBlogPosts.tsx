import React from 'react'
import BlogFeaturePostHomePage from '../blog/blogFeaturePostHomePage';
import LatestPost from '../blog/latestPost';

interface Props { posts: IPost[] }

// TODO: TEST THIS
function FeaturedBlogPosts(props: Props) {
  const { posts } = props
  console.log('posts', posts);

  // first post
  const firstPost = posts[0]

  // last 3 posts
  const lastThreePosts = posts.slice(1, 4)

  return (
    <section className='bg-[#F7F6F7] et-grid-basic py-8 tablet:py-16 laptop:py-24'>

      <div className='col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12 tablet:mb-12 laptop:col-start-2 laptop:col-span-8 laptop:row-start-1 laptop:mb-0 desktop:col-start-2 desktop:col-span-8'>
        <BlogFeaturePostHomePage post={firstPost} />
      </div>

      <div className="col-span-2 col-start-2 tablet:col-start-3 tablet:col-span-10 laptop:col-start-10 laptop:col-span-4 laptop:row-start-1 tablet:mb-0 laptop:mt-8 laptop:pr-4 laptop:flex laptop:flex-col laptop:justify-center">
        {lastThreePosts.map((post, index) => {
          return (
            <div key={index} >
              <LatestPost post={post} />
            </div>
          )
        })}
      </div>

    </section>
  )
}

export default FeaturedBlogPosts
