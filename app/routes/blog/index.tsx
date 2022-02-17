import { useEffect, useState } from "react";
import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import useFetchPaginate from "~/hooks/useFetchPagination";
import Layout from "~/components/layoutTemplates/layout";
import { fetchAPI } from "~/utils/fetch";
import { createThumbnailImage, filterNodeFromTags, findSkillLevel, flattenAllPosts, formatDate, getImageSizeUrl } from "~/utils/posts";
import { getBasicPageMetaTags, getHtmlMetadataTags } from "~/utils/seo";
import { consoleHelper } from "~/utils/windowUtils";
import BlogFeaturedPost from "~/components/blog/blogFeaturedPost";
import { IPageInfo } from "~/hooks/useFetchPagination/useFetchPaginationReducer";
import { getGraphQLString } from "~/utils/graphqlUtils";
import { POST_BASIC_FIELDS, POST_FEATURED_IMAGE } from "~/lib/graphql/queries/posts";
import { gql } from "@apollo/client";
import BlogCategoryTabs from "~/components/blog/blogHomeTabs/blogCategoryTabs";
import PostCardOne from "~/components/cards/postCardOne";
import { AnimatePresence, motion } from "framer-motion";
import OutlinedButton from "~/components/buttons/outlinedButton";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

export let meta: MetaFunction = (metaData): any => (getBasicPageMetaTags(metaData, {
  title: `Blog - Every-Tuesday`,
  desc: `Get the most up-to-date content on Procreate`,
  slug: `blog`,
}))

export let loader: LoaderFunction = async ({ request, }) => {
  // let variables: {
  //   first: number;
  //   after: string | null;
  //   catName?: string;
  // } = {
  //   first: 13,
  //   after: null
  // }
  // // check URL for params to fetch the correct amount of items
  // let url = new URL(request.url)
  // let params = url.searchParams
  // let page = params.get('page')
  // let cat = params.get('cat')

  // if (page) {
  //   variables = {
  //     first: (parseInt(page, 10) * 12) + 1, // +1 is to account for the featured post
  //     after: null,
  //   }
  // }

  // let data: IndexData = {
  //   resources: [
  //     {
  //       name: "Remix Docs",
  //       url: "https://remix.run/docs"
  //     },
  //     {
  //       name: "React Router Docs",
  //       url: "https://reactrouter.com/docs"
  //     },
  //     {
  //       name: "Remix Discord",
  //       url: "https://discord.gg/VBePs6d"
  //     }
  //   ],
  //   demos: [
  //     {
  //       to: "demos/actions",
  //       name: "Actions"
  //     },
  //     {
  //       to: "demos/about",
  //       name: "Nested Routes, CSS loading/unloading"
  //     },
  //     {
  //       to: "demos/params",
  //       name: "URL Params and Error Boundaries"
  //     }
  //   ]
  // };

  // let wpAPI
  // let wpCatAPI

  // try {
  //   wpAPI = await fetchAPI(getGraphQLString(query), {
  //     variables
  //   })

  //   if (cat && page) {
  //     variables.catName = cat
  //     variables.first = (parseInt(page, 10) * 12)
  //     wpCatAPI = await fetchAPI(getGraphQLString(catQuery), {
  //       variables
  //     })
  //   }

  // } catch (e) {
  //   console.log('error', e)
  // }
  // const pageInfo = wpAPI?.posts.pageInfo
  // const posts = flattenAllPosts(wpAPI?.posts) || []
  // let categories = wpCatAPI && cat ? {
  //   selectedCategory: cat,
  //   category: {
  //     [cat]: {
  //       posts: flattenAllPosts(wpCatAPI?.posts),
  //       pageInfo: {
  //         ...wpCatAPI?.posts.pageInfo,
  //         page: page ? parseInt(page, 10) : 1,
  //       },

  //     }
  //   }
  // } : null

  // // https://remix.run/api/remix#json
  // return {
  //   ...data,
  //   posts,
  //   pageInfo,
  //   categories,
  //   pageUrlParams: page ? parseInt(page, 10) : 1
  // }
};

type IBlogIndexProps = IPageInfo & {
  pageUrlParams: number; //currentPage
  categories: {
    selectedCategory: string;
    category: {
      [id: string]: {
        posts: any
        pageInfo: {
          page: number,
          endCursor: string,
          hasNextPage: boolean,
        }
      }
    }
  } | null;
}
function BlogIndex() {
  let loaderData = useLoaderData<IBlogIndexProps>();
  // let { posts, pageInfo, pageUrlParams, categories } = loaderData;
  // console.log('Blog Cat data', categories)
  // const [category, setCategory] = useState(categories ? categories.selectedCategory : 'all')

  // const { state, addPostsAction, addCategoriAction, loadingPosts, clearPosts, clearCategory } = useFetchPaginate({
  //   posts: posts,
  //   pageInfo: {
  //     ...pageInfo,
  //     page: pageUrlParams
  //   },
  //   category: {
  //     ...categories?.category
  //   }
  // })


  // // consoleHelper('cat posts', posts.length)
  // // consoleHelper('cat pageInfo', pageInfo)
  // consoleHelper('state', state)

  // useEffect(() => {
  //   if (state.pageInfo.page === 1 || !state.pageInfo.page) {
  //     return
  //   }

  //   const url = new URL(window.location.href);

  //   url.searchParams.set('page', state.pageInfo.page.toString())
  //   window.history.replaceState(`Page: ${state.pageInfo.page}`, 'Blog - Every-Tuesday', url.href);

  //   // if page = 4 - means get the first 40 items
  // }, [state.pageInfo.page])

  // useEffect(() => {
  //   if (category === 'all') {
  //     return
  //   }
  //   if (!state.categories[category]) {
  //     return
  //   }

  //   // if its the first page, don't change the url
  //   if (state.categories[category] && state.categories[category].pageInfo.page === 1) {
  //     return
  //   }

  //   const url = new URL(window.location.href);
  //   url.searchParams.set('page', state.categories[category].pageInfo.page.toString())
  //   url.searchParams.set('cat', category)
  //   window.history.replaceState(`Category - ${category} / Page: ${state.categories[category].pageInfo.page}`, 'Blog - Every-Tuesday', url.href);

  //   // // if page = 4 - means get the first 40 items
  // }, [state.categories[category]])

  // useEffect(() => {
  //   return () => {
  //     clearCategory()
  //     clearPosts()
  //   }
  // }, [])

  // useEffect(() => {
  //   if (!state.categories[category]) {
  //     fetchCategory()
  //   }
  // }, [category])

  // const handleCatClick = (cat: string) => async () => {
  //   if (state.loading) {
  //     return
  //   }
  //   setCategory(cat)
  // }

  // async function fetchCategory() {
  //   loadingPosts()
  //   const url = window.ENV.PUBLIC_WP_API_URL as string
  //   const variables = {
  //     first: 12,
  //     after: state.categories[category] ? state.categories[category].pageInfo.endCursor : null,
  //     catName: category
  //   }
  //   const body = await fetch(url,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         query: getGraphQLString(catQuery),
  //         variables
  //       })
  //     })
  //   const { data } = await body.json()

  //   const filteredPosts = flattenAllPosts(data.posts) || []
  //   let updatedPosts = []
  //   if (state.categories[category]) {
  //     updatedPosts = [
  //       ...state.categories[category].posts,
  //       ...filteredPosts
  //     ]
  //   } else {
  //     updatedPosts = [
  //       ...filteredPosts
  //     ]
  //   }
  //   addCategoriAction({
  //     category,
  //     pageInfo: {
  //       page: state.categories[category] ? state.categories[category].pageInfo.page + 1 : 1,
  //       endCursor: data.posts.pageInfo.endCursor,
  //       hasNextPage: data.posts.pageInfo.hasNextPage,
  //     },
  //     posts: filteredPosts
  //   }
  //   )
  // }

  // async function fetchMorePosts() {
  //   loadingPosts()
  //   const url = window.ENV.PUBLIC_WP_API_URL as string
  //   const variables = {
  //     first: 12,
  //     after: state.pageInfo.endCursor
  //   }

  //   console.log('variables', variables);
  //   console.log('postQuery', postQuery);


  //   const body = await fetch(url,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         query: getGraphQLString(postQuery),
  //         variables
  //       })
  //     })
  //   const { data } = await body.json()
  //   const filteredPosts = flattenAllPosts(data.posts) || []
  //   addPostsAction({
  //     pageInfo: {
  //       page: state.pageInfo.page + 1,
  //       endCursor: data.posts.pageInfo.endCursor,
  //       hasNextPage: data.posts.pageInfo.hasNextPage,
  //     },
  //     posts: [
  //       ...state.posts,
  //       ...filteredPosts
  //     ]
  //   })
  // }

  // async function fetchMoreCategories() {
  //   loadingPosts()
  //   const url = window.ENV.PUBLIC_WP_API_URL as string
  //   const variables = {
  //     first: 12,
  //     after: state.categories[category] ? state.categories[category].pageInfo.endCursor : null,
  //     catName: category
  //   }
  //   const body = await fetch(url,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         query: getGraphQLString(catQuery),
  //         variables
  //       })
  //     })
  //   const { data } = await body.json()

  //   const filteredPosts = flattenAllPosts(data.posts) || []
  //   let updatedPosts = []
  //   if (state.categories[category]) {
  //     updatedPosts = [
  //       // ...state.categories[category].posts,
  //       ...filteredPosts
  //     ]
  //   } else {
  //     updatedPosts = [
  //       ...filteredPosts
  //     ]
  //   }
  //   addCategoriAction({
  //     category,
  //     pageInfo: {
  //       page: state.categories[category] ? state.categories[category].pageInfo.page + 1 : 1,
  //       endCursor: data.posts.pageInfo.endCursor,
  //       hasNextPage: data.posts.pageInfo.hasNextPage,
  //     },
  //     posts: filteredPosts
  //   }
  //   )
  // }

  return (
    <Layout>

      {/* <BlogFeaturedPost featuredPost={posts[0]} />

      <BlogCategoryTabs catClick={handleCatClick} category={category} />

      <div className='grid grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop grid-flow-row row-auto py-12'>
        <div className='col-start-2 col-span-2 tablet:col-start-2 tablet:col-span-12'>

          <AnimatePresence>
            {state.loading
              && category !== 'all'
              && !state.categories[category]
              && <motion.div
                key="catSpinner"
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  scale: 0
                }}
                className='rounded-full mx-auto flex items-center justify-center text-center w-[60px] h-[60px] bg-primary-50 p-1'>
                <svg
                  className="motion-reduce:hidden animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#b45309" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="#845c5c" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </motion.div>
            }
          </AnimatePresence>

          <div className='grid grid-flow-row grid-cols-1 tablet:grid-cols-2 tablet:gap-x-5 laptop:grid-cols-3 desktop:gap-x-8 '>
            <AnimatePresence>
              {category === 'all' && state.posts.map((post: any, index) => {
                return (<PostCardOne key={post.slug} post={post} />)
              }).slice(1) // Remove first time because its the featured post
              }

              {category !== 'all' && state.categories[category] && state.categories[category].posts.map(post => (<PostCardOne key={post.slug} post={post} />)
              )}
            </AnimatePresence>
          </div>
        </div>


        <div className='col-start-2 col-span-2 tablet:col-start-2 tablet:col-span-12 mb-12'>
          {category === 'all' && state.pageInfo.hasNextPage &&
            <OutlinedButton
              clickHandler={fetchMorePosts}
              text='View More'
              loadingText="Loading"
              loading={state.loading}
            />
          }

          {category !== 'all' && state.categories[category] && state.categories[category].pageInfo.hasNextPage &&
            <OutlinedButton
              clickHandler={fetchMoreCategories}
              text='View More'
              loadingText="Loading"
              loading={state.loading}
            />
          }
        </div>

      </div> */}
    </Layout>
  )
}

export default BlogIndex

const query = gql`
    query GetNextPosts($first: Int, $after: String) {
        posts(first: $first, after: $after) {
            __typename
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
                __typename
            }
            edges {
                __typename
                node {
                    id
                    tutorialManager {
                      postExcerpt
                      thumbnail {
                        type
                        image {
                          altText
                          sourceUrl
                        }
                      }
                    }
                    categories {
                        edges {
                            node {
                                databaseId
                                id
                                name
                                slug
                            }
                        }
                    }
                    date
                    excerpt
                    featuredImage {
                      node {
                        mediaDetails {
                          sizes{
                            width
                            file
                            height
                            name
                            sourceUrl
                            mimeType
                          }
                        }
                          altText
                          caption
                          sourceUrl
                          srcSet
                          sizes
                          id
                        }
                      }
                    modified
                    title
                    slug
                    isSticky
                }
            }
        }
    }
`
const postQuery = gql`
query GetMorePosts($first: Int, $after: String) {
  posts(first: $first, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      node {
        id
        tutorialManager {
          postExcerpt
          thumbnail {
            type
            image {
              altText
              sourceUrl
            }
          }
          colorPalette {
            iconBackgroundColor
            iconTextColor
          }
        }
        categories {
          edges {
                            node {
              databaseId
              id
              name
              slug
            }
          }
        }
        date
        excerpt
                    featuredImage {
                      node {
                        mediaDetails {
                          sizes{
                width
                file
                height
                name
                sourceUrl
                mimeType
              }
            }
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
        title
        slug
        isSticky
      }
    }
  }
}
`
const catQuery = gql`
  ${POST_BASIC_FIELDS}
  ${POST_FEATURED_IMAGE}
  query CategoryPageQuery($first: Int, $catName: String!, $after: String) {
    posts(
      first: $first
      after: $after
      where: {
        categoryName: $catName, 
        orderby: {
          field: DATE, 
          order: DESC
          }
        }
    ) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ...postBasicFields
          ...featuredImageFields
          tutorialManager {
            thumbnail {
              image {
                altText
                sourceUrl
              }            
            }
          }
        }
      }
    }
  }
`

