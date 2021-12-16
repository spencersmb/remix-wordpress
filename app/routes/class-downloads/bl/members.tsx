import { gql } from "@apollo/client"
import { json, LoaderFunction, redirect, useLoaderData } from "remix"
import { fetchAPI } from "~/lib/api/fetch"
import { getGraphQLString } from "~/utils/graphqlUtils"

export let loader: LoaderFunction = async ({ request }) => {

  try {
    let wpAPI = await fetchAPI(getGraphQLString(query))
    return json({
      user: true,
      freebies: wpAPI.downloadGridBy.grid.items,
      filterTags: wpAPI.gridTags
    })
  } catch (e) {
    console.error(`e in /class-downloads/bl/members`, e)
    return redirect('/class-downloads/bl/members')
  }

}

const Procreate5xBonuses = () => {
  let data = useLoaderData()
  console.log(data);


  return (
    <div>
      Logged In
    </div>
  )
}

export default Procreate5xBonuses


const query = gql`
query ProcreateBonusGrid {
  downloadGridBy(slug: "beautiful-lettering") {
    title
    grid {
      items {
        title
        excerpt
        image {
          srcSet
          sourceUrl
        }
        tags {
          name
        }
        downloadLink
      }
    }
  }
  gridTags(slug: "beautiful-lettering"){
    name
    slug
  }
}
`
