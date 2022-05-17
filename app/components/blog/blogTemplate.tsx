import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Sticky, StickyContainer } from 'react-sticky';
import { ClientOnly } from 'remix-utils';
import useSite from '~/hooks/useSite';
import useWindowResize, { BreakpointEnums } from '~/hooks/useWindowResize';
import { classNames } from '~/utils/appUtils';
import { defaultImages, ImageSizeEnums, loadImageSrc } from '~/utils/imageHelpers';
import { addClass } from '~/utils/pageUtils';
import { consoleHelper } from '~/utils/windowUtils';
import YouTubeVideo from '../cards/youTubeCard__post';
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
  const { resourecLibraryLogin, hideComments, state: { metadata, breakpoint } } = useSite();
  // consoleHelper('post', post)
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
      <div className='grid grid-flow-row row-auto col-span-full grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop bg-sage-200'>
        <div className='col-span-2 col-start-2 tablet:col-span-full laptop:col-start-3 laptop:col-span-10 desktop:col-span-full'>
          <StickyContainer>

            <div className={classNames(
              post.tutorialManager.downloads || post.tutorialManager.paidProducts
                ? 'desktop:px-8'
                : '',
              'relative flex pt-16 pb-8 tablet:py-16 laptop:flex-row items-start max-w-[1475px] mx-auto desktop:py-0')}>

              <div className='relative flex-none my-20 desktop:flex-1'>
                {breakpoint === (BreakpointEnums.desktop || BreakpointEnums.desktopXL) && <Sticky topOffset={-20} bottomOffset={184}>
                  {({
                    style,

                    // the following are also available but unused in this example
                    isSticky,
                    wasSticky,
                    distanceFromTop,
                    distanceFromBottom,
                    calculatedHeight
                  }) => {

                    // topOffset = 104(size of the nav minus size of margin)
                    let top = 104 // size of nav
                    return (
                      <div style={{
                        ...style,
                        // @ts-ignore
                        top: style && style.top ? style.top + top : top,
                      }}>
                        <TutorialDownloads post={post} style={style} />
                      </div>
                    )
                  }}
                </Sticky>
                }

              </div>
              <div className='flex-initial w-[100%] tablet:px-8 laptop:px-0 desktop:w-[70%] desktop:pl-8 desktop:my-20'>
                <YouTubeVideo title={post.title} url={post.tutorialManager.youtube.embedUrl} />
                {breakpoint !== (BreakpointEnums.desktop || BreakpointEnums.desktopXL) && <TutorialDownloads post={post} isMobile={true} />}

                <PaidProducts post={post} />
              </div>
            </div>
          </StickyContainer>
        </div>
      </div>

      {/* TUTORIAL DOWNLOADS */}
      {/* <div className={classNames(
        post.tutorialManager.downloads || post.tutorialManager.paidProducts
          ? 'pb-12'
          : '',
        'bg-primary-100 col-span-full grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop relative')}>

        <div className='z-10 col-start-2 col-span-2 row-[1/1] tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 desktop:col-start-6 desktop:col-span-8'>
          <YouTubeVideo title={post.title} url={post.tutorialManager.youtube.embedUrl} />
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
