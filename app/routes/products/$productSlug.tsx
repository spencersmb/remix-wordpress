import { gql } from "@apollo/client";
import { LoaderFunction, json, useLoaderData } from "remix";
import { fetchAPI } from "~/utils/fetch";
import { getGraphQLString } from "~/utils/graphqlUtils";
import { mapPostData } from "~/utils/posts";

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
  console.log('product data', data);

  return (
    <div>
      Product: {data.product.title}
    </div>
  )
}

const query = gql`
  query ProductQuery($slug: String!){
     productBy(slug: $slug) {
      title
      featuredImage{
        node{
          altText
          sourceUrl
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
    }
  }
`