import { useEffect, useState } from "react";
import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import useFetchPaginate from "~/hooks/useFetchPagination";
import Layout from "~/components/layoutTemplates/layout";
import { fetchAPI } from "~/utils/fetch";
import { flattenAllPosts } from "~/utils/posts";
import { getBasicPageMetaTags, getHtmlMetadataTags } from "~/utils/seo";
import { consoleHelper } from "~/utils/windowUtils";

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
    pageUrlParams: page ? parseInt(page, 10) : 1
  }
};

function BlogIndex() {
  let data = useLoaderData<any>();
  console.log('Blog Index data', data)
  // const [posts, setPosts] = useState(data.posts)
  const { state, addPostsAction, loadingPosts, clearPosts } = useFetchPaginate({
    posts: data.posts,
    pageInfo: {
      ...data.pageInfo,
      page: data.pageUrlParams
    }
  })
  console.log('Blog Index state', state);

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
      clearPosts()
    }
  }, [])

  async function fetchMore() {
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
          query,
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

  const featuredPost = data.posts[0]
  return (
    <Layout>
      BLog index
      <div>
        Featured
        <h2 className="text-blue-500">
          <Link to={`/${featuredPost.slug}`} prefetch="intent">
            {featuredPost.title}
          </Link>
        </h2>
      </div>
      <ul>
        {state.posts.map((post: any, index) => {
          return (
            <li key={post.id} className="remix__page__resource">
              <Link to={`/${post.slug}`} prefetch="intent">
                {post.title}
              </Link>
            </li>
          )
        }).slice(1) // Remove first time because its the featured post
        }
      </ul>
      {state.pageInfo.hasNextPage && <button onClick={fetchMore}>{state.loading ? 'Loading...' : 'Fetch More'}</button>}
    </Layout>
  )
}

export default BlogIndex

const query = `
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