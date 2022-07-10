import gql from 'graphql-tag';
import { useEffect, useState } from "react";
import { useFonts } from "@App/hooks/useFonts";
import Layout from "@App/components/layoutTemplates/layout";
import { fetchAPI } from "@App/utils/fetch.server";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { getBasicPageMetaTags } from "@App/utils/seo";
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


export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": "public, max-age=300, stale-while-revalidate"
  }
}
export let meta: MetaFunction = (metaData): any => (getBasicPageMetaTags(metaData, {
  title: `Products - Every-Tuesday`,
  desc: `Tons of Procreate Brushes, textures, and highrez assets to choose from`,
  slug: `products`,
}))

export let loader: LoaderFunction = async ({ request, }) => {
  let variables = {
    first: 50,
    after: null
  }
  try {
    const data = await fetchAPI(getGraphQLString(getProducts),
      { variables }
    )

    // const products = data.products?.edges.map(({ node }: { node: IProduct }) => {
    //   const product = {
    //     ...node,
    //     details: {
    //       ...node.productDetails,
    //       licences: node.productDetails.licences ? rearrangeLicenses(node.productDetails.licences) : null,
    //     }
    //   }
    //   return product
    // });


    return json({
      products: formatRawProduct(data.products?.edges),
    })
  } catch (e) {
    console.error('error', e)
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