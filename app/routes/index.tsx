
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
import IpadVerticalAnimation from '@App/components/layout/ipadVerticalAnimation';
import { ClientOnly } from "remix-utils";
import HomeTemplate from '@App/components/pageTemplates/homeTemplate'

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

// https://remix.run/guides/routing#index-routes
interface LoaderData {
  courses: ICourse[]
  pageInfo: IwpPageInfo
  posts: IPost[]
}
export default function Index() {
  let data = useLoaderData<typeof loader>();
  let { courses, posts } = data

  return (
    <Layout>
      <HomeTemplate courses={courses} posts={posts} />
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