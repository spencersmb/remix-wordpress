import { gql } from "@apollo/client";
import { useEffect } from "react";
import { HeadersFunction, json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { useFonts } from "~/hooks/useFonts";
import { Layout } from "~/root";
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
  const { fontLoadingState } = useFonts('skinny')
  // useEffect(() => {
  //   async function loadFonts() {
  //     try {
  //       const data: { font: IFontFamily } = await fetchFontPreviewFile('skinny')
  //       console.log('data', data);

  //       let myFonts: FontFace[] = []
  //       data.font.files.map((file) => {
  //         const fontUrl = `.${file.url}`
  //         myFonts.push(new FontFace(file.family, `url(${fontUrl})`))
  //       })

  //       myFonts.forEach(async (item) => {
  //         try {
  //           const promise = await item.load()
  //           document.fonts.add(promise)
  //         } catch (e) {
  //           console.error('Font Loading error', e);
  //         }
  //       })
  //     } catch (e) {
  //       console.error('Font Loading Error', e)
  //     }

  //     // Promise.all(myFontsPromise).then(fontRes => {
  //     //   console.log('fontRes', fontRes);
  //     //   fontRes.map(font => {
  //     //     document.fonts.add(font)
  //     //   })
  //     // })
  //     // const myFont = new FontFace('skinny', `url(./${fonts.font.files[0].url})`);
  //     // const loadedFont = await myFont.load()
  //     // document.fonts.add(loadedFont);
  //     // console.log('Font loaded', loadedFont);
  //     // console.log('myFont', myFont);
  //   }
  //   const font = loadFonts();


  //   // const myFont = new FontFace('skinny', 'url()');
  // }, [])

  return (
    <Layout>
      PRODUCTS PAGE
      {fontLoadingState === 'completed' && <>
        <h1 style={{ fontFamily: 'skinny' }}>Products</h1>
        <h1 style={{ fontFamily: 'skinny-caps' }}>Products</h1>
        <h1 style={{ fontFamily: 'skinny-symbols' }}>Products</h1>
      </>}
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