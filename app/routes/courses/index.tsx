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
import { createOgImages, getBasicPageMetaTags, mdxPageMetaV2 } from "@App/utils/seo"
import { consoleHelper } from "@App/utils/windowUtils";
import { isEmpty } from 'lodash';
import { getStaticPageMeta } from '@App/utils/pageUtils';
import { cacheControl } from '@App/lib/remix/loaders';
import { client } from '@App/lib/sanity/sanity';

const description = `Every-Tuesday offers premiem Procreate courses and resources to take your skill to the next level.`;
const title = 'Courses'
const page = getStaticPageMeta({
  title,
  desc: description,
  slug: 'courses',
})
// export let meta = mdxPageMetaV2
export const loader = async () => {
  const query = `*[_type == "course"]`;
  const courses = await client.fetch(query);

  return { courses };
};
// export let loader: LoaderFunction = async ({ request, }) => {
//   let variables = {
//     first: 50,
//     after: null
//   }
//   try {
//     const data = await fetchAPI(getGraphQLString(getCourses),
//       { variables }
//     )

//     return json({
//       page,
//       courses: flattenAllCourses(data.courses),
//     }, {
//       headers: {
//         ...cacheControl
//       }
//     })
//   } catch (e) {
//     console.error('error', e)
//   }
// };

interface ILoaderData {
  courses: ICourse[]
}

const Courses = () => {

  const data = useLoaderData<ILoaderData>()
  console.log('data', data)
  // const test = useSimpleTabs()
  // consoleHelper('data', data, 'routes/courses/index.tsx');

  return (
    <Layout disableNavStyles={true}>
      <CourseHeader />

      <div className='flex flex-col items-center'>
        <h3 className="text-sage-800 mt-12 mb-4 text-5xl font-sentinel__SemiBoldItal desktop:text-6xl desktop:max-w-[500px] desktop:mx-auto text-center tablet:mt-32">Course Collection</h3>

        <div className='grid grid-cols-1 p-8 font-semibold text-center rounded-lg bg-sage-100 tablet:grid-cols-3col-auto tablet:gap-x-8 tablet:p-4'>
          <div className='flex flex-row items-center mb-4 tablet:mb-0 tablet:justify-end'>
            <div className='w-[14px] h-[14px] bg-tangerine-300 mr-1 rounded-sm' />
            <div>Pre-recorded videos</div>
          </div>
          <div className='flex flex-row items-center mb-4 tablet:mb-0'>
            <div className='w-[14px] h-[14px] bg-yellow-400 mr-1 rounded-sm' />
            <div>Step-by-step instructions</div>
          </div>
          <div className='flex flex-row items-center '>
            <div className='w-[14px] h-[14px] bg-emerald-700 mr-1 rounded-sm' />
            <div>Project Based Tutorials</div>
          </div>
        </div>
      </div>

      {/* COURSES LIST */}

      {/* <div className="grid grid-cols-mobile gap-x-5 tablet:grid-cols-2 tablet:grid-flow-row tablet:px-5 laptop:grid-cols-3 max-w-[1450px] mx-auto pb-8 pt-16 desktop:grid-cols-4">

        {data.courses.map((course: ICourse, index: number) => {
          return <CourseCard key={index} course={course} />
        })}

      </div> */}



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