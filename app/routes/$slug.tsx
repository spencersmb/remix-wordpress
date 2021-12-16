import { HeadersFunction, json, Link, LoaderFunction, MetaFunction, useLoaderData, useParams } from 'remix'
import { fetchAPI } from '../lib/api/fetch'
import { mapPostData } from '../utils/posts'
import { Layout } from '../root'
import { getHtmlMetadataTags } from '../utils/seo'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { gql } from '@apollo/client'
import { getGraphQLString } from '~/utils/graphqlUtils'
import { consoleHelper } from '~/utils/windowUtils'
import { useEventListenerQueryAll } from '~/hooks/useHtmlEvent'

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
  // consoleHelper('post', post)
  useEventListenerQueryAll('.tt-freebie-download.tt-modal-trigger', triggerStyleStudies)


  function triggerStyleStudies(e: any) {
    e.preventDefault();
    const data = JSON.parse(e.currentTarget.getAttribute('data-params'))
    console.log(data);


    // get tile from data-attr to match with the data title in the post
    // find the match
    // detect if Resource user is signed in, or if localstorage has data in it saying they signed up at some point
    // if nothing found show pop-up for sign-up
  }

  return (
    <Layout>
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
        __typename
        id
        downloadManager {
          downloads {
            ...on DownloadFreebie{
              downloadDetails {
                etdmCampaign
                etdmDescriptor
                etdmFileSize
                etdmFileType
                etdmLink
                etdmSsVersion
                etdmTitle
                etdmVersion
              }
            }
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
      }
  }
`
