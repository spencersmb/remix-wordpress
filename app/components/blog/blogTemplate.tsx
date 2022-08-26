import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Sticky, StickyContainer } from 'react-sticky';
import { ClientOnly } from 'remix-utils';
import useSite from '@App/hooks/useSite';
import useWindowResize from '@App/hooks/useWindowResize';
import { classNames } from '@App/utils/appUtils';
import { createImgixSizes, defaultImages, loadImageSrc } from '@App/utils/imageHelpers';
import { addClass } from '@App/utils/pageUtils';
import { consoleHelper } from '@App/utils/windowUtils';
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
import { BreakpointEnums } from '@App/enums/breakpointEnums';
import { ImageSizeEnums } from '@App/enums/imageEnums';
import { useSearch } from '@App/hooks/useSearch';
import TutorialResources from './tutorialContent/tutorialResources';
import { getResource, mapPostResources, rearrangeLicenses, reducePostResourceData } from '@App/utils/posts';
import { TagIcon } from '@heroicons/react/solid';
import { Link } from '@remix-run/react';
import ClockSvg from '../svgs/clockSvg';
import LazyImgix from '../images/lazyImgix';
import { staticImages } from '@App/lib/imgix/data';

interface IProps {
  post: IPost
}
function BlogTemplate(props: IProps) {
  const { post } = props
  const { openSearch } = useSearch()
  const { resourecLibraryLogin, hideComments, state: { metadata, breakpoint } } = useSite();
  consoleHelper('post', post, 'blogTemplate.tsx')

  useEffect(() => {

    // openSearch()
    // handleCommentsClick()

    // // Refresh the window if the user logs in on another page
    // window.addEventListener('storage', (evt) => {
    //   console.log('custom fired', evt);

    //   if (evt.key === 'makers_login' || evt.key === 'makers_logout') {
    //     window.location.reload();
    //   }

    // });

    checkOldIframes()
    return () => {
      // unmount or change route, close modal
      hideComments()
    }
  }, [])

  // solve for older blog posts and the iframe issue
  function checkOldIframes() {
    if (post.tutorialManager.youtube.id) {
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

  // // rewrite data example
  // const tutorialManager: ITutorialManager = {
  //   ...post.tutorialManager,
  //   resources: mapPostResources(post.tutorialManager.resources)
  // }

  // const tutorialManagerObj = {
  //   ...post.tutorialManager,
  //   resources: reducePostResourceData(post.tutorialManager.resources)
  // }

  // get specific instance example
  // const colorSwatch = getResource({ resources: tutorialManager.resources, resourceName: 'colorSwatch' })
  // console.log('colorSwatch', colorSwatch);

  // console.log('tutorialManagerObj', tutorialManagerObj.resources);

  const [tutorialMin, tutorialSeconds] = post.tutorialManager.youtube.duration.split(':')

  const author = createImgixSizes({
    width: 200,
    height: 200,
    alt: `Every Tuesday IPad Art`,
    src: staticImages.profiles.teela.square.src,
    mobileSize: 200
  })
  return (

    <article className='grid grid-flow-row row-auto bg-neutral-50 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>

      {/* Header */}
      <div className='col-span-full bg-sage-700 et-grid-basic'>

        {/* BREADCURMBS */}
        <div className='col-span-2 col-start-2 mt-2 mb-4 text-sage-50 tablet:col-start-3 tablet:col-span-10 tablet:mt-5 tablet:mb-12 desktop:col-start-4 desktop:col-span-8'>
          <Breadcrumbs links={breadcrumbLinks} />
        </div>

        {/* TITLE */}
        <div className='col-span-2 col-start-2 mb-8'>
          <h1 className='text-3xl text-sage-50 font-sentinel__SemiBoldItal tablet:text-display-1 tablet:mt-8 desktop:mt-12'>
            {post.title}
          </h1>
        </div>

        {/* FEATURED IMAGE */}
        <div className='col-span-2 col-start-2'>
          <LazyImageBase image={featuredImage} id={post.id} />
        </div>

        {/* TAGS AND TIME */}
        <div className='flex flex-col col-span-2 col-start-2 p-4 my-8 font-medium rounded-lg bg-sage-600'>

          {/* TAGS */}
          <div className='flex flex-row items-center pb-4'>
            <div className='max-w-[20px] w-full text-sage-200 mr-2'>
              <TagIcon />
            </div>
            <div className='flex flex-row gap-1 text-sage-50'>
              {post.categories.map((category, index) => {
                const lastItem = 3 === index + 1
                if (index > 2) {
                  return null
                }
                return (
                  <div key={category.id} className='flex flex-row'>
                    <Link
                      className='underline underline-offset-4'
                      to={`/category/${category.slug}`}
                      prefetch='intent'>
                      {category.name}
                    </Link>
                    {!lastItem ? ', ' : null}


                  </div>
                )
              })}
            </div>
          </div>

          {/* TIME */}
          <div className='flex flex-row items-center'>
            <div className='max-w-[18px] w-full text-sage-200 mr-2'>
              <ClockSvg fill='currentColor' />
            </div>
            <div className='flex flex-row gap-1 text-sage-50'>
              {tutorialMin} min tutorial
            </div>
          </div>

        </div>

        {/* QUICK SUMMERY */}
        <div className='col-span-2 col-start-2 mb-8 text-sage-50'>
          <span className='text-lg font-sentinel__SemiBoldItal text-secondary-400'>Quick Summary</span> ~ {post.tutorialManager.quickSummary}
        </div>

        {/* AUTHOR */}
        <div className='relative flex flex-row items-center col-span-2 col-start-2 mt-12 mb-8 text-sage-50'>

          <div className='absolute top-[-60px] left-[-20px] font-bonVivant text-5xl -rotate-6'>
            Written by
          </div>

          {/* IMAGE */}
          <div className='mr-2'>
            <div className='w-[50px]'>
              <div className='overflow-hidden rounded-full max-w-none lazy-load-wrapper lazy-load-wrapper-block lazy-load-image-full'>
                <LazyImgix
                  sizes="(max-width: 666px) 70vw, (max-width: 1023px) 75vw, (max-width: 1399px) 70vw, 1180px"
                  id={"iPadArt"}
                  image={author.image} />
              </div>

            </div>
          </div>

          {/* AUTHOR INFO */}
          <div className='flex flex-col flex-[1] tablet:my-0 tablet:text-left'>

            <BlogDateAuthor date={post.date} author={post.author.name} />
          </div>

        </div>

      </div>

      {/* TUTORIAL DOWNLOADS */}
      {post.tutorialManager.youtube.id &&
        <div
          data-testid='blog-tutorialDownloads'
          className='grid grid-flow-row row-auto col-span-full grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop bg-sage-200'>

          <div className='col-span-2 col-start-2 tablet:col-span-full laptop:col-start-3 laptop:col-span-10 desktop:col-span-full'>
            <StickyContainer>

              <div className={classNames(
                post.tutorialManager.downloads
                  ? 'desktop:px-8'
                  : '',
                'relative flex pt-8 pb-8 tablet:py-16 laptop:flex-row items-start max-w-[1475px] mx-auto desktop:py-0')}>

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
                  <YouTubeVideo
                    id={post.tutorialManager.youtube.id}
                    title={post.title}
                  />

                  {breakpoint !== (BreakpointEnums.desktop || BreakpointEnums.desktopXL) && <TutorialDownloads post={post} isMobile={true} />}

                  {/* <PaidProducts post={post} /> */}
                  <TutorialResources resources={post.tutorialManager.resources} />
                </div>

              </div>
            </StickyContainer>
          </div>
        </div>}


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
        <BlogAuthor />
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

    </article>
  )
}

export default BlogTemplate
