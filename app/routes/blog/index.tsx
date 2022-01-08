import { Link, LoaderFunction, useLoaderData } from "remix";
import useFetchPaginate from "~/hooks/useFetchPagination";
import { Layout } from "~/root";
import { fetchAPI } from "~/utils/fetch";
import { flattenAllPosts } from "~/utils/posts";
import { consoleHelper } from "~/utils/windowUtils";


type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

export let loader: LoaderFunction = async ({ request }) => {

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
      variables: {
        after: null
      }
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
    pageInfo
  }
};
function BlogIndex() {
  let data = useLoaderData<any>();
  console.log('data', data)
  const { state, addPostsAction, loadingPosts } = useFetchPaginate()
  console.log('state', state);


  async function fetchMore() {
    loadingPosts()
    const url = window.ENV.PUBLIC_WP_API_URL as string
    const variables = {
      after: state.endCursor
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
      page: state.page + 1,
      endCursor: data.posts.pageInfo.endCursor,
      hasNextPage: data.posts.pageInfo.hasNextPage,
      posts: [
        ...state.posts,
        ...filteredPosts
      ]
    }
    )
  }

  return (
    <Layout>
      BLog index
      <ul>
        {state.posts.map((post: any) => {
          return (
            <li key={post.id} className="remix__page__resource">
              <Link to={`/${post.slug}`} prefetch="intent">
                {post.title}
              </Link>
            </li>
          )
        })}
      </ul>
      {state.hasNextPage && <button onClick={fetchMore}>{state.loading ? 'Loading...' : 'Fetch More'}</button>}
    </Layout>
  )
}

export default BlogIndex

const query = `
    query GetNextPosts($after: String) {
        posts(first: 10, after: $after) {
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