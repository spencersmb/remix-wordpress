import useFetchPaginate from '@App/hooks/useFetchPagination'
import { POST_BASIC_FIELDS, POST_FEATURED_IMAGE } from '@App/lib/graphql/queries/posts'
import { getGraphQLString } from '@App/utils/graphqlUtils'
import { flattenAllPosts } from '@App/utils/posts'
import { consoleHelper } from '@App/utils/windowUtils'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import PostsGrid from '../blog/postsGrid'
import OutlinedButton from '../buttons/outlinedButton'
import { spinnerColors } from '../spinners/spinnerColors'
interface ILoaderData {
  posts: IPost[],
  pageInfo: {
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
  },
  pageParams: number
  category: string
}

function CategoryTemplate(props: ILoaderData) {
  const { posts, pageInfo, category, pageParams } = props;
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
      first: 12,
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
          <OutlinedButton
            spinnerColors={spinnerColors.sageOutline}
            clickHandler={fetchMorePosts}
            text='View More'
            loadingText="Loading"
            loading={state.loading}
          />
        }
      </div>
    </div>
  )
}

export default CategoryTemplate
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
        }
      }
    }
  }
`