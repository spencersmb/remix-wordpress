import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Sticky, StickyContainer } from 'react-sticky';
import { ClientOnly } from 'remix-utils';
import useSite from '~/hooks/useSite';
import useWindowResize from '~/hooks/useWindowResize';
import { classNames } from '~/utils/appUtils';
import { defaultImages, ImageSizeEnums, loadImageSrc } from '~/utils/imageHelpers';
import { addClass } from '~/utils/pageUtils';
import { consoleHelper } from '~/utils/windowUtils';
import YouTubeCard__Post from '../cards/youTubeCard__post';
import LazyImageBase from '../images/lazyImage-base';
import BlogAuthor from './blogAuthor';
import BlogCategories from './blogCategories';
import BlogComments from './blogComments';
import Breadcrumbs from './breadcrumbs';
import BlogDateAuthor from './date';
import PinterestBlock from './pinterestBlock';
import PostsGrid from './postsGrid';
import PaidProducts from './tutorialContent/paidProducts';
import TutorialDownloads from './tutorialContent/tutorialDownloads';

interface IProps {
  post: IPost
}
function BlogTemplate(props: IProps) {
  const { post } = props
  const { resourecLibraryLogin, hideComments, state: { metadata } } = useSite();
  // consoleHelper('post', post)

  useWindowResize()

  useEffect(() => {
    // handleCommentsClick()

    // Refresh the window if the user logs in on another page
    window.addEventListener('storage', (evt) => {
      console.log('custom fired', evt);

      if (evt.key === 'makers_login' || evt.key === 'makers_logout') {
        window.location.reload();
      }

    });

    checkOldIframes()
    return () => {
      // unmount or change route, close modal
      hideComments()
    }
  }, [])

  function checkOldIframes() {
    if (post.tutorialManager.youtube.embedUrl) {
      return null
    }

    let blogContent = document.querySelector('.blog-content')
    let pTags = blogContent?.querySelectorAll('p')

    if (!pTags) {
      return null
    }

    pTags.forEach(pTag => {
      const children = Array.from(pTag.children)
      children.find(child => {
        if (child.tagName === 'IFRAME') {
          addClass(pTag, 'embed-responsive')
        }
      })
    })
  }

  const breadcrumbLinks = [
    {
      url: '/blog',
      text: 'Blog'
    },
    {
      url: `/${post.slug}`,
      text: post.title
    }
  ]
  // const featuredImage = getImageSizeUrl(post.featuredImage, 'headless_post_feature_image')
  const featuredImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.FEATURE, // image name to try and get
    imageObject: post.featuredImage, // the featured image object
    fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })

  console.log('featuredImage', featuredImage);


  const postUrl = `${metadata.domain}/${post.slug}`
  return (

    <div className='grid grid-flow-row row-auto bg-neutral-50 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>

      {/* BREADCURMBS */}
      <div className='col-span-2 col-start-2 mt-2 mb-8 tablet:col-start-3 tablet:col-span-10 tablet:mt-5 tablet:mb-12 desktop:col-start-4 desktop:col-span-8'>
        <Breadcrumbs links={breadcrumbLinks} />
        <h1 className='mt-4 text-5xl text-primary-600 font-sentinel__SemiBoldItal tablet:text-display-1 tablet:mt-8 desktop:mt-12'>
          {post.title}
        </h1>
        <div className='mt-4 text-xs text-primary-500 tablet:mt-8 tablet:text-base desktop:mt-12'>
          <BlogDateAuthor date={post.date} author={post.author.name} />
        </div>
      </div>

      {/* FEATURED IMAGE */}
      {post.featuredImage &&
        <div className='col-span-2 col-start-2 mb-8 tablet:col-start-2 tablet:col-span-12 tablet:mb-12 '>
          <LazyImageBase image={featuredImage} id={post.id} />
        </div>}

      {/* EXCERPT */}
      {post.tutorialManager.postExcerpt && <div className='grid grid-flow-row row-auto col-span-full grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>
        <div className='blog-content mt-4 tablet:mb-16 col-start-2 col-span-2 row-[1/1] tablet:col-start-3 tablet:col-span-10 desktop:col-start-4 desktop:col-span-8'>
          <div className='text-lg tablet:text-xl' dangerouslySetInnerHTML={{ __html: post.tutorialManager.postExcerpt }} />
        </div>
      </div>}


      {/* TUTORIAL DOWNLOADS */}
      <div className='col-span-full'>
        <StickyContainer>

          <div className={classNames(
            post.tutorialManager.downloads || post.tutorialManager.paidProducts
              ? 'pb-12'
              : '',
            'bg-primary-100 relative flex items-start max-w-[1450px] mx-auto')}>
            <div className='relative flex-1 bg-slate-400'>
              <Sticky topOffset={-104} bottomOffset={104}>
                {({
                  style,

                  // the following are also available but unused in this example
                  isSticky,
                  wasSticky,
                  distanceFromTop,
                  distanceFromBottom,
                  calculatedHeight
                }) => {
                  console.log('style', style);

                  return (
                    <div style={{
                      ...style,
                      // @ts-ignore
                      top: style && style.top ? style.top + 104 : 104,
                    }}>
                      <TutorialDownloads post={post} />
                    </div>
                  )
                }}
              </Sticky>
            </div>
            <div className='flex-initial bg-sage-200 h-[1000px] w-[60%]'>
              <YouTubeCard__Post title={post.title} url={post.tutorialManager.youtube.embedUrl} />
            </div>
          </div>
        </StickyContainer>
      </div>





      {/* TUTORIAL DOWNLOADS */}
      {/* <div className={classNames(
        post.tutorialManager.downloads || post.tutorialManager.paidProducts
          ? 'pb-12'
          : '',
        'bg-primary-100 col-span-full grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop relative')}>

        <div className='z-10 col-start-2 col-span-2 row-[1/1] tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 desktop:col-start-6 desktop:col-span-8'>
          <YouTubeCard__Post title={post.title} url={post.tutorialManager.youtube.embedUrl} />
        </div>

        <div className='relative col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 desktop:col-start-2 desktop:col-span-4'>

          <TutorialDownloads post={post} />

        </div>


        <div className='mb-8 col-start-2 col-span-2 tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 desktop:col-start-6 desktop:col-span-8 z-20 mx-[-1rem]'>
          <PaidProducts post={post} />
        </div>

      </div> */}

      {/* BLOG CONTENT */}
      <div className='col-span-2 col-start-2 mt-16 mb-8 blog-content tablet:col-start-3 tablet:col-span-10 desktop:col-start-4 desktop:col-span-8' dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* PINTEREST */}
      <PinterestBlock
        post={post}
        postUrl={postUrl}
      />

      {/* CATEGORIES */}
      {post.categories.length > 0 &&
        <div className='col-span-2 col-start-2 mt-10 mb-8 tablet:col-start-3 tablet:col-span-10 desktop:mt-20 desktop:col-start-4 desktop:col-span-8'>
          <BlogCategories categories={post.categories} />
        </div>}

      {/* COMMENTS */}
      <div className='col-start-2 col-span-2 mb-8 pb-5 tablet:col-start-3 tablet:col-span-10 tablet:mb-8 desktop:col-start-4 desktop:col-span-8 tablet:border-b-[1px] tablet:border-b-neutral-300'>
        <BlogComments post={post} />
      </div>

      {/* AUTHOR */}
      <div className='col-span-2 col-start-2 tablet:col-start-3 tablet:col-span-10 desktop:col-start-4 desktop:col-span-8'>

        <BlogAuthor post={post} />

      </div>


      {/* RELATED POSTS TITLE */}
      <div className='col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12'>
        <div className='grid grid-flow-row row-auto col-span-full grid-cols-mobile gap-x-0 tablet:grid-cols-3 tablet:gap-x-5'>
          <div className='flex flex-col col-span-2 col-start-2 text-4xl font-sentinel__SemiBoldItal mb-7 mt-14 tablet:col-start- tablet:col-span-3 tablet:text-5xl laptop:text-display-2 laptop:mt-28 laptop:mb-14'>
            <span className='text-primary-500'>You may also like...</span>
          </div>
        </div>
      </div>

      {/* <MakersPostSignUp /> */}
      <PostsGrid posts={post.relatedPosts} tabletGrid3x={true} />



    </div>
  )
}

export default BlogTemplate
