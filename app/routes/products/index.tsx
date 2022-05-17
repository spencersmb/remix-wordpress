import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useFonts } from "~/hooks/useFonts";
import Layout from "~/components/layoutTemplates/layout";
import { fetchAPI, fetchFontPreviewFile } from "~/utils/fetch";
import { getGraphQLString } from "~/utils/graphqlUtils";
import { getBasicPageMetaTags } from "~/utils/seo";
import FeaturedProduct from "~/components/products/featureProduct";
import GumroadProductCard from "~/components/products/gumroadProductCard";
import { metaDataMatches } from "~/hooks/remixHooks";
import { LicenseEnum, ShopPlatformEnum } from "~/enums/products";
import useSite from "~/hooks/useSite";
import { rearrangeLicenses } from "~/utils/posts";
import UseFontPreviewProvider from "~/hooks/useFontPreivew/useFontPreviewProvider";
import ProductLayout from "~/components/products/productLayout";
import { HeadersFunction, json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";


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

    const products = data.products?.edges?.map(({ node }: { node: IProduct }) => {
      const product = {
        ...node,
        details: {
          ...node.details,
          licences: node.details.licences ? rearrangeLicenses(node.details.licences) : null,
        }
      }
      return product
    });

    return json({
      products,
    })
  } catch (e) {
    console.log('error', e)
  }

};

function ProductsIndex() {
  const data = useLoaderData()
  const { metadata } = metaDataMatches()
  // console.log('data', data);
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
          details {
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