import { HeadersFunction, json, Link, LoaderFunction, MetaFunction, useLoaderData, useParams } from 'remix'
import { fetchAPI } from '../utils/fetch'
import { mapPostData } from '../utils/posts'
import { Layout } from '../root'
import { getHtmlMetadataTags } from '../utils/seo'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { gql } from '@apollo/client'
import { getGraphQLString } from '~/utils/graphqlUtils'
import { consoleHelper } from '~/utils/windowUtils'
import { useEventListenerQueryAll } from '~/hooks/useHtmlEvent'
import MakersPostSignUp from '~/components/post/makersPostSignUp'
import useSite from '~/hooks/useSite'

// headers for the entire DOC when someone refreshes the page or types in the url directly
export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": "public, max-age=300, stale-while-revalidate"
  }
}

export let loader: LoaderFunction = async ({ params }) => {
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
    post: mapPostData(wpAPI.postBy)
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
    page: null,
    location
  })
};

export default function PostSlug() {
  let { post } = useLoaderData();
  const { showComments, hideComments, state: { commentsModal } } = useSite();
  consoleHelper('post', post)

  function handleCommentsClick() {
    if (commentsModal.show) {
      return
    }
    console.log('post.comments', post.comments)

    showComments({
      commentOn: post.databaseId,
      comments: post.comments
    })
  }

  useEffect(() => {
    return () => {
      // unmount or change route, close modal
      hideComments()
    }
  }, [])

  return (
    <Layout>
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <MakersPostSignUp />
        <div>
          Comments
          <div onClick={handleCommentsClick}>
            Show Comment
          </div>
        </div>
        <Link to='/'>
          Home
        </Link>
      </div>
    </Layout>
  );
}

const query = gql`
query postBySlug($slug: String!) {
    postBy(slug: $slug) {
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
            paidProducts {
                ... on Product {
                    title
                }
            }
            youtube {
                embedUrl
            }
            colorSwatch
            downloads {
                __typename
                ... on ResourceLibrary {
                    title
                    freebie {
                        downloadLink
                    }
                }
            }
        }
        comments {
            edges {
                node {
                    databaseId
                    id
                    author {
                        node {
                            name
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
                                author {
                                    node {
                                        id
                                        name
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