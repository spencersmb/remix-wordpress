import gql from 'graphql-tag';
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import CourseCard from "@App/components/cards/courseCard";
import CourseHeader from "@App/components/courses/courseHeader";
import CourseHighQuality from "@App/components/courses/courseHighQuality";
import Layout from "@App/components/layoutTemplates/layout"
import { fetchAPI } from "@App/utils/fetch.server";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { flattenAllCourses } from "@App/utils/posts";
import { getBasicPageMetaTags, getHtmlMetadataTags } from "@App/utils/seo"
import { consoleHelper } from "@App/utils/windowUtils";
import { cacheControl } from '@App/lib/remix/loaders';
import { isEmpty } from 'lodash';

const description = `Every-Tuesday offers premiem Procreate courses and resources to take your skill to the next level.`;
const title = 'Courses'
const pageMetaData = {
  title,
  slug: 'courses',
  description,
  seo: {
    title,
    opengraphModifiedTime: '',
    metaDesc: description
  }
}
// export let meta: MetaFunction = (metaData): any => (getBasicPageMetaTags(metaData, {
//   title,
//   desc: pageMetaData.description,
//   slug: pageMetaData.slug,
// }))
export let meta: MetaFunction = (metaData): any => {
  const { data, location, parentsData } = metaData
  if (!data || !parentsData || isEmpty(parentsData) || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: data.post,
    page: data.page,
    location
  })
}

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
      page: pageMetaData,
      courses: flattenAllCourses(data.courses),
    }, {
      headers: {
        ...cacheControl
      }
    })
  } catch (e) {
    console.error('error', e)
  }
};

interface ILoaderData {
  courses: ICourse[]
}

const Courses = () => {

  const data = useLoaderData<ILoaderData>()
  // const test = useSimpleTabs()
  consoleHelper('data', data, 'routes/courses/index.tsx');

  return (
    <Layout>
      <CourseHeader />
      <CourseHighQuality />

      {/* COURSES LIST */}

      <div className="grid grid-cols-mobile gap-x-5 tablet:grid-cols-2 tablet:grid-flow-row tablet:px-5 laptop:grid-cols-3 max-w-[1450px] mx-auto pb-8 pt-16">

        {data.courses.map((course: ICourse, index: number) => {
          return <CourseCard key={index} course={course} />
        })}

      </div>



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