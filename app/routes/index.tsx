import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link, HeadersFunction } from 'remix'
import { QUERY_NEXT_POSTS } from '../lib/graphql/queries/posts'
import { flattenAllPosts } from '../lib/utils/posts'
import { fetchAPI } from '../lib/api/fetch'
import { Document, Layout } from '../root'
import { getHtmlMetadataTags } from '../lib/utils/seo'

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

  const urls = [
    'https://etheadless.wpengine.com/10-hand-lettering-enhancements/',
    "https://courses.etheadless.wpengine.com/p/3d-lettering-in-procreate",
    'https://etheadless.wpengine.com/wp-content/uploads/2018/03/install-patterns.jpg'
  ]

  urls.forEach(url => {
    let urlObj = new URL(url)

    // First check to replace url
    // get first position of the host to check if its the primary domain
    let host = urlObj.host
    let domains = ['etheadless', 'everytuesday']
    let isPrimaryDomain = domains.includes(host.split('.')[0])

    // it still could have an asset, so we need to check the path for
    let pathName = urlObj.pathname.slice(1)
    let isWP_Content = pathName.split('/')[0] === 'wp-content'

    // if its the primaryDomain but not an asset, alter the forwarding url
    if(isPrimaryDomain && !isWP_Content){

    }
    // console.log('origin', urlObj.origin)
    // console.log('isPrimaryDomain', isPrimaryDomain)
    // console.log('pathName', urlObj.pathname)
    // console.log('isWp_Content', isWP_Content)
    //
    // console.log('host', urlObj.host)
    // console.log('hash', urlObj.hash)
    // console.log('href', urlObj.href)
  })



  async function fetchMore (){
    const rep = await fetch('https://api.github.com/repos/spencersmb/remix-wordpress/actions/workflows/15956885/dispatches',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
        },
        body: JSON.stringify({
          ref: "main"
        })
    })
    console.log('rep', rep)
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
              {data.posts.map((post: any) => (
                <li key={post.id} className="remix__page__resource">
                  <Link to={post.slug} prefetch="intent">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <button onClick={fetchMore}>Fetch More</button>
          </aside>
        </div>
      </Layout>
  );
}

export const query = `
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
                    __typename
                    author {
                        node {
                            avatar {
                                height
                                url
                                width
                            }
                            id
                            name
                            slug
                        }
                    }
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
                    content
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
                    databaseId
                    title
                    slug
                    isSticky
                }
            }
        }
        allSettings {
            readingSettingsPostsPerPage
        }
    }
`
