import { fetchAPI } from '../utils/fetch.server'
import { mapPostData } from '../utils/posts'
import Layout from "@App/components/layoutTemplates/layout"
import { createOgArticle, createOgImages, getHtmlMetadataTags, mdxPageMetaV2 } from '../utils/seo'
import gql from 'graphql-tag';
import { getGraphQLString } from '@App/utils/graphqlUtils'
import { POST_BASIC_FIELDS, POST_FEATURED_IMAGE, POST_RESOURCE_FIELDS, PRODUCT_FIELDS, RELEATED_POSTS_FIELDS } from '@App/lib/graphql/queries/posts'
import type { HeadersFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import { useLoaderData, useMatches } from '@remix-run/react'
import { isEmpty } from 'lodash';
import BlogSlugTemplate from '@App/components/pageTemplates/blogSlugTemplate';

//TODO: Check Comment reply - style single comments
// TODO: Load Comments after page has loaded....

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
      // ...cacheControl
    }
  })
};

export let meta = mdxPageMetaV2

export default function PostSlug() {
  let { post } = useLoaderData<typeof loader>();
  console.log('post', post)
  return (
    <Layout>
      {/* Blog post */}
      <BlogSlugTemplate post={post} />
    </Layout>
  );
}

const query = gql`
  ${POST_BASIC_FIELDS}
  ${POST_FEATURED_IMAGE}
  ${RELEATED_POSTS_FIELDS}
  ${POST_RESOURCE_FIELDS}
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
          quickSummary
          youtube {
              id
              addVideoMetadata
              duration
              videoObject {
                description
                uploadDate
                thumbnailUrl
                clipElements {
                  name
                  startOffset
                  endOffset
                }
                potentialActions{
                  name
                  startOffset
                }
              }
          }
          downloads {
            ... on ResourceLibrary {
              title
              freebie {
                  downloadLink
              }
            }
          }
          ...postResourceFields
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