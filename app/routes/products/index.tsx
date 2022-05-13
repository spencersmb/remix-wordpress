import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { HeadersFunction, json, Link, LoaderFunction, MetaFunction, useLoaderData, useMatches } from "remix";
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
  // console.log('data', data);
  const { fontLoadingState, setFontClickHandler } = useFonts()
  const { metadata } = metaDataMatches()
  // const { state } = useSite()

  return (
    <Layout>
      <FeaturedProduct
        product={data.products[0]}
        previewFontHanlder={setFontClickHandler}
      />
      {/* {
        fontLoadingState.status === 'completed' && fontLoadingState.font?.files.map(font => {
          return (
            <h1 key={font.family} style={{ fontFamily: font.family }}>Products</h1>
          )
        })
      } */}
      <ul>
        {/* {data.products.map((product: IProduct) => (<li key={product.slug}>
          <Link prefetch="intent" to={`/products/${product.slug}`} >{product.title}</Link>
        </li>))} */}
        {data.products.map((product: IProduct) => {

          if (metadata.serverSettings.productPlatform === ShopPlatformEnum.GUMROAD) {

            return (
              <GumroadProductCard
                key={product.slug}
                product={product}
                previewFontHanlder={setFontClickHandler}
              />
            )
          }

        }).slice(1) // Remove first time because its the featured product
        }
      </ul>
      <div>
        Preview Page
      </div>
    </Layout>
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
              altText
              sizes
              mediaDetails {
                sizes {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
  }
`