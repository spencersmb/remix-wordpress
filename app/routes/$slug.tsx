import { HeadersFunction, json, Link, LoaderFunction, MetaFunction, useLoaderData, useParams } from 'remix'
import { fetchAPI } from '../utils/fetch'
import { getMediaSizeUrl, mapPostData } from '../utils/posts'
import Layout from "~/components/layoutTemplates/layout"
import { getHtmlMetadataTags } from '../utils/seo'
import { useEffect } from 'react'
import { gql } from '@apollo/client'
import { getGraphQLString } from '~/utils/graphqlUtils'
import { consoleHelper } from '~/utils/windowUtils'
import MakersPostSignUp from '~/components/post/makersPostSignUp'
import useSite from '~/hooks/useSite'
import Breadcrumbs from '~/components/blog/breadcrumbs'
import BlogDateAuthor from '~/components/blog/date'
import PinterestBlock from '~/components/blog/pinterestBlock'
import CommentsSvg from '~/components/svgs/commentsSvg'
import BarChartSvg from '~/components/svgs/barChartSvg'
import PostCardOne from '~/components/cards/postCardOne'
import { POST_BASIC_FIELDS, POST_FEATURED_IMAGE, RELEATED_POSTS_FIELDS } from '~/lib/graphql/queries/posts'


//TODO: Check Comment reply - style single comments
// TODO: Load Comments after page has loaded....

// headers for the entire DOC when someone refreshes the page or types in the url directly
export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": "public, max-age=300, stale-while-revalidate"
  }
}

export let loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url)
  let wpAPI = await fetchAPI(getGraphQLString(query), {
    variables: {
      slug: `${params.slug}`
    }
  })

  if (wpAPI.postBy === null) {
    //TODO: redirect to custom 404 page
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    post: mapPostData(wpAPI.postBy),
    url
  })
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = (metaData): any => {
  const { data, location, parentsData } = metaData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }
  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: data.post,
    location
  })
};

export default function PostSlug() {
  let { post, url } = useLoaderData<{ post: IPost, url: any }>();
  const { showComments, hideComments, state: { commentsModal } } = useSite();
  consoleHelper('post', post)

  function handleCommentsClick() {
    console.log('click comments');

    if (commentsModal.show) {
      return
    }
    console.log('post.comments', post.comments)

    showComments({
      commentOn: post.databaseId,
      comments: post.comments.list,
      pageInfo: post.comments.pageInfo
    })
  }

  useEffect(() => {
    // handleCommentsClick()
    return () => {
      // unmount or change route, close modal
      hideComments()
    }
  }, [])

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
  const pinterestImage = getMediaSizeUrl(post.etSocialNav.pinterestImage?.mediaDetails.sizes, 'medium')
  const featuredImage = getMediaSizeUrl(post.featuredImage?.mediaDetails.sizes, 'headless_post_feature_image')


  return (
    <Layout>
      <div className='bg-neutral-50 grid grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop grid-flow-row row-auto'>

        {/* BREADCURMBS */}
        <div className='col-start-2 col-span-2 mt-2 mb-8 tablet:col-start-3 tablet:col-span-10 tablet:mt-5 tablet:mb-12 desktop:col-start-4 desktop:col-span-8'>
          <Breadcrumbs links={breadcrumbLinks} />
          <h1 className='text-primary-600 font-sentinel__SemiBoldItal text-heading-3 tablet:text-display-1 mt-4 tablet:mt-8 desktop:mt-12'>
            {post.title}
          </h1>
          <div className='mt-4 text-primary-500 tablet:mt-8 text-xs tablet:text-base desktop:mt-12'>
            <BlogDateAuthor date={post.date} author={post.author.name} />
          </div>
        </div>

        {/* FEATURED IMAGE */}
        {post.featuredImage &&
          <div className='col-start-2 col-span-2 mb-8 tablet:col-start-2 tablet:col-span-12 tablet:mb-12 '>
            <div>
              <img src={`${featuredImage.sourceUrl}`} sizes={`(max-width: 700px) 100vw, 700px`} alt={post.featuredImage.altText} srcSet={post.featuredImage.srcSet || undefined} width={`1440`} height={'810'} />
            </div>
          </div>}

        {/* BLOG CONTENT */}
        {/* <div className='blog-content mb-8 col-start-2 col-span-2 tablet:col-start-3 tablet:col-span-10 desktop:col-start-4 desktop:col-span-8' dangerouslySetInnerHTML={{ __html: post.content }} /> */}

        {/* PINTEREST */}
        {/* <PinterestBlock pinterest={pinterestImage} postTitle={post.title} /> */}

        {/* CATEGORIES */}
        {post.categories.length > 0 &&
          <div className='col-start-2 col-span-2 mb-8 mt-10 tablet:col-start-3 tablet:col-span-10 desktop:mt-20 desktop:col-start-4 desktop:col-span-8'>
            <ul className='flex flex-row flex-wrap'>
              {post.categories.map(cat =>
                <li key={cat.id} className='text-neutral-800 flex rounded-2xl overflow-hidden mr-5 mb-5 hover:ring hover:ring-teal-400 ring-offset-neutral-50 focus:ring ring-offset-4 focus:ring-primary-300 duration-200 ease-in-out'>
                  <Link prefetch="intent" to={`/category/${cat.slug}`} className='bg-neutral-200 px-5 py-2.5'>
                    {cat.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>}

        {/* COMMENTS */}
        <div className='col-start-2 col-span-2 mb-8 pb-5 tablet:col-start-3 tablet:col-span-10 tablet:mb-8 desktop:col-start-4 desktop:col-span-8 border-b-neutral-300 border-b-[1px]'>
          <div className='flex flex-row justify-between items-center'>
            <div onClick={handleCommentsClick} className='flex flex-row hover:cursor-pointer items-center'>
              {/* ICON */}
              <div className='w-7 mr-2'>
                <CommentsSvg stroke={'var(--primary-plum-600)'} />
              </div>

              {/* COUNT */}
              <div>
                {post.comments.list.length !== 0
                  ? <p className='text-primary-700'><span className='font-semibold'>{post.comments.list.length}</span> comments</p>
                  : <p className='font-sentinel__SemiBoldItal text-neutral-600'>Leave a comment</p>}
              </div>
            </div>
            <div>
              Social Icons
            </div>
          </div>
        </div>

        {/* AUTHOR */}
        <div className='col-start-2 col-span-2 tablet:col-start-3 tablet:col-span-10 desktop:col-start-4 desktop:col-span-8'>

          <div className='flex flex-row flex-wrap items-center'>
            {/* IMAGE */}
            <div className='mr-2'>
              <div className='w-[100px]'>
                <img className='max-w-none rounded-full' src={post.author.avatar.url} alt="Teela Cunningham Author" />
              </div>
            </div>

            {/* AUTHOR INFO */}
            <div className='flex flex-col justify-center flex-[1]'>
              <div className='text-sm text-neutral-600 mb-2'>Written By</div>
              <div className='text-primary-600 font-sentinel__SemiBoldItal text-h3'>Teela Cunningham</div>
              <div className='text-sm text-primary-600'>Every Tuesday's content creator and founder.</div>
            </div>

            {/* BUTTON */}
            <div className='flex-[1_1_100%] tablet:flex-[0_1_auto] items-center justify-center tablet:self-end pb-2'>
              <button className='btn btn-primary' type='button'>About Me</button>
            </div>
          </div>

        </div>

        {/* <MakersPostSignUp /> */}

        {/* RELATED POST TITLE*/}
        <div className='col-start-2 col-span-2 tablet:col-start-2 tablet:col-span-12 desktop:col-start-2 desktop:col-span-12 mx-[-1px]'>
          <div className='text-4xl mb-7 mt-14 tablet:text-5xl laptop:text-display-2 font-sentinel__SemiBoldItal flex flex-col laptop:mt-28 laptop:mb-14'>
            <span className='text-primary-500'>You may also like...</span>
          </div>
        </div>

        {/* RELATED POSTS*/}
        <div className='col-start-2 col-span-2 tablet:col-start-2 tablet:col-span-12 mb-12'>

          <div className='grid grid-flow-row grid-cols-1 tablet:grid-cols-3 tablet:gap-x-5 desktop:gap-x-8 '>

            {post.relatedPosts.map(relatedPost => <PostCardOne key={relatedPost.slug} post={relatedPost} />)}
          </div>
        </div>

      </div>
      {/* END BLOG CONTENT/CONTAINER */}

    </Layout>
  );
}

const query = gql`
${POST_BASIC_FIELDS}
${POST_FEATURED_IMAGE}
${RELEATED_POSTS_FIELDS}
query postBySlug($slug: String!) {
    postBy(slug: $slug) {
        ...postBasicFields,    
        ...featuredImageFields,
        ...relatedPostsFields
        modified
        databaseId
        title
        slug
        isSticky
        seo{
            title
            opengraphPublishedTime
            opengraphModifiedTime
            metaDesc
            readingTime
        }
        author {
            node {
                avatar {
                    height
                    url
                    width
                }
                id
                name
                slug
                uri
            }
        }
        etSocialNav{
            pinterestImage{
                sourceUrl
                mediaDetails{
                    sizes{
                        name
                        width
                        height
                        file
                        sourceUrl
                    }
                }
            }
        }
        tutorialManager {
            paidProducts {
                ... on Product {
                    title
                }
            }
            youtube {
                embedUrl
            }
            colorSwatch
            downloads {
                __typename
                ... on ResourceLibrary {
                    title
                    freebie {
                        downloadLink
                    }
                }
            }
        }
        comments(first: 500, after: null, where: {parent: null}) {
            pageInfo{
              endCursor
              hasNextPage
            }
            edges {
                node {
                    databaseId
                    approved
                    parent {
                      node {
                        databaseId
                      }
                    }
                    id
                    author {
                        node {
                          isRestricted
                            name
                            ... on CommentAuthor {
                              gravatar{
                                url
                              }
                            }
                        }
                    }
                    date
                    commentedOn {
                        node {
                            id
                            status
                        }
                    }
                    content
                    replies {
                        edges {
                            node {
                                id
                                databaseId
                                content
                                date
                                parent {
                                  node {
                                    databaseId
                                  }
                                }
                                author {
                                    node {
                                        name
                                      ... on CommentAuthor {
                                        gravatar{
                                          url

                                        }
                                      }
                                    }
                                }
                                
                            }
                        }
                    }
                }
            }
        }
      }
  }
`