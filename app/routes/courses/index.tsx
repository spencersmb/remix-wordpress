import { gql } from "@apollo/client";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import CourseHeader from "~/components/courses/courseHeader";
import CourseHighQuality from "~/components/courses/courseHighQuality";
import Layout from "~/components/layoutTemplates/layout"
import { POST_FEATURED_IMAGE } from "~/lib/graphql/queries/posts";
import { fetchAPI } from "~/utils/fetch.server";
import { getGraphQLString } from "~/utils/graphqlUtils";
import { flattenAllCourses, rearrangeLicenses } from "~/utils/posts";
import { getBasicPageMetaTags } from "~/utils/seo"

export let meta: MetaFunction = (metaData): any => (getBasicPageMetaTags(metaData, {
  title: `Courses - Every-Tuesday`,
  desc: `Tons of Procreate Brushes, textures, and highrez assets to choose from`,
  slug: `courses`,
}))

export let loader: LoaderFunction = async ({ request, }) => {
  let variables = {
    first: 50,
    after: null
  }
  try {
    const data = await fetchAPI(getGraphQLString(getCourses),
      { variables }
    )

    return json({
      courses: flattenAllCourses(data.courses),
    })
  } catch (e) {
    console.log('error', e)
  }
};

const Courses = () => {
  const data = useLoaderData()
  console.log('data', data);

  return (
    <Layout>
      <CourseHeader />
      <CourseHighQuality />
    </Layout>
  )
}

export default Courses

const getCourses = gql`
  query getCourses($first: Int, $after: String) {
    courses(first: $first, after: $after) {
      edges {
        node{
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
  }
`