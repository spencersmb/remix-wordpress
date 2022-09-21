
import { flattenAllCourses, flattenAllPosts } from '../utils/posts'
import { fetchAPI, fetchFontPreviewFileServer } from '../utils/fetch.server'
import { getHtmlMetadataTags } from '../utils/seo'
import { useContext, useEffect, useRef, useState } from 'react'
import useFetchPaginate, { IFetchPaginationState } from '../hooks/useFetchPagination'
import useSite from '../hooks/useSite'
import { validateEmail } from '@App/utils/validation'
import { consoleHelper } from '@App/utils/windowUtils'
import { ckFormIds } from '@App/lib/convertKit/formIds'
import { getSession } from '@App/sessions.server'
import { createCanvas, Image, registerFont } from "canvas";
import tuesdayFont from '../server/fonts/tuesday/tuesdayscript-regular-webfont.ttf'
// import { createAlphabetImages } from "@App/server/fonts/fontPreviewUtils";
import Layout from "@App/components/layoutTemplates/layout";
import type { ActionFunction, HeadersFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import TransformSkillsHeader from '@App/components/headers/transformSkillsHeader'
import gql from 'graphql-tag'
import { getGraphQLString } from '@App/utils/graphqlUtils'
import StartHere from '@App/components/homePage/startHere'
import FeatureCourses from '@App/components/homePage/featureCourses'
import LfmMiniCourse from '@App/components/homePage/lfmMiniCourse'
import ProcreateBrushes from '@App/components/homePage/procreateBrushes'
import FeaturedBlogPosts from '@App/components/homePage/featuredBlogPosts'
import AboutMeFeature from '@App/components/homePage/aboutMeFeature'
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

  let wpAPI
  const courseListDev: number[] = [
    7699, // LFM
    10049, // Beautiful Lettering
    8936, // Watercolor Lettering In Procreate
    9639, // Gouache Botanicals in Procreate
    9197, // Watercolor Florals in Procreate
    8339, // 3D Lettering in Procreate

  ]
  const courseListProd: number[] = [
    7699, // LFM
    10049, // Beautiful Lettering
    8936, // Watercolor Lettering In Procreate

    9639, // Gouache Botanicals in Procreate
    9197, // Watercolor Florals in Procreate
    10440 // Messy Watercolors in Procreate
  ]
  let coursesIdList = process.env.NODE_ENV === "production"
    ? courseListProd
    : courseListDev

  try {
    wpAPI = await fetchAPI(getGraphQLString(query), {
      variables: {
        after: null,
        courses: coursesIdList
      }
    })
  } catch (e) {
    console.log('error', e)
  }
  const pageInfo = wpAPI?.posts?.pageInfo
  const posts = flattenAllPosts(wpAPI?.posts) || []
  const courses = flattenAllCourses(wpAPI?.courses) || []

  // const fontPreview = await fetchFontPreviewFileServer('skinny')
  // console.log('fontPreview', fontPreview);


  // https://remix.run/api/remix#json
  return {
    posts,
    courses,
    pageInfo,
  }
};

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
  const id = ckFormIds.resourceLibrary.sellPage
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
interface LoaderData {
  courses: ICourse[]
  pageInfo: IwpPageInfo
  posts: IPost[]
}
export default function Index() {
  let data = useLoaderData<LoaderData>();
  let { courses, posts } = data
  console.log('index data', data);


  const { state, addPostsAction, loadingPosts, clearPosts } = useFetchPaginate({
    posts: data.posts,
    pageInfo: {
      ...data.pageInfo,
      page: 1
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

  return (
    <Layout>
      <div className='remix__page'>

        <TransformSkillsHeader />

        <StartHere />

        <FeatureCourses courses={courses} />

        <LfmMiniCourse />

        <ProcreateBrushes />

        <FeaturedBlogPosts posts={posts} />

        <AboutMeFeature />

      </div>
    </Layout>
  );
}

const query = gql`
    query HomePageQuery($after: String, $courses: [ID]) {
      courses(where: {in: $courses}) {
        edges {
          node {
            id
            title
            slug
            details{
              courseTags{
                tag
              }
              courseUrl
            }
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
          }
        }
      }
      posts(first: 4, after: $after) {
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