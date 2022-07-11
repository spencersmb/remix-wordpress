import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { lfmMiniCourseCookie } from '@App/cookies.server'
import { findCookie } from '@App/utils/loaderHelpers'
import { consoleHelper } from '@App/utils/windowUtils';
import { isEmpty } from 'lodash';
import MiniCourseBanner from '@App/components/lfm/mini-course/miniCourseBanner';
import Layout from '@App/components/layoutTemplates/layout';
import LfmMiniCourseNavMobile from '@App/components/lfm/mini-course/nav/miniCourseNav';
import useScript from '@App/hooks/useScript';
import gql from 'graphql-tag';
import { fetchAPI } from '@App/utils/fetch.server';
import { getGraphQLString } from '@App/utils/graphqlUtils';
import { formatRawProduct } from '@App/utils/productPageUtils';
import LazyImgix from '@App/components/images/lazyImgix';
import { staticImages } from '@App/lib/imgix/data';
import { breakpointConvertPX } from '@App/utils/appUtils';
import useSite from '@App/hooks/useSite';

export interface IlfmMiniCourseCookie {
  video1: boolean
  video2: boolean
  video3: boolean
}
export let loader: LoaderFunction = async ({ request }) => {
  // TODO: GET COOKIE DATA FUNCTION
  // ADD IN TOP LEVEL
  // THEN FIND WITH USE MATCHES To UNLOCK PAGE
  const cookie = await findCookie<IlfmMiniCourseCookie>(request, lfmMiniCourseCookie)
  const ids = process.env.PUBLIC_WP_API_URL === 'https://etheadless.local/graphql/' ? [10051, 10053, 8558, 8934] : [10051, 10053, 8558, 8934]
  let data = await fetchAPI(getGraphQLString(query), {
    variables: {
      ids
    }
  })

  return json({ cookie, products: formatRawProduct(data.products?.edges) })
}

interface IDataType {
  products: IProduct[]
  cookie: {
    hasCookie: boolean
    data: {
      video1: boolean
      video2: boolean
      video3: boolean
    } | null
  }
}

function LfmMiniCourse(props: any) {
  const { cookie, products }: IDataType = useLoaderData()
  const { state: { breakpoint } } = useSite()
  consoleHelper('minicourse home page', cookie)
  consoleHelper('minicourse products', products)
  const wistaScript2 = `https://fast.wistia.com/assets/external/E-v1.js`
  useScript(wistaScript2)

  if (isEmpty(cookie)) {
    return <Layout>
      <MiniCourseBanner showForm={true} />
    </Layout>
  }
  return (
    <Layout>

      <div className='bg-[#F7F6F7] flex flex-col'>

        <div className='et-grid-basic'>



          <div className='relative col-span-2 col-start-2 my-4 tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 tablet:mt-8 tablet:pl-5 desktop:col-start-4 desktop:col-span-8'>
            {breakpointConvertPX(breakpoint) >= 1024 &&
              <div className='absolute top-[-170px] left-[-120px] w-full max-w-[120px]'>
                <LazyImgix
                  id={'scribble-5'} image={{
                    width: staticImages.scribbles.scribble_5.width,
                    height: staticImages.scribbles.scribble_5.height,
                    alt: 'Learn Font Making: Free Mini Course',
                    src: staticImages.scribbles.scribble_5.src,
                    placeholder: staticImages.scribbles.scribble_5.placeholder
                  }}
                />
              </div>}
            <h1 className='font-semibold text-sage-600'>Learn Font Making</h1>
            <h2 className='text-4xl font-sentinel__SemiBoldItal text-sage-800'>Mini Course</h2>
          </div>
        </div>

        <LfmMiniCourseNavMobile {...cookie.data} />

        <Outlet context={{ cookie: { ...cookie.data }, products }} />

      </div>

    </Layout>
  )
}

export default LfmMiniCourse

const query = gql`
  query productsForMiniCourse($ids: [ID!]) {
    products(where: {in: $ids}) {
    edges {
      node {
        title
        id
        slug
        productDetails {
          youtube {
            url
          }
          font{
            name
          }
          licences {
            licenseType
            price
            url
          }
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
