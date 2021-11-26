import { HeadersFunction, json, Link, LoaderFunction, MetaFunction, redirect, useCatch, useLoaderData } from 'remix'
import { fetchAPI } from '../lib/api/fetch'
import useSite from '../hooks/useSite'
import { defaultSeoImages } from '../lib/wp/site'
import { flattenPost } from '../lib/utils/posts'
import { isEmpty } from 'lodash'

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
    throw new Response("Not Found", { status: 404 });
  }

  const post = flattenPost(wpAPI.postBy)

  return json({post}, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate" } })
};

interface IMetaType {
  data: {
    post: IPost
  } | undefined
}
// Props are coming from the loader function
export let meta: MetaFunction = ({data}: IMetaType): any => {

  if(!data){
    return {
      title: '404',
      description: 'error'
    }
  }

  const post = data?.post
  const {metadata} = useSite()

  // EXAMPLE OF ARRAYS THAT NEED TO BE CONVERTED
  // article: {
  //   publishedTime: post.seo.opengraphPublishedTime,
  //     modifiedTime: post.seo.opengraphModifiedTime,
  //     authors: [
  //     `${metadata.domain}${post.author.uri}`
  //   ],
  //     tags: Array.isArray(post.tags) ? post.tags.map(tag => tag.name) : [],

  return {
    title: post.seo.title,
    description: post.seo.metaDesc,
    canonical: `${metadata.domain}${post.slug}`,
    'twitter:card': `@${metadata.social.twitter.username}`,
    'twitter:site': `@${metadata.social.twitter.username}`,
    'twitter:creator': 'summary_large_image',
    'og:title': post.seo.title,
    'og:type': 'article',
    'og:description': post.seo.metaDesc,

    // convert to function that takes array but returns single og:image tag with value and alt text
    'og:image:alt': post.featuredImage?.altText || defaultSeoImages.generic.alt,
    'og:image:url': post.featuredImage?.sourceUrl || defaultSeoImages.generic.url,
    'og:image:width': '1920',
    'og:image:height': '1080',

    // convert this to function as well
    'og:article:publishedTime': post.seo.opengraphPublishedTime,
    'og:article:modifiedTime': post.seo.opengraphPublishedTime,
    'og:article:author': `${metadata.domain}${post.author.uri}`,

    //convert to function TAGS

  };
};

export default function PostSlug() {
  let {post} = useLoaderData();

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post.content}} />
      <Link to='/'>
        Home
      </Link>
    </div>
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
