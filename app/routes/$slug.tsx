import { HeadersFunction, json, Link, LoaderFunction, MetaFunction, useLoaderData, useParams } from 'remix'
import { fetchAPI } from '../utils/fetch'
import { getImageSizeUrl, mapPostData } from '../utils/posts'
import Layout from "~/components/layoutTemplates/layout"
import { getHtmlMetadataTags } from '../utils/seo'
import { MouseEventHandler, useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import { getGraphQLString } from '~/utils/graphqlUtils'
import { consoleHelper } from '~/utils/windowUtils'
import MakersPostSignUp from '~/components/post/makersPostSignUp'
import useSite from '~/hooks/useSite'
import Breadcrumbs from '~/components/blog/breadcrumbs'
import BlogDateAuthor from '~/components/blog/date'
import PinterestBlock from '~/components/blog/pinterestBlock'
import CommentsSvg from '~/components/svgs/commentsSvg'
import BarChartSvg from '~/components/svgs/barChartSvg'
import PostCardOne from '~/components/cards/postCardOne'
import { POST_BASIC_FIELDS, POST_FEATURED_IMAGE, PRODUCT_FIELDS, RELEATED_POSTS_FIELDS } from '~/lib/graphql/queries/posts'
import YoutubeSvg from '~/components/svgs/social/youtubeSvg'
import { cssColors } from '~/enums/colors'
import InstagramSvg from '~/components/svgs/social/instagramSvg'
import FacebookSvg from '~/components/svgs/social/facebookSvg'
import LockedSvg from '~/components/svgs/lockedSvg'
import TutorialDownloads from '~/components/blog/tutorialContent/tutorialDownloads'
import PaidProducts from '~/components/blog/tutorialContent/paidProducts'
import YouTubeCard__Post from '~/components/cards/youTubeCard__post'
import BlogAuthor from '~/components/blog/blogAuthor'
import BlogCategories from '~/components/blog/blogCategories'
import BlogComments from '~/components/blog/blogComments'
import { classNames } from '~/utils/appUtils'
import { addClass } from '~/utils/pageUtils'
import BlogTemplate from '~/components/blog/blogTemplate'


//TODO: Check Comment reply - style single comments
// TODO: Load Comments after page has loaded....

// headers for the entire DOC when someone refreshes the page or types in the url directly
export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": "public, max-age=300, stale-while-revalidate"
  }
}

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
      {/* <BlogTemplate post={post} /> */}
    </Layout>
  );
}

const query = gql`
${POST_BASIC_FIELDS}
${POST_FEATURED_IMAGE}
${RELEATED_POSTS_FIELDS}
${PRODUCT_FIELDS}
query postBySlug($slug: String!) {
    postBy(slug: $slug) {
        ...postBasicFields,
        ...featuredImageFields,
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
                sourceUrl
                mediaDetails{
                    sizes{
                        name
                        width
                        height
                        file
                        sourceUrl
                    }
                }
            }
        }
        tutorialManager {
            postExcerpt
            thumbnail {
              image {
                altText
                sourceUrl
              }
            }
            colorPalette {
              downloadUrl
              iconBackgroundColor
              iconTextColor
            }
            paidProducts {
                ...productFields
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