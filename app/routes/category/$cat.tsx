import { gql } from "@apollo/client";
import { capitalize } from "lodash";
import { useEffect, useRef } from "react";
import { HeadersFunction, json, Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import useFetchPaginate, { IFetchPaginationState } from "~/hooks/useFetchPagination";
import Layout from "~/components/layoutTemplates/layout";
import { fetchAPI } from "~/utils/fetch";
import { getGraphQLString } from "~/utils/graphqlUtils";
import { getStaticPageMeta } from "~/utils/pageUtils";
import { flattenAllPosts } from "~/utils/posts";
import { getBasicPageMetaTags, getHtmlMetadataTags } from "~/utils/seo";
import { consoleHelper } from "~/utils/windowUtils";
import PostCardOne from "~/components/cards/postCardOne";
import { POST_BASIC_FIELDS, POST_FEATURED_IMAGE } from "~/lib/graphql/queries/posts";

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
      <div className='bg-neutral-50 grid grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop grid-flow-row row-auto py-24'>

        {/* ARCHIVE TITLE */}
        <div className='col-start-2 col-span-2 mt-2 mb-8 tablet:col-start-3 tablet:col-span-10 tablet:mt-5 tablet:mb-12 desktop:col-start-4 desktop:col-span-8 pb-16 text-center'>
          <h2 className="text-display-2 flex flex-col">
            <span className="text-base text-primary-500 font-normal">Category</span>
            <span className="font-sentinel__SemiBoldItal capitalize">{category}</span>
          </h2>
        </div>
        <div className='col-start-2 col-span-2 tablet:col-start-2 tablet:col-span-12'>

          <div className='grid grid-flow-row grid-cols-1 tablet:grid-cols-2 tablet:gap-x-5 laptop:grid-cols-3  desktop:gap-x-8 '>

            {state.categories[category] && state.categories[category].posts.map(relatedPost =>
              <PostCardOne key={relatedPost.slug} post={relatedPost} />
            )}
          </div>
        </div>

        <div className='col-start-2 col-span-2 tablet:col-start-2 tablet:col-span-12 mb-12'>
          {state.categories[category].pageInfo.hasNextPage &&
            <button
              className="btn btn-primary mx-auto"
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
                sourceUrl
              }            
            }
          }
        }
      }
    }
  }
`