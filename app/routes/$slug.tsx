import { HeadersFunction, json, Link, LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { fetchAPI } from '../lib/api/fetch'
import { mapPostData } from '../utils/posts'
import { Layout } from '../root'
import { getHtmlMetadataTags } from '../utils/seo'

// headers for the entire DOC when someone refreshes the page or types in the url directly
export const headers: HeadersFunction = ({loaderHeaders}) => {
  return {
    "Cache-Control": "public, max-age=300, stale-while-revalidate"
  }
}

export let loader: LoaderFunction = async ({ params }) => {
  let wpAPI = await fetchAPI(query, {
    variables: {
      slug: `${params.slug}`
    }
  })

  if(wpAPI.postBy === null){
    //TODO: redirect to custom 404 page
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    post:  mapPostData(wpAPI.postBy)
  })
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = (metaData): any => {
  const {data, location, parentsData} = metaData
  if(!data || !parentsData || !location){
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: data.post,
    page: null,
    location
  })
};

export default function PostSlug() {
  let {post} = useLoaderData();

  return (
      <Layout>
        <div>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{__html: post.content}} />
          <Link to='/'>
            Home
          </Link>
        </div>
      </Layout>
  );
}

const query = `
query postBySlug($slug: String!) {
    postBy(slug: $slug) {
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
                uri
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
        tags{
            edges{
                node{
                    name
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
        seo{
            title
            opengraphPublishedTime
            opengraphModifiedTime
            metaDesc
            readingTime
        }
      }
  }
`
