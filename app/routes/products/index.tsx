import gql from 'graphql-tag';
import { useEffect, useState } from "react";
import { useFonts } from "@App/hooks/useFonts";
import Layout from "@App/components/layoutTemplates/layout";
import { fetchAPI } from "@App/utils/fetch.server";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { createOgImages, getBasicPageMetaTags, mdxPageMeta } from "@App/utils/seo";
import FeaturedProduct from "@App/components/products/featureProduct";
import GumroadProductCard from "@App/components/products/gumroadProductCard";
import { metaDataMatches } from "@App/hooks/remixHooks";
import { LicenseEnum, ShopPlatformEnum } from "@App/enums/products";
import useSite from "@App/hooks/useSite";
import { rearrangeLicenses } from "@App/utils/posts";
import UseFontPreviewProvider from "@App/hooks/useFontPreivew/useFontPreviewProvider";
import ProductLayout from "@App/components/products/productLayout";
import type { HeadersFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { consoleHelper } from '@App/utils/windowUtils';
import { formatRawProduct } from '@App/utils/productPageUtils';
import { cacheControl } from '@App/lib/remix/loaders';
import { isEmpty } from 'lodash';
import { getStaticPageMeta } from '@App/utils/pageUtils';


const page = {
  title: 'Products',
  slug: 'products',
  description: 'Every-Tuesday.com digital products for sale using the Procreate app.',
  seo: {
    title: 'Products',
    opengraphModifiedTime: '',
    metaDesc: 'Every-Tuesday.com digital products for sale using the Procreate app.'
  }
}
const pageMeta = getStaticPageMeta({
  title: page.title,
  desc: page.description,
  slug: page.slug,
})
// export let meta: MetaFunction = (metaData): any => (getBasicPageMetaTags(metaData, {
//   title: page.title,
//   desc: page.description,
//   slug: page.slug,
// }))
// export let meta: MetaFunction = (metaData): any => {
//   const { data, location, parentsData } = metaData
//   if (!data || !parentsData || isEmpty(parentsData) || !location) {
//     return {
//       title: '404',
//       description: 'error: No metaData or Parents Data',
//     }
//   }
//   const metadata = parentsData.root.metadata
//   let googleFollow = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
//   const url = `${metadata.domain}${location.pathname}`
//   console.log('META')
//   return {
//     'robots': googleFollow,
//     canonical: url,
//     'og:locale': 'en_US',
//     'og:site_name': `${metadata.siteTitle}.com`,
//     'og:type': 'website',
//     title: pageMeta.seo.title,
//     description: pageMeta.seo.metaDesc,
//     'og:title': pageMeta.seo.title,
//     'og:description': pageMeta.seo.metaDesc,
//     ...createOgImages({
//       altText: pageMeta.featuredImage?.altText || 'defaultFeaturedImage.altText',
//       url: pageMeta.featuredImage?.sourceUrl || 'defaultFeaturedImage.sourceUrl',
//       width: '1920',
//       height: '1080'
//     }),
//     'twitter:card': `@${metadata.social.twitter.username}`,
//     'twitter:site': `@${metadata.social.twitter.username}`,
//     'twitter:creator': 'summary_large_image',
//     'twitter:label1': `Written by`,
//     'twitter:data1': `Teela`,
//     'twitter:label2': `Est. reading time`,
//     'twitter:data2': `1 minute`,
//   }
// }

export let meta = mdxPageMeta({
  page: pageMeta
})

export let loader: LoaderFunction = async ({ request, }) => {
  let variables = {
    first: 50,
    after: null
  }
  try {
    const data = await fetchAPI(getGraphQLString(getProducts),
      { variables }
    )

    return json({
      page,
      products: formatRawProduct(data.products?.edges),
    }, {
      headers: {
        ...cacheControl
      }
    })
  } catch (e) {
    console.error('error products page', e)
    return null
  }
};

function ProductsIndex() {
  const data = useLoaderData()
  const { metadata } = metaDataMatches()
  consoleHelper('data', data, '/routes/products/index.tsx');
  // const { fontLoadingState, setFontClickHandler } = useFonts()
  // const { state } = useSite()

  return (
    <UseFontPreviewProvider>
      <Layout>
        <ProductLayout products={data.products} metadata={metadata} />
      </Layout>
    </UseFontPreviewProvider>
  )
}

export default ProductsIndex

const getProducts = gql`
  query GetProducts($first: Int, $after: String) {
    products(first: $first, after: $after) {
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
            productContent{
              subtitle
              description
              productfeatureimage{
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