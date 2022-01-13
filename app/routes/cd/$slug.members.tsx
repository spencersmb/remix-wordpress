import { gql } from "@apollo/client"
import { json, LoaderFunction, MetaFunction, redirect, useLoaderData } from "remix"
import { fetchAPI } from "~/utils/fetch"
import { getGraphQLString } from "~/utils/graphqlUtils"
import { procreateBonusCookie } from "~/cookies.server"
import { checkForCookieLogin } from "~/utils/loaderHelpers"
import { getHtmlMetadataTags } from "~/utils/seo"
import useFreebies from "~/hooks/useFreebies"
import FreebieFilter from "~/components/resourceLibrary/freebieFilter"
import GridItem from "~/components/gridDownloads/gridItem"
import { getStaticPageMeta } from "~/utils/pageUtils"
import { lockedPagesMeta } from "~/utils/lockedPagesUtils"

const slug = 'bl'
const querySlug = "beautiful-lettering"
const membersPath = `/class-downloads/${slug}/members`

export let meta: MetaFunction = (rootData): any => {

  /*
  rootData gets passed in from the root metadata function
   */
  const { data, location, parentsData, params } = rootData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  const lookUpSlug = params.slug;
  if (!lookUpSlug) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  const lockedMeta = lockedPagesMeta[lookUpSlug]

  if (!lockedMeta) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  /*
  Build Metadata tags for the page
   */
  return getHtmlMetadataTags({
    follow: false,
    metadata: parentsData.root.metadata,
    page: lockedMeta.membersPage,
    location
  })
};

export let loader: LoaderFunction = async ({ request }) => {
  await checkForCookieLogin(request, procreateBonusCookie, '/class-downloads/bl')

  try {
    let wpAPI = await fetchAPI(getGraphQLString(query), {
      variables: {
        querySlug
      }
    })
    return json({
      user: true,
      freebies: wpAPI.downloadGridBy.grid.items,
      filterTags: wpAPI.gridTags
    })
  } catch (e) {
    console.error(`e in ${membersPath}`, e)
    return redirect(membersPath)
  }

}
interface ILoaderData {
  freebies: IGridItem[]
  filterTags: IFilterTag[]
}
const Procreate5xBonuses = () => {
  let data = useLoaderData<ILoaderData>()
  console.log('BL data.freebies', data.freebies);

  const { filter, handleFilterClick, handlePageClick, posts, pagination } = useFreebies<IGridItem[]>({ items: data.freebies })

  return (
    <div>
      <div>Logged In 2</div>
      <FreebieFilter
        filterTags={data.filterTags}
        selectedFilter={filter}
        handleClick={handleFilterClick}
      />
      <div>
        {posts
          .map(item => (<GridItem key={item.title} {...item} />))}
      </div>
      <div>
        {pagination.hasNextPage && <button onClick={handlePageClick}>Show More</button>}
      </div>
    </div>
  )
}

export default Procreate5xBonuses


const query = gql`
query ProcreateBonusGrid($querySlug: String) {
  downloadGridBy(slug: $querySlug) {
    title
    grid {
      items {
        title
        excerpt
        image {
          srcSet
          sourceUrl
          sizes
          srcSet
          mediaDetails {
            sizes {
              sourceUrl
              width
            }
            width
          }
        }
        tags {
          name
          slug
        }
        downloadLink
      }
    }
  }
  gridTags(slug: $querySlug){
    name
    slug
  }
}
`
