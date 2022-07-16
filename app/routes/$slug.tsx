import { fetchAPI } from '../utils/fetch.server'
import { mapPostData } from '../utils/posts'
import Layout from "@App/components/layoutTemplates/layout"
import { getHtmlMetadataTags } from '../utils/seo'
import gql from 'graphql-tag';
import { getGraphQLString } from '@App/utils/graphqlUtils'
import { POST_BASIC_FIELDS, POST_FEATURED_IMAGE, PRODUCT_FIELDS, RELEATED_POSTS_FIELDS } from '@App/lib/graphql/queries/posts'
import BlogTemplate from '@App/components/blog/blogTemplate'
import type { HeadersFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { cacheControl } from '@App/lib/remix/loaders';
// @ts-nocheck

//TODO: Check Comment reply - style single comments
// TODO: Load Comments after page has loaded....

// headers for the entire DOC when someone refreshes the page or types in the url directly
// export const headers: HeadersFunction = ({ loaderHeaders }) => {
//   return {
//     "Cache-Control": "public, max-age=300, stale-while-revalidate"
//   }
// }

export let loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url)
  let wpAPI = await fetchAPI(getGraphQLString(query), {
    variables: {
      slug: `${params.slug}`
    }
  })

  if (wpAPI.postBy === null) {
    //TODO: redirect to custom 404 page
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    post: mapPostData(wpAPI.postBy),
    url
  }, {
    headers: {
      ...cacheControl
    }
  })
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = (metaData): any => {
  const { data, location, parentsData } = metaData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }
  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: data.post,
    location
  })
};

export default function PostSlug() {
  let { post } = useLoaderData<{ post: IPost, url: any }>();

  return (
    <Layout>
      <BlogTemplate post={post} />
    </Layout>
  );
}

const query = gql`
  ${POST_BASIC_FIELDS}
  ${POST_FEATURED_IMAGE}
  ${RELEATED_POSTS_FIELDS}
query postBySlug($slug: String!) {
    postBy(slug: $slug) {
        ...postBasicFields
        ...featuredImageFields
        ...relatedPostsFields
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
        etSocialNav{
            pinterestMeta {
              description
            }
            pinterestImage{
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
        tutorialManager {
            postExcerpt
            thumbnail {
              image {
                altText
                caption
                sourceUrl
                srcSet
                sizes
                id
                mediaDetails{
                  width
                  height
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
              downloadUrl
              iconBackgroundColor
              iconTextColor
            }
            paidProducts {
              ... on Product{
                title 
                slug
                featuredImage {
                  node {
                    mimeType
                    mediaDetails {
                      height
                      width
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
                productDetails {
                  licences {
                    licenseType
                    price
                    url
                  }
                }
              }
            }
            youtube {
                embedUrl
            }
            downloads {
                ... on ResourceLibrary {
                    title
                    freebie {
                        downloadLink
                    }
                }
            }
        }
        comments(first: 500, after: null, where: {parent: null}) {
            pageInfo{
              endCursor
              hasNextPage
            }
            edges {
                node {
                    databaseId
                    approved
                    parent {
                      node {
                        databaseId
                      }
                    }
                    id
                    author {
                        node {
                          isRestricted
                            name
                            ... on CommentAuthor {
                              gravatar{
                                url
                              }
                            }
                        }
                    }
                    date
                    commentedOn {
                        node {
                            id
                            status
                        }
                    }
                    content
                    replies {
                        edges {
                            node {
                                id
                                databaseId
                                content
                                date
                                parent {
                                  node {
                                    databaseId
                                  }
                                }
                                author {
                                    node {
                                        name
                                      ... on CommentAuthor {
                                        gravatar{
                                          url

                                        }
                                      }
                                    }
                                }
                                
                            }
                        }
                    }
                }
            }
        }
      }
  }
`