import gql from 'graphql-tag';
import { useEffect, useState } from "react";
import { useFonts } from "@App/hooks/useFonts";
import Layout from "@App/components/layoutTemplates/layout";
import { fetchAPI } from "@App/utils/fetch.server";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { getBasicPageMetaTags, getHtmlMetadataTags } from "@App/utils/seo";
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

// export let meta: MetaFunction = (metaData): any => (getBasicPageMetaTags(metaData, {
//   title: page.title,
//   desc: page.description,
//   slug: page.slug,
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