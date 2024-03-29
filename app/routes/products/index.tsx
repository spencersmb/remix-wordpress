import gql from 'graphql-tag';
import { useFonts } from "@App/hooks/useFonts";
import Layout from "@App/components/layoutTemplates/layout";
import { fetchAPI } from "@App/utils/fetch.server";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { createOgImages, getBasicPageMetaTags, mdxPageMetaV2 } from "@App/utils/seo";
import { metaDataMatches } from "@App/hooks/remixHooks";
import UseFontPreviewProvider from "@App/hooks/useFontPreivew/useFontPreviewProvider";
import ProductLayout from "@App/components/products/productLayout";
import type { HeadersFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { formatRawProduct } from '@App/utils/productPageUtils';
import { getStaticPageMeta } from '@App/utils/pageUtils';
import { consoleHelper } from '@App/utils/windowUtils';

const page = getStaticPageMeta({
  title: 'Products',
  desc: 'Every-Tuesday.com digital products for sale using the Procreate app.',
  slug: 'products',
})
export let meta = mdxPageMetaV2

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
  consoleHelper('products data', data, '/routes/products/index.tsx');
  // const { fontLoadingState, setFontClickHandler } = useFonts()
  // const { state } = useSite()

  return (
    <UseFontPreviewProvider>
      <Layout disableNavStyles={true}>
        <ProductLayout
          products={data.products}
          metadata={metadata} />
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