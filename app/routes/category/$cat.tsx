import { gql } from "@apollo/client";
import { capitalize } from "lodash";
import { useEffect } from "react";
import useFetchPaginate from "@App/hooks/useFetchPagination";
import Layout from "@App/components/layoutTemplates/layout";
import { fetchAPI } from "@App/utils/fetch.server";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { flattenAllPosts } from "@App/utils/posts";
import { getBasicPageMetaTags } from "@App/utils/seo";
import { consoleHelper } from "@App/utils/windowUtils";
import { POST_BASIC_FIELDS, POST_FEATURED_IMAGE } from "@App/lib/graphql/queries/posts";
import PostsGrid from "@App/components/blog/postsGrid";
import type { HeadersFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// headers for the entire DOC when someone refreshes the page or types in the url directly
export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": "public, max-age=300, stale-while-revalidate"
  }
}
export let meta: MetaFunction = (metaData): any => {
  const { data, location, parentsData } = metaData
  const category = capitalize(data.category)
  return getBasicPageMetaTags(metaData, {
    title: `${category} Archives`,
    desc: `Every-Tuesday Category: ${category}`,
    slug: `${data.category}`
  })
}

export let loader: LoaderFunction = async ({ request, params }) => {
  let variables = {
    first: 10,
    after: null,
    catName: params.cat
  }
  let url = new URL(request.url)
  let searchParams = url.searchParams
  let pageParams = searchParams.get('page')

  if (pageParams) {
    variables = {
      first: parseInt(pageParams, 10) * 10,
      after: null,
      catName: params.cat
    }
  }
  let wpAPI = await fetchAPI(getGraphQLString(query), {
    variables
  })
  const pageInfo = wpAPI?.posts.pageInfo
  const posts = flattenAllPosts(wpAPI?.posts) || []

  // if (wpAPI.postBy === null) {
  //   //TODO: redirect to custom 404 page
  //   throw new Response("Not Found", { status: 404 });
  // }
  const category = capitalize(params.cat)
  const page = {
    title: `${category} Archives`,
    slug: params.cat,
    description: `Every-Tuesday Category: ${category}`,
    seo: {
      title: `${category} Archives`,
      opengraphModifiedTime: '', //TODO: figure out how to get this
      metaDesc: `The Arhives page for ${category}. This page contains all the posts in the ${category} category.`,
    }
  }
  return json({
    category: params.cat,
    pageInfo,
    posts,
    page,
    pageParams: pageParams ? parseInt(pageParams, 10) : 1
  })
};


export default function CategoryPage() {
  let { posts, pageInfo, category, pageParams } = useLoaderData<{
    posts: IPost[],
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
      hasPreviousPage: boolean
    },
    pageParams: number
    category: string
  }>();
  const { state, addCategoriAction, loadingPosts, clearCategory } = useFetchPaginate({
    category: {
      [category]: {
        posts,
        pageInfo: {
          ...pageInfo,
          page: pageParams
        }
      }
    }
  })
  consoleHelper('cat posts', posts.length)
  consoleHelper('cat pageInfo', pageInfo)
  consoleHelper('cat state', state)

  async function fetchMorePosts() {
    loadingPosts()
    const url = window.ENV.PUBLIC_WP_API_URL as string
    const variables = {
      first: 10,
      after: state.categories[category].pageInfo.endCursor,
      catName: category
    }
    const body = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getGraphQLString(query),
          variables
        })
      })
    const { data } = await body.json()

    const filteredPosts = flattenAllPosts(data.posts) || []
    let updatedPosts = []
    if (!state.categories[category]) {
      updatedPosts = [
        ...posts,
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
        page: state.categories[category].pageInfo.page + 1,
        endCursor: data.posts.pageInfo.endCursor,
        hasNextPage: data.posts.pageInfo.hasNextPage,
      },
      posts: updatedPosts
    }
    )
  }

  // update page param in URL on pageChange
  useEffect(() => {
    if (state.categories[category].pageInfo.page === 1) {
      return
    }

    const url = new URL(window.location.href);
    url.searchParams.set('page', state.categories[category].pageInfo.page.toString())

    window.history.replaceState(
      `page: ${state.categories[category].pageInfo.page}`,
      'Title: ET',
      url.href
    );

    // if page = 4 - means get the first 40 items
  }, [state.categories[category].pageInfo.page])

  // clear cat when leaving the page to always get most recent data
  useEffect(() => {
    return () => {
      clearCategory()
    }
  }, [])

  return (
    <Layout>
      <div className='grid grid-flow-row row-auto py-24 bg-neutral-50 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>

        {/* ARCHIVE TITLE */}
        <div className='col-span-2 col-start-2 pb-16 mt-2 mb-8 text-center tablet:col-start-3 tablet:col-span-10 tablet:mt-5 tablet:mb-12 desktop:col-start-4 desktop:col-span-8'>
          <h2 className="flex flex-col text-display-2">
            <span className="text-base font-normal text-primary-500">Category</span>
            <span className="capitalize font-sentinel__SemiBoldItal">{category}</span>
          </h2>
        </div>

        {state.categories[category] && <PostsGrid posts={state.categories[category].posts} />}

        <div className='col-span-2 col-start-2 mb-12 tablet:col-start-2 tablet:col-span-12'>
          {state.categories[category].pageInfo.hasNextPage &&
            <button
              className="mx-auto btn btn-primary"
              aria-disabled={state.loading}
              disabled={state.loading}
              onClick={fetchMorePosts}>
              {state.loading ? 'Loading...' : 'Load More Posts'}
            </button>}
        </div>
      </div>
    </Layout>
  )
}

const query = gql`
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