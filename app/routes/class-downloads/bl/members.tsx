import { gql } from "@apollo/client"
import { Cookie, createCookie, json, LoaderFunction, redirect, useLoaderData } from "remix"
import { fetchAPI } from "~/lib/api/fetch"
import { getGraphQLString } from "~/utils/graphqlUtils"
import { procreateBonusCookie } from "~/cookies"
import { checkForCookieLogin } from "~/utils/loaderHelpers"
import { getHtmlMetadataTags } from "~/utils/seo"



export let meta: MetaFunction = (rootData): any => {

  /*
  rootData gets passed in from the root metadata function
   */
  const { data, location, parentsData } = rootData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  const page: IPage = {
    id: '26',
    title: 'Procreate 5x Bonus Downloads Members Area',
    author: {
      id: '27',
      name: 'Teela',
      avatar: {
        url: '',
        width: 24,
        height: 24
      },
      slug: 'teela'
    },
    slug: 'bl',
    content: '',
    date: '',
    seo: {
      title: 'Procreate 5x Bonus Downloads Members Area - Every Tuesday',
      metaDesc: 'Procreate 5x Bonus Downloads Members Only Access!',
      opengraphModifiedTime: '',
      opengraphPublishedTime: '',
      readingTime: '3min'
    }
  }

  /*
  Build Metadata tags for the page
   */
  return getHtmlMetadataTags({
    follow: false,
    metadata: parentsData.root.metadata,
    post: null,
    page,
    location
  })
};
export let loader: LoaderFunction = async ({ request }) => {
  await checkForCookieLogin(request, procreateBonusCookie, '/class-downloads/bl')

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
