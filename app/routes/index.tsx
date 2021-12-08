import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link, HeadersFunction } from 'remix'
import { QUERY_NEXT_POSTS } from '../lib/graphql/queries/posts'
import { flattenAllPosts } from '../lib/utils/posts'
import { fetchAPI } from '../lib/api/fetch'
import { Document, Layout } from '../root'
import { getHtmlMetadataTags } from '../lib/utils/seo'
import { useContext, useEffect, useRef, useState } from 'react'
import useFetchPaginate, { IFetchPaginationState } from '../hooks/useFetchPagination'
import { Simulate } from 'react-dom/test-utils'
import input = Simulate.input
import { async } from 'rxjs'

// headers for the entire DOC when someone refreshes the page or types in the url directly
export const headers: HeadersFunction = ({loaderHeaders}) => {
  return {
    "Cache-Control": "public, max-age=300, stale-while-revalidate"
  }
}

export let meta: MetaFunction = (metaData): any => {
  const {data, location, parentsData} = metaData

  if(!data || !parentsData || !location){
    return {
      title: '404',
      description: 'error: No metaData or Parents Data'
    }
  }

  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: data.post,
    page: data.page,
    location
  })
}

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {
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
  }catch (e){
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

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<any>();
  const {state, addPostsAction, loadingPosts} = useFetchPaginate()

  let stateSource: IFetchPaginationState = state.posts.length > 0 ? state : {
    posts: data.posts,
    page: 1,
    endCursor: data.pageInfo.endCursor,
    hasNextPage: data.pageInfo.hasNextPage,
    loading: false
  }

  async function fetchGithubAction (){
    const rep = await fetch('https://api.github.com/repos/spencersmb/remix-wordpress/actions/workflows/15956885/dispatches',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ',
        },
        body: JSON.stringify({
          ref: "main"
        })
    })
    console.log('rep', rep)
  }

  async function fetchGraphCDN(){
    const rep1 = await fetch('https://admin.graphcdn.io/etheadless',
      {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin":"*",
          'Content-Type': 'application/json', // and specify the Content-Type
          'graphcdn-token': 'e3091df5c5aa5bc2cf316875f0a01978513f2ac0cedbcd7ec895ec7aded5e12c',
        },
        mode: 'cors',
        body: JSON.stringify({
          query: `mutation{
            _purgeQuery(queries: [posts])
          }`
        })
      })
    console.log('rep', rep1)
  }

  async function checkCache(){
    const rep2 = await fetch('https://etheadless.graphcdn.app',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // and specify the Content-Type
        },
        mode: 'cors',
        body: JSON.stringify({
          query: `query GetAllPosts {
  posts(first: 1000) {
    edges {
      node {
        title
        excerpt
        databaseId
        slug
        date
        modified
        categories {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
}
`
        })
      })
    const body = await rep2.json()
    console.log('rep', body)
  }

  async function fetchMore (){
    loadingPosts()
    const url = window.ENV.PUBLIC_WP_API_URL as string
    const variables = {
      after: stateSource.endCursor
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
    const {data} = await body.json()
    const filteredPosts = flattenAllPosts(data.posts) || []
    addPostsAction({
        page: stateSource.page + 1,
        endCursor: data.posts.pageInfo.endCursor,
        hasNextPage: data.posts.pageInfo.hasNextPage,
        posts:[
          ...stateSource.posts,
          ...filteredPosts
        ]
      }
    )
    // setPageInfo({
    //   page: pageInfo.page + 1,
    //   endCursor: data.posts.pageInfo.endCursor,
    //   hasNextPage: data.posts.pageInfo.hasNextPage,
    //   posts: [
    //     ...pageInfo.posts,
    //     ...filteredPosts
    //   ]
    // })
  }

  return (
      <Layout>
        <div className="remix__page">
          <main>
            <h2 className="font-sentinel__SemiBoldItal text-slateGreen text-6xl spencer">Welcome to Remix!</h2>
            <p>We're stoked that you're here. 🥳</p>
            <p>
              Feel free to take a look around the code to see how Remix does things,
              it might be a bit different than what you’re used to. When you're
              ready to dive deeper, we've got plenty of resources to get you
              up-and-running quickly.
            </p>
            <p>
              Check out all the demos in this starter, and then just delete the{" "}
              <code>app/routes/demos</code> and <code>app/styles/demos</code>{" "}
              folders when you're ready to turn this into your next project.
            </p>
          </main>
          <aside>
            <h2>Demos In This App</h2>
            <ul>
              {data.demos.map((demo: any) => (
                <li key={demo.to} className="remix__page__resource">
                  <Link to={demo.to} prefetch="intent">
                    {demo.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h2>Resources</h2>
            <ul>
              {stateSource.posts.map((post: any) => (
                <li key={post.id} className="remix__page__resource">
                  <Link to={post.slug} prefetch="intent">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <button onClick={fetchMore}>{stateSource.loading ? 'Loading...' : 'Fetch More'}</button>
            <div>
              <button onClick={fetchGraphCDN}>Clear Graph</button>
            </div>
            <div>
              <button onClick={checkCache}>checkCache</button>
            </div>
          </aside>
        </div>
      </Layout>
  );
}

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
