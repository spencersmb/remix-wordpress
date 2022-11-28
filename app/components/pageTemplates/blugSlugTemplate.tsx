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

import { BreakpointEnums } from '@App/enums/breakpointEnums';
import { ImageSizeEnums } from '@App/enums/imageEnums';
import { useSearch } from '@App/hooks/useSearch';
import { findSkillLevel, getResource, mapPostResources, rearrangeLicenses, reducePostResourceData } from '@App/utils/posts';
import { TagIcon } from '@heroicons/react/solid';
import { Link } from '@remix-run/react';
import ClockSvg from '../svgs/clockSvg';
import LazyImgix from '../images/lazyImgix';
import { staticImages } from '@App/lib/imgix/data';
import BarChartSvg from '../svgs/barChartSvg';
import BlogAuthor from '../blog/blogAuthor';
import BlogCategories from '../blog/blogCategories';
import BlogComments from '../blog/blogComments';
import Breadcrumbs from '../blog/breadcrumbs';
import BlogDateAuthor from '../blog/date';
import PinterestBlock from '../blog/pinterestBlock';
import PostsGrid from '../blog/postsGrid';
import TutorialDownloads from '../blog/tutorialContent/tutorialDownloads';
import TutorialResources from '../blog/tutorialContent/tutorialResources';

interface IProps {
  post: IPost
}
function BlogSlugTemplate(props: IProps) {
  const { post } = props
  const skill = findSkillLevel(post.categories);
  const { resourecLibraryLogin, hideComments, state: { metadata, breakpoint } } = useSite();
  consoleHelper('post', post, 'BlogSlugTemplate.tsx')

  useEffect(() => {
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth"
    // });

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

  const featuredImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.FEATURE, // image name to try and get
    imageObject: post.featuredImage, // the featured image object
    fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })

  const postUrl = `${metadata.domain}/${post.slug}`


  const [tutorialMin] = post.tutorialManager.youtube.duration
    ? post.tutorialManager.youtube.duration.split(':') : ['00', '00']

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
      <div className='col-span-full bg-white et-grid-basic tablet:grid-rows-[auto_auto_auto_auto_1fr_minmax(60px,auto)] desktop:grid-rows-[auto_auto_auto_auto_auto_1fr]'>

        {/* BREADCURMBS */}
        <div className='col-span-2 col-start-2 mt-2 mb-4 text-emerald-500 tablet:col-start-2 tablet:col-span-12 tablet:mt-5 laptop:col-start-3 laptop:col-span-10 desktop:col-start-2 desktop:col-span-8'>
          <Breadcrumbs links={breadcrumbLinks} />
        </div>

        {/* TITLE */}
        <div className='col-span-2 col-start-2 mb-8 tablet:col-start-2 tablet:col-span-11 tablet:mb-0 laptop:col-start-3 laptop:col-span-10 desktop:mb-8 desktop:row-start-2 desktop:row-span-2 desktop:col-start-2 desktop:col-span-6' >
          <h1 className='text-3xl text-[#344C4F] font-sentinel__SemiBoldItal tablet:text-display-1 laptop:text-6xl desktoptext-7xl'>
            {post.title}
          </h1>
        </div>

        {/* FEATURED IMAGE */}
        <div className='relative col-span-2 col-start-2 z-2 tablet:row-start-5 tablet:row-span-2 tablet:col-start-7 tablet:col-span-7 laptop:col-start-7 laptop:col-span-6 desktop:col-start-9 desktop:col-span-5 desktop:mt-2 desktopXl:mr-7 desktop:overflow-hidden desktop:row-start-3 desktop:row-span-4'>
          <LazyImageBase image={featuredImage} id={post.id} />
        </div>

        {/* TAGS AND TIME */}
        <div className='flex col-span-2 col-start-2 my-8 font-medium tablet:col-start-2 tablet:col-span-12 tablet:row-start-3 laptop:col-start-3 laptop:col-span-11 desktop:mt-0 desktop:col-start-2 desktop:col-span-7 desktop:row-start-4'>

          <div className='flex flex-col w-full p-4 rounded-lg bg-sage-50 tablet:flex-row tablet:items-center tablet:gap-7 tablet:w-auto tablet:px-5 laptop:justify-between'>
            {/* TAGS */}
            <div className='flex flex-row items-center pb-4 tablet:pb-0'>
              <div className='max-w-[20px] w-full text-[#344C4F] mr-2'>
                <TagIcon />
              </div>
              <div className='flex flex-row gap-1 text-[#344C4F]'>
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


            {skill && <div className='flex flex-row items-center pb-4 tablet:pb-0'>
              <div className='max-w-[20px] w-full text-[#344C4F] mr-1'>
                <BarChartSvg fill={'currentColor'} />
              </div>
              <div className='flex flex-row gap-1 text-[#344C4F]'>
                <div className='font-semibold'>
                  {skill.name} Skill
                </div>
              </div>
            </div>}



            {/* TIME */}
            {tutorialMin && tutorialMin !== '00' &&
              <div className='flex flex-row items-center'>
                <div className='max-w-[18px] w-full text-[#344C4F] mr-1'>
                  <ClockSvg fill='currentColor' />
                </div>
                <div className='flex flex-row gap-1 text-[#344C4F] font-semibold'>
                  {tutorialMin} min tutorial
                </div>
              </div>
            }

          </div>

        </div>

        {/* QUICK SUMMERY */}
        {post.tutorialManager.quickSummary &&
          <div className='col-span-2 col-start-2 mb-8 text-[#344C4F] tablet:row-start-4 tablet:col-start-2 tablet:col-span-8 tablet:text-lg laptop:text-xl laptop:col-start-3 laptop:col-span-8 desktop:col-start-2 desktop:col-span-6 desktop:row-start-5'>
            <span className='text-lg font-sentinel__SemiBoldItal text-[#C04828] tablet:text-xl laptop:text-2xl'>Quick Summary</span> ~ {post.tutorialManager.quickSummary}
          </div>
        }

        {/* AUTHOR */}
        <div className='flex relative col-span-2 col-start-2 ml-4 mt-12 mb-8 text-emerald-600 tablet:ml-6 tablet:col-start-2 tablet:col-span-5 tablet:mt-16 tablet:mb-5 laptop:just laptop:items-start laptop:col-start-3 laptop:col-span-3 desktop:col-start-11 desktop:col-span-3 desktopXl:ml-[108px] desktop:row-start-1 desktop:row-span-2 desktop:mb-0 desktop:mt-0 desktop:items-end'>

          <div className='relative flex flex-row items-center desktop:mb-4'>
            <div className='absolute top-[-60px] left-[-20px] font-bonVivant text-5xl -rotate-6 tablet:top-[-50px] laptop:top-[-60px] laptop:left-[-40px]'>
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

        {/* GREY BG FILLER */}
        <div className={classNames(post.tutorialManager.youtube.id
          ? 'bg-sage-100'
          : 'bg-white', 'relative hidden row-span-1 row-start-6 z-1  tablet:block tablet:col-span-full desktop:row-start-6 desktop:row-span-1')} />

      </div>

      {/* TUTORIAL DOWNLOADS */}
      {/* ex youtube ID 4ewfn5Y8_Xs */}
      {post.tutorialManager.youtube.id &&
        <div
          data-testid='blog-tutorialDownloads'
          className='grid grid-flow-row row-auto col-span-full grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>

          <div className='outer-wrapper col-span-full'>
            <StickyContainer>

              <div className={classNames(
                post.tutorialManager.downloads
                  ? 'desktop:px-8'
                  : '',
                'px-5 pt-8 pb-8 tablet:py-16 desktop:py-0 bg-sage-100')}>

                <div className='max-w-[700px] desktop:max-w-[1475px] mx-auto w-full relative flex laptop:flex-row items-start '>

                  {/* TUTORIAL DOWNLOADS */}
                  <div className='relative flex-none my-20 desktop:flex-1'>
                    {breakpoint === (BreakpointEnums.desktop || BreakpointEnums.desktopXL) &&
                      <Sticky topOffset={-20} bottomOffset={184}>
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

                  {/* YOUTUBE */}
                  <div className='flex-initial w-[100%] tablet:px-8 laptop:px-0 desktop:w-[70%] desktop:pl-8 desktop:my-20'>
                    <YouTubeVideo
                      id={post.tutorialManager.youtube.id}
                      title={post.title}
                    />

                    {breakpoint !== (BreakpointEnums.desktop || BreakpointEnums.desktopXL) && <TutorialDownloads post={post} isMobile={true} />}

                    {/* <PaidProducts post={post} /> */}
                    {/* RESOURCES */}
                    <TutorialResources
                      resources={post.tutorialManager.resources} />
                  </div>

                </div>

              </div>

              {/* BLOG CONTENT */}
              <div className='px-5 pt-8 pb-8 tablet:py-16 desktop:py-0 desktop:px-8'>
                <div className='max-w-[700px] desktop:max-w-[1475px] mx-auto w-full relative flex'>

                  <div className='flex-initial w-[100%] tablet:px-8 laptop:px-0 desktop:w-[70%] desktop:pl-8 desktop:my-20 desktop:ml-auto'>
                    <div className=''>
                      {post.tutorialManager.postExcerpt &&
                        <div className='mb-8 text-xl ' dangerouslySetInnerHTML={{ __html: post.tutorialManager.postExcerpt }} />
                      }

                      <div className='blog-content' dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                  </div>



                </div>
              </div>


            </StickyContainer>
          </div>

        </div>}

      {(!post.tutorialManager.youtube.id || post.tutorialManager.youtube.id === '') &&
        <div
          data-testid='blog-tutorialDownloads'
          className='grid grid-flow-row row-auto col-span-full grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>

          <div className='outer-wrapper col-span-full'>
            <StickyContainer>

              <div className={classNames(
                post.tutorialManager.downloads
                  ? 'desktop:px-8'
                  : '',
                'px-5 pt-8 pb-8 tablet:py-16 desktop:py-0')}>

                <div className='max-w-[700px] desktop:max-w-[1475px] mx-auto w-full relative flex laptop:flex-row items-start '>

                  {/* ADDITIONAL RESOURCES */}
                  <div className='relative flex-none my-20 additional-resources desktop:flex-1'>
                    {breakpoint === (BreakpointEnums.desktop || BreakpointEnums.desktopXL) &&
                      <Sticky topOffset={-20} bottomOffset={184}>
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

                  {/* BLOG CONTENT */}
                  <div className='blog-content flex-initial w-[100%] tablet:px-8 laptop:px-0 desktop:w-[70%] desktop:pl-8 desktop:my-20 desktop:mb-0'>
                    <div className=''>
                      {post.tutorialManager.postExcerpt &&
                        <div className='mb-8 text-xl ' dangerouslySetInnerHTML={{ __html: post.tutorialManager.postExcerpt }} />
                      }

                      <div className='blog-content' dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                  </div>

                </div>

              </div>

            </StickyContainer>
          </div>

        </div>}


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
          <div className='flex flex-col col-span-2 col-start-2 text-4xl font-sentinel__SemiBoldItal mb-7 mt-14 tablet:col-start- tablet:col-span-3 tablet:text-4xl laptop:text-display-2 laptop:mt-28 laptop:mb-14'>
            <span className='text-sage-600'>You may also like...</span>
          </div>
        </div>
      </div>

      {/* <MakersPostSignUp /> */}
      <PostsGrid posts={post.relatedPosts} tabletGrid3x={true} />

    </article>
  )
}

export default BlogSlugTemplate
