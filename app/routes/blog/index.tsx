import { useEffect, useState } from "react";
import useFetchPaginate from "@App/hooks/useFetchPagination";
import Layout from "@App/components/layoutTemplates/layout";
import { fetchAPI } from "@App/utils/fetch.server";
import { flattenAllPosts } from "@App/utils/posts";
import { getBasicPageMetaTags } from "@App/utils/seo";
import { consoleHelper } from "@App/utils/windowUtils";
import BlogFeaturedPost from "@App/components/blog/blogFeaturedPost";
import type { IPageInfo } from "@App/hooks/useFetchPagination/useFetchPaginationReducer";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { POST_BASIC_FIELDS, POST_FEATURED_IMAGE } from "@App/lib/graphql/queries/posts";
import gql from 'graphql-tag';
import BlogCategoryTabs from "@App/components/blog/blogHomeTabs/blogCategoryTabs";
import { AnimatePresence, motion } from "framer-motion";
import OutlinedButton from "@App/components/buttons/outlinedButton";
import BlogPostGrid from "@App/components/blog/blogPostGrid";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { HeadersFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cacheControl } from "@App/lib/remix/loaders";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// headers for the entire DOC when someone refreshes the page or types in the url directly
// export const headers: HeadersFunction = ({ loaderHeaders }) => {
//   return {
//     ...cacheControl
//   }
// }

export let meta: MetaFunction = (metaData): any => (getBasicPageMetaTags(metaData, {
  title: `Blog`,
  desc: `Get the most up-to-date content on Procreate`,
  slug: `blog`,
}))

export let loader: LoaderFunction = async ({ request, }) => {
  let variables: {
    first: number;
    after: string | null;
    catName?: string;
  } = {
    first: 13,
    after: null
  }
  // check URL for params to fetch the correct amount of items
  let url = new URL(request.url)
  let params = url.searchParams
  let page = params.get('page')
  let cat = params.get('cat')

  if (page) {
    variables = {
      first: (parseInt(page, 10) * 12) + 1, // +1 is to account for the featured post
      after: null,
    }
  }

  let data: IndexData = {
    resources: [
      {
        name: "Remix Docs",
        url: "https://remix.run/docs"
      },
      {
        name: "React Router Docs",
        url: "https://reactrouter.com/docs"
      },
      {
        name: "Remix Discord",
        url: "https://discord.gg/VBePs6d"
      }
    ],
    demos: [
      {
        to: "demos/actions",
        name: "Actions"
      },
      {
        to: "demos/about",
        name: "Nested Routes, CSS loading/unloading"
      },
      {
        to: "demos/params",
        name: "URL Params and Error Boundaries"
      }
    ]
  };

  let wpAPI
  let wpCatAPI

  try {
    wpAPI = await fetchAPI(getGraphQLString(postQuery), {
      variables
    })

    if (cat && page) {
      variables.catName = cat
      variables.first = (parseInt(page, 10) * 12)
      wpCatAPI = await fetchAPI(getGraphQLString(catQuery), {
        variables
      })
    }

  } catch (e) {
    console.error('error', e)
  }
  const pageInfo = wpAPI?.posts.pageInfo
  const posts = flattenAllPosts(wpAPI?.posts) || []
  let categories = wpCatAPI && cat ? {
    selectedCategory: cat,
    category: {
      [cat]: {
        posts: flattenAllPosts(wpCatAPI?.posts),
        pageInfo: {
          ...wpCatAPI?.posts.pageInfo,
          page: page ? parseInt(page, 10) : 1,
        },

      }
    }
  } : null

  // https://remix.run/api/remix#json
  return json({
    ...data,
    posts,
    pageInfo,
    categories,
    pageUrlParams: page ? parseInt(page, 10) : 1
  }, {
    headers: {
      ...cacheControl
    }
  })
};

interface ICategoryArgs {
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
}
type IBlogIndexProps = IPageInfo & {
  pageUrlParams: number; //currentPage
  categories: ICategoryArgs | null;
}

function createInitializingFetchState(postsArgs: { posts: IPost[], pageInfo: any, page: number }, categorysArgs: ICategoryArgs | null) {
  let { posts, pageInfo, page } = postsArgs
  let initialState = {}

  if (posts.length > 0) {
    initialState = {
      posts,
      pageInfo: {
        ...pageInfo,
        page
      },
    }
  }

  if (categorysArgs) {
    initialState = {
      ...initialState,
      category: {
        ...categorysArgs.category
      },
    }
  }

  return initialState
}

function setWindowUrlParams(props: {
  setParams: { name: string, value: string }[],
  deleteParams?: string[],
  pageTitle: string,
  tabTitle: string
}) {
  let { setParams, deleteParams, pageTitle, tabTitle } = props
  const url = new URL(window.location.href);

  setParams.forEach(({ name, value }) => {
    url.searchParams.set(name, value)
  })

  if (deleteParams) {
    deleteParams.forEach(name => {
      url.searchParams.delete(name)
    })
  }

  window.history.replaceState(pageTitle, tabTitle, url.href);
}
function BlogIndex() {
  let loaderData = useLoaderData<IBlogIndexProps>();
  let { posts, pageInfo, pageUrlParams, categories } = loaderData;
  consoleHelper('categories from useLoader', categories, '/routes/blog/index.tsx');

  const [category, setCategory] = useState(categories ? categories.selectedCategory : 'all')

  // Create initializing state for Context
  const initializePostsFromServer = createInitializingFetchState({
    posts,
    pageInfo,
    page: pageUrlParams
  }, categories)

  const { state, addPostsAction, addCategoriAction, loadingPosts, clearPosts, clearCategory } = useFetchPaginate(initializePostsFromServer)

  // console.log('Blog Cat data', categories)
  // consoleHelper('cat posts', posts.length)
  // consoleHelper('cat pageInfo', pageInfo)
  // consoleHelper('state', state)

  useEffect(() => {
    if (state.pageInfo.page === 1 || !state.pageInfo.page) {
      return
    }

    const url = new URL(window.location.href);
    url.searchParams.set('page', state.pageInfo.page.toString())
    window.history.replaceState(`Page: ${state.pageInfo.page}`, 'Blog - Every-Tuesday', url.href);

    // if page = 4 - means get the first 40 items
  }, [state.pageInfo.page])

  useEffect(() => {
    if (category === 'all') {
      setWindowUrlParams({
        setParams: [
          { name: 'page', value: state.pageInfo && state.pageInfo.page ? state.pageInfo.page.toString() : '1' },
        ],
        deleteParams: ['cat'],
        pageTitle: `Page: ${state.pageInfo.page}`,
        tabTitle: 'Blog - Every-Tuesday'
      })
      return
    }
    if (!state.categories[category]) {
      return
    }

    const setParams = [
      {
        name: 'page',
        value: state.categories[category].pageInfo.page.toString()
      },
      {
        name: 'cat',
        value: category
      },
    ]
    setWindowUrlParams({
      setParams,
      pageTitle: `Category - ${category} / Page: ${state.categories[category].pageInfo.page}`,
      tabTitle: 'Blog - Every-Tuesday'
    })
  }, [state.categories[category]])


  useEffect(() => {

    return () => {
      // clearCategory()
      // clearPosts()
    }
  }, [])

  useEffect(() => {

    if (!state.categories[category]) {
      console.log('fetching new cat in useEffect');
      fetchMoreCategories()
    }
  }, [category])

  const handleCatClick = (cat: string) => async () => {
    if (state.loading) {
      return
    }
    setCategory(cat)
  }

  async function fetchMorePosts() {
    loadingPosts()
    const url = window.ENV.PUBLIC_WP_API_URL as string
    const variables = {
      first: 12,
      after: state.pageInfo.endCursor
    }

    consoleHelper('variables', variables, 'fetchMorePosts() /routes/blog/index.tsx');
    consoleHelper('postQuery', postQuery, 'fetchMorePosts() /routes/blog/index.tsx');

    const body = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getGraphQLString(postQuery),
          variables
        })
      })
    const { data } = await body.json()
    const filteredPosts = flattenAllPosts(data.posts) || []
    addPostsAction({
      pageInfo: {
        page: state.pageInfo.page + 1,
        endCursor: data.posts.pageInfo.endCursor,
        hasNextPage: data.posts.pageInfo.hasNextPage,
      },
      posts: [
        ...state.posts,
        ...filteredPosts
      ]
    })
  }

  async function fetchMoreCategories() {
    loadingPosts()
    const url = window.ENV.PUBLIC_WP_API_URL as string

    const variables = {
      first: 12,
      after: state.categories[category] ? state.categories[category].pageInfo.endCursor : null,
      catName: category
    }
    const body = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getGraphQLString(catQuery),
          variables
        })
      })
    const response = await body.json()
    const { data } = response

    const filteredPosts = flattenAllPosts(response.data.posts) || []
    let updatedPosts = []
    if (state.categories[category]) {
      updatedPosts = [
        // ...state.categories[category].posts,
        ...filteredPosts
      ]
    } else {
      updatedPosts = [
        ...filteredPosts
      ]
    }

    addCategoriAction({
      category,
      pageInfo: {
        page: state.categories[category] ? state.categories[category].pageInfo.page + 1 : 1,
        endCursor: data.posts.pageInfo.endCursor,
        hasNextPage: data.posts.pageInfo.hasNextPage,
      },
      posts: filteredPosts
    }
    )
  }

  return (
    <Layout>

      <BlogFeaturedPost featuredPost={posts[0]} />

      <BlogCategoryTabs catClick={handleCatClick} category={category} />

      <div className='grid grid-flow-row row-auto py-12 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>

        <div className='col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12'>

          {/* @ts-ignore */}
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
                  className="text-white motion-reduce:hidden animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#b45309" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="#845c5c" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </motion.div>
            }
          </AnimatePresence>

          <BlogPostGrid posts={state.posts} category={category} categories={state.categories} />

        </div>

        <div className='col-span-2 col-start-2 mb-12 tablet:col-start-2 tablet:col-span-12'>
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

      </div>

    </Layout>
  )
}

export default BlogIndex

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
              caption
              sourceUrl
              srcSet
              sizes
              id
              mediaDetails{
                sizes{
                  width
                  file
                  height
                  name
                  sourceUrl
                  mimeType
                }
              }
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
const catQuery = gql`
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
          id
          content
          date
          dateGmt
          excerpt
          modified
          databaseId
          title
          slug
          isSticky
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
          tags{
            edges{
                node{
                  name
                  slug
                }
            }
          }
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
          tutorialManager {
            thumbnail {
              image {
                altText
                caption
                sourceUrl
                srcSet
                sizes
                id
                mediaDetails{
                  sizes{
                    width
                    file
                    height
                    name
                    sourceUrl
                    mimeType
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

