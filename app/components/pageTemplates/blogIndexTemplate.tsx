import useFetchPaginate from "@App/hooks/useFetchPagination";
import { POST_RESOURCE_FIELDS } from "@App/lib/graphql/queries/posts";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { flattenAllPosts } from "@App/utils/posts";
import { consoleHelper } from "@App/utils/windowUtils";
import { AnimatePresence, motion } from "framer-motion";
import gql from "graphql-tag";
import { useCallback, useEffect, useState } from "react";
import BlogFeaturedPost from "../blog/blogFeaturedPost";
import BlogCategoryTabs from "../blog/blogHomeTabs/blogCategoryTabs";
import BlogPostGrid from "../blog/blogPostGrid";
import OutlinedButton from "../buttons/outlinedButton";
import { spinnerColors } from "../spinners/spinnerColors";

interface Props {
  loaderData: any
}

interface ICategoryItem {
  [id: string]: {
    posts: any
    pageInfo: {
      page: number,
      endCursor: string,
      hasNextPage: boolean,
    }
  }
}

interface ICategory {
  selectedCategory: string;
  category: ICategoryItem
}
interface IFetchCategory {
  endCursor: string | null,
  page: number
}


function createInitializingFetchState(postsArgs: { posts: IPost[], pageInfo: any, page: number }, categorysArgs: ICategory | null) {
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

function useSetUrlPageHistory(pageNumber: number) {

  // pageInfo.page
  useEffect(() => {
    if (pageNumber === 1 || !pageNumber) {
      return
    }

    const url = new URL(window.location.href);
    url.searchParams.set('page', pageNumber.toString())
    // window.history.replaceState(`Page: ${pageNumber}`, `Blog: Page ${pageNumber} - Every-Tuesday`, url.href);
    window.history.pushState(`Page: ${pageNumber}`, `Blog: Page ${pageNumber} - Every-Tuesday`, url.href);
    document.title = `Blog: Page ${pageNumber} - Every-Tuesday`

    // if page = 4 - means get the first 40 items
  }, [pageNumber])
}


interface ISetUrlBlogParams {
  category: string,
  pageInfo: {
    page: number,
  }
  categories: ICategoryItem
}
function useSetUrlBlogParams({
  category,
  pageInfo,
  categories
}: ISetUrlBlogParams) {

  useEffect(() => {
    if (category === 'all') {
      setWindowUrlParams({
        setParams: [
          { name: 'page', value: pageInfo && pageInfo.page ? pageInfo.page.toString() : '1' },
        ],
        deleteParams: ['cat'],
        pageTitle: `Page: ${pageInfo.page}`,
        tabTitle: 'Blog - Every-Tuesday'
      })
      return
    }
    if (!categories[category]) {
      return
    }

    const setParams = [
      {
        name: 'page',
        value: categories[category].pageInfo.page.toString()
      },
      {
        name: 'cat',
        value: category
      },
    ]
    setWindowUrlParams({
      setParams,
      pageTitle: `Category - ${category} / Page: ${categories[category].pageInfo.page}`,
      tabTitle: 'Blog - Every-Tuesday'
    })
  }, [category, categories, pageInfo])
}

interface IUseFetchCategoryPosts {
  category: string,
  categories: ICategoryItem,
  fetchCategory: any,
  loadingPosts: any
}
// on Category Change, if the category is not defined, then we need to fetch the category of posts
function useFetchCategoryPosts({
  category,
  categories,
  loadingPosts,
  fetchCategory
}: IUseFetchCategoryPosts) {

  // category
  // categories
  // loadingPosts fn
  // fetchCategory Fn

  useEffect(() => {

    if (!categories[category]) {
      console.log('fetch new posts cat empty', categories)
      loadingPosts()
      // fetchMoreCategories()
      fetchCategory({
        endCursor: categories[category] ? categories[category].pageInfo.endCursor : null,
        page: categories[category] ? categories[category].pageInfo.page + 1 : 1
      })
    }
  }, [category, categories, loadingPosts, fetchCategory])

}

function BlogIndexTemplate({ loaderData }: Props) {
  let { posts, pageInfo, pageUrlParams, categories, featured } = loaderData;
  // consoleHelper('categories from useLoader', categories, '/routes/blog/index.tsx');
  // consoleHelper('pageUrlParams', pageUrlParams, '/routes/blog/index.tsx');

  const [category, setCategory] = useState(categories ? categories.selectedCategory : 'all')

  // Create initializing state for Context
  const initializePostsFromServer = createInitializingFetchState({
    posts,
    pageInfo,
    page: pageUrlParams
  }, categories)

  const { state, addPostsAction, addCategoryAction, loadingPosts, clearPosts, clearCategory } = useFetchPaginate(initializePostsFromServer)

  const fetchCategory = useCallback(async ({
    endCursor,
    page
  }: IFetchCategory) => {

    const url = window.ENV.PUBLIC_WP_API_URL as string

    const variables = {
      first: 12,
      after: endCursor,
      catName: category === 'all' ? '' : category,
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

    addCategoryAction({
      category,
      pageInfo: {
        page,
        endCursor: data.posts.pageInfo.endCursor,
        hasNextPage: data.posts.pageInfo.hasNextPage,
      },
      posts: filteredPosts
    })

  }, [category, addCategoryAction])
  // console.log('Blog Cat data', categories)
  // consoleHelper('cat posts', posts.length)
  // consoleHelper('cat pageInfo', pageInfo)
  // consoleHelper('state', state)

  // Set page number in url each time we change data from fetch for non category pages
  useSetUrlPageHistory(state.pageInfo.page)

  // Set URL with params depending on category everytime we change category or page
  useSetUrlBlogParams({
    category,
    pageInfo: state.pageInfo,
    categories: state.categories
  })

  // On Category Change, if the category is not defined, then we need to fetch the category of posts
  useFetchCategoryPosts({
    category,
    categories: state.categories,
    loadingPosts,
    fetchCategory
  })

  const handleCatClick = (cat: string) => () => {
    if (state.loading) {
      return
    }
    setCategory(cat)
  }

  function handleViewMore() {
    loadingPosts()
    fetchCategory({
      endCursor: state.categories[category] ? state.categories[category].pageInfo.endCursor : null,
      page: state.categories[category] ? state.categories[category].pageInfo.page + 1 : 1
    })
  }

  return (
    <>

      <BlogFeaturedPost featuredPost={featured} />

      <div className='grid grid-flow-row row-auto mt-12 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:mt-16 desktop:grid-cols-desktop'>
        <BlogCategoryTabs catClick={handleCatClick} category={category} />
      </div>

      <div className='grid grid-flow-row row-auto py-12 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>

        <div className='col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12'>

          {/* @ts-ignore */}
          <AnimatePresence>
            {state.loading
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
          {/* {category === 'all' && state.pageInfo.hasNextPage &&
            <OutlinedButton
              spinnerColors={spinnerColors.sageOutline}
              clickHandler={fetchMorePosts}
              text='View More'
              loadingText="Loading"
              loading={state.loading}
            />
          } */}

          {state.categories[category] && state.categories[category].pageInfo.hasNextPage &&
            <OutlinedButton
              spinnerColors={spinnerColors.sageOutline}
              clickHandler={handleViewMore}
              text='View More'
              loadingText="Loading"
              loading={state.loading}
            />
          }
        </div>

      </div>

    </>
  )
}

export default BlogIndexTemplate

const postQuery = gql`
 ${POST_RESOURCE_FIELDS}
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
          ...postResourceFields
          postExcerpt
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
        }
      }
    }
  }
`