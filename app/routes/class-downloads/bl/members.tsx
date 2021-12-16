import { gql } from "@apollo/client"
import { json, LoaderFunction } from "remix"
import { fetchAPI } from "~/lib/api/fetch"
import { getGraphQLString } from "~/utils/graphqlUtils"

export let loader: LoaderFunction = async ({ request }) => {

  try {
    let wpAPI = await fetchAPI(getGraphQLString(query))
    return json({
      user: true,
      freebies: wpAPI.downloadGridBy,
      filterTags: data.cptTags
    })
  } catch (e) {
    console.error(`e in /resource-library`, e)
    return redirect('/resource-library')
  }

}

const Procreate5xBonuses = () => {

  return (
    <div>
      Logged In
    </div>
  )
}

export default Procreate5xBonuses

const query = gql`
  gridTags(slug: "beautiful-lettering"){
    name
    slug
  }
  downloadGridBy(slug: "beautiful-lettering"){
    title
    grid{
      items{
        title
        excerpt
        image{
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
`