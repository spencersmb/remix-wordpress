
import { flattenAllPosts } from '../utils/posts'
import { fetchAPI, fetchFontPreviewFile } from '../utils/fetch.server'
import { getHtmlMetadataTags } from '../utils/seo'
import { useContext, useEffect, useRef, useState } from 'react'
import useFetchPaginate, { IFetchPaginationState } from '../hooks/useFetchPagination'
import useSite from '../hooks/useSite'
import { validateEmail } from '~/utils/validation'
import { consoleHelper } from '~/utils/windowUtils'
import { ckFormIds } from '~/lib/convertKit/formIds'
import { getSession } from '~/sessions.server'
import { createCanvas, Image, registerFont } from "canvas";
import tuesdayFont from '../server/fonts/tuesday/tuesdayscript-regular-webfont.ttf'
// import { createAlphabetImages } from "~/server/fonts/fontPreviewUtils";
import Layout from "~/components/layoutTemplates/layout";
import type { ActionFunction, HeadersFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": "public, max-age=300, stale-while-revalidate"
  }
}

export let meta: MetaFunction = (metaData): any => {
  const { data, location, parentsData } = metaData

  if (!data || !parentsData || !location) {
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

  // const fontPreview = await fetchFontPreviewFile('skinny')

  // https://remix.run/api/remix#json
  return {
    ...data,
    posts,
    pageInfo,
  }
};

// TODO: AM I USING THIS
export let action: ActionFunction = async ({ request }): Promise<any | Response> => {

  let form = await request.formData();
  let email = form.get('email')
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof email !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }

  let fields = { email };
  let fieldErrors = {
    email: validateEmail(email)
  };

  consoleHelper('fieldErrors', fieldErrors)
  const id = ckFormIds.resourceLibrary.landingPage
  const url = `https://api.convertkit.com/v3/forms/${id}/subscribe`;

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };
  //
  // try {
  //   // Sign user up
  //   const res = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       api_key: process.env.CK_KEY,
  //       email,
  //     }),
  //   })
  //
  //   return json({ form: 'success' })
  // } catch (e) {
  //   return json({ form: 'fail' })
  // }
  return { value: 'string' }

}

function TestModal() {
  return (
    <div>Template Modal</div>
  )
}
// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<any>();
  console.log('index data', data);


  const { state, addPostsAction, loadingPosts, clearPosts } = useFetchPaginate({
    posts: data.posts,
    pageInfo: {
      ...data.pageInfo,
      page: data.page
    }
  })
  const { openModal, closeModal } = useSite()

  async function fetchGithubAction() {
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

  async function fetchGraphCDN() {
    const rep1 = await fetch('https://admin.graphcdn.io/etheadless',
      {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
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

  async function checkCache() {
    const rep2 = await fetch('https://etheadless.graphcdn.app',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // and specify the Content-Type
        },
        mode: 'cors',
        body: JSON.stringify({
          query: `{posts{
    edges{
      node{
        title
      }
    }
  }}
`
        })
      })
    const body = await rep2.json()
    console.log('rep', body)
  }

  async function fetchMore() {
    loadingPosts()
    const url = window.ENV.PUBLIC_WP_API_URL as string
    const variables = {
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
    }
    )
  }

  function open() {
    openModal({ template: TestModal })
  }

  /*
    Font preview loader example
  */



  return (
    <Layout>
      <div className="remix__page">
        <main>
          <h2 className="text-6xl font-sentinel__SemiBoldItal sky">Welcome to Remix! Staging 3</h2>
          <p className={`text-red-600`}>We're stoked that you're here. 🥳</p>
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
            {state.posts.map((post: any) => {
              return (
                <li key={post.id} >
                  <Link to={`/${post.slug}`} prefetch="intent">
                    {post.title}
                  </Link>
                </li>
              )
            })}
          </ul>
          {state.pageInfo.hasNextPage && <button onClick={fetchMore}>{state.loading ? 'Loading...' : 'Fetch More'}</button>}
        </aside>
      </div>
      <div><button onClick={open}>OPen modal</button></div>
    </Layout>
  );
}

const query = `
    query GetNextPosts($after: String) {
        posts(first: 10, after: $after) {
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