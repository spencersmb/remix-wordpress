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
import { mdxPageMeta } from '@App/utils/seo';
import { getStaticPageMeta } from '@App/utils/pageUtils';
import LfmMiniCourseTemplate from '@App/components/pageTemplates/lfm/lfmMiniCourseTemplate';

export interface IlfmMiniCourseCookie {
  video1: boolean
  video2: boolean
  video3: boolean
}

const page = getStaticPageMeta({
  title: 'Learn Font Making: Mini-Course',
  desc: 'Watch the basics of hand lettered font making *and* selling in this 3 part free video series.',
  slug: 'learn-font-making/mini-course',
})
export let meta = mdxPageMeta

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

  return json({ page, cookie, products: formatRawProduct(data.products?.edges) })
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

      <LfmMiniCourseTemplate cookie={cookie} products={products} />

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
