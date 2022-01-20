import { gql } from "@apollo/client";
import { useEffect } from "react";
import { HeadersFunction, json, Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { useFonts } from "~/hooks/useFonts";
import Layout from "~/components/layoutTemplates/layout";
import { fetchAPI, fetchFontPreviewFile } from "~/utils/fetch";
import { getGraphQLString } from "~/utils/graphqlUtils";
import { getBasicPageMetaTags } from "~/utils/seo";


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
    first: 11,
    after: null
  }
  try {
    const data = await fetchAPI(getGraphQLString(query),
      variables
    )
    const products = data.products?.edges?.map(({ node = {} }) => node);

    return json({
      products,
    })
  } catch (e) {
    console.log('error', e)
  }

};

function ProductsIndex() {
  const data = useLoaderData()
  console.log('data', data);
  const { fontLoadingState } = useFonts('cornerbakery')
  console.log('fontLoadingState', fontLoadingState);

  return (
    <Layout>
      PRODUCTS PAGE
      {
        fontLoadingState.status === 'completed' && fontLoadingState.font?.files.map(font => {
          return (
            <h1 key={font.family} style={{ fontFamily: font.family }}>Products</h1>
          )
        })
      }
      <ul>
        {data.products.map((product: IProduct) => (<li key={product.slug}>
          <Link prefetch="intent" to={`/products/${product.slug}`} >{product.title}</Link>
        </li>))}
      </ul>
    </Layout>
  )
}

export default ProductsIndex

const query = gql`
  query GetProducts {
    products(first: 10) {
      edges {
        node {
          title
          id
          slug
          details {
            youtube {
              url
            }
            type
            fonts {
              name
              styles {
                name
              }
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