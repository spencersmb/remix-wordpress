import { gql } from "@apollo/client";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/layoutTemplates/layout";
import { fetchAPI } from "~/utils/fetch.server";
import { getGraphQLString } from "~/utils/graphqlUtils";
import { getHtmlMetadataTags } from "~/utils/seo";

export let meta: MetaFunction = (metaData): any => {
  const { data, location, parentsData } = metaData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    product: data.product,
    location
  })
};
export let loader: LoaderFunction = async ({ params }) => {
  console.log('params', params);
  if (!params.productSlug) {
    throw new Response("No param Found", {
      status: 404
    });
  }

  let wpAPI = await fetchAPI(getGraphQLString(query), {
    variables: {
      slug: `${params.productSlug}`
    }
  })
  console.log('wpApi', wpAPI);


  if (wpAPI.productBy === null) {
    //TODO: redirect to custom 404 page
    throw new Response("Product Not Found", { status: 404 });
  }

  const product = wpAPI.productBy

  return json({
    product
  })
};
export default function ProductPage() {
  const data = useLoaderData()
  // console.log('product data', data);

  return (
    <Layout>
      Product: {data.product.title}
      <div className="text-neutral-50">
        test
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: data.product.seo.schema.raw }}></div> */}
    </Layout>
  )
}

const query = gql`
  query ProductQuery($slug: String!){
     productBy(slug: $slug) {
      title
      id
      featuredImage{
        node{
          sizes
          altText
          sourceUrl
          mediaDetails {
            sizes {
              sourceUrl
            }
          }
        }
      }
      details{
        youtube{
          url
        }
        licences{
          licenseType
          price
          url
        }
      }
      seo{
        fullHead
        metaDesc
        title
        opengraphModifiedTime
        opengraphPublishedTime
        schema {
          raw
        }
        opengraphImage {
          id
          altText
          sourceUrl
        }
        opengraphType
      }
    }
  }
`