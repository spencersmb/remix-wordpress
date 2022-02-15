import { useEffect, useState } from "react";
import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import useFetchPaginate from "~/hooks/useFetchPagination";
import Layout from "~/components/layoutTemplates/layout";
import { fetchAPI } from "~/utils/fetch";
import { createThumbnailImage, filterNodeFromTags, findSkillLevel, flattenAllPosts, formatDate, getImageSizeUrl } from "~/utils/posts";
import { getBasicPageMetaTags, getHtmlMetadataTags } from "~/utils/seo";
import { consoleHelper } from "~/utils/windowUtils";
import BarChartSvg from "~/components/svgs/barChartSvg";
import ClockSvg from "~/components/svgs/clockSvg";
import EditSvg from "~/components/svgs/editSvg";
import BlogFeaturedPost from "~/components/blog/blogFeaturedPost";
import { IPageInfo } from "~/hooks/useFetchPagination/useFetchPaginationReducer";
import { getGraphQLString } from "~/utils/graphqlUtils";
import { POST_BASIC_FIELDS, POST_FEATURED_IMAGE } from "~/lib/graphql/queries/posts";
import { gql } from "@apollo/client";

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
  let variables = {
    first: 11,
    after: null
  }
  // check URL for params to fetch the correct amount of items
  let url = new URL(request.url)
  let params = url.searchParams
  let page = params.get('page')
  console.log('params', params);

  if (page) {
    variables = {
      first: parseInt(page, 10) * 10,
      after: null
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
  try {
    wpAPI = await fetchAPI(query, {
      variables
    })
  } catch (e) {
    console.log('error', e)
  }
  const pageInfo = wpAPI?.posts.pageInfo
  const posts = flattenAllPosts(wpAPI?.posts) || []

  // https://remix.run/api/remix#json
  return {
    ...data,
    posts,
    pageInfo,
    categories: filterNodeFromTags(wpAPI?.categories),
    pageUrlParams: page ? parseInt(page, 10) : 1
  }
};

type IBlogIndexProps = IPageInfo & {
  pageUrlParams: number; //currentPage
  categories: ITagCount[];
}
function BlogIndex() {
  let { posts, pageInfo, pageUrlParams, categories } = useLoaderData<IBlogIndexProps>();
  // console.log('Blog Index data', data)
  const [category, setCategory] = useState('all')

  const { state, addPostsAction, addCategoriAction, loadingPosts, clearPosts, clearCategory } = useFetchPaginate({
    posts: posts,
    pageInfo: {
      ...pageInfo,
      page: pageUrlParams
    }
  })


  consoleHelper('cat posts', posts.length)
  consoleHelper('cat pageInfo', pageInfo)
  consoleHelper('cat state', state)

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
    return () => {
      // clearPosts()
    }
  }, [])

  useEffect(() => {
    fetchCategory()
  }, [category])
  const handleCatClick = (cat: string) => async () => {
    setCategory(cat)
    // await fetchMoreCatPosts(cat)
  }

  async function fetchCategory() {
    console.log('category selected', category);

    loadingPosts()
    const url = window.ENV.PUBLIC_WP_API_URL as string
    const variables = {
      first: 10,
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
    const { data } = await body.json()

    const filteredPosts = flattenAllPosts(data.posts) || []
    let updatedPosts = []
    if (state.categories[category]) {
      updatedPosts = [
        ...state.categories[category].posts,
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
      posts: updatedPosts
    }
    )
  }

  async function fetchMorePosts() {
    loadingPosts()
    const url = window.ENV.PUBLIC_WP_API_URL as string
    const variables = {
      first: 10,
      after: state.pageInfo.endCursor
    }
    const body = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fetchQuery,
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
      first: 10,
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
    const { data } = await body.json()

    const filteredPosts = flattenAllPosts(data.posts) || []
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
      posts: updatedPosts
    }
    )
  }

  return (
    <Layout>
      <BlogFeaturedPost featuredPost={posts[0]} />

      <div className="container mx-auto px-4 py-8">
        <ul>
          {categories.map(cat => (<li onClick={handleCatClick(cat.slug)}>{cat.name}</li>))}
        </ul>
      </div>

      <ul>
        {category === 'all' && state.posts.map((post: any, index) => {
          return (
            <li key={post.id} className="remix__page__resource">
              <Link to={`/${post.slug}`} prefetch="intent">
                {post.title}
              </Link>
            </li>
          )
        }).slice(1) // Remove first time because its the featured post
        }
        {category !== 'all' && state.categories[category] && state.categories[category].posts.map(post => (<li>{post.title}</li>)

        )}
      </ul>
      {category === 'all' && state.pageInfo.hasNextPage && <button onClick={fetchMorePosts}>{state.loading ? 'Loading...' : 'Fetch More'}</button>}

      {category !== 'all' && state.categories[category] && state.categories[category].pageInfo.hasNextPage && <button onClick={fetchMoreCategories}>{state.loading ? 'Loading...' : 'Fetch More'}</button>}
    </Layout>
  )
}

export default BlogIndex

const query = `
    query GetNextPosts($first: Int, $after: String) {
      categories(first: 10, where: {orderby: COUNT, order: DESC}) {
          edges {
            node {
              slug
              count
              name
            }
          }
        }
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
                        swatch {
                          backgroundColor
                          textColor
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
const fetchQuery = `
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
                        swatch {
                          backgroundColor
                          textColor
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