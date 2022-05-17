import { gql } from "@apollo/client"
import { fetchAPI } from "~/utils/fetch"
import { getGraphQLString } from "~/utils/graphqlUtils"
import { checkForCookieLogin } from "~/utils/loaderHelpers"
import useFreebies from "~/hooks/useFreebies"
import FreebieFilter from "~/components/resourceLibrary/freebieFilter"
import GridItem from "~/components/gridDownloads/gridItem"
import { getlockedPageMetaTags, getLockedPageRedirectLogoutPath } from "~/utils/lockedPagesUtils"
import { createLockedPageCookie } from "~/server/lockedPages.server"
import Layout from "~/components/layoutTemplates/layout"
import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export let meta: MetaFunction = (rootData) => (getlockedPageMetaTags(rootData, { membersPage: true }))

export let loader: LoaderFunction = async ({ request, params }) => {
  const lookUpSlug = params.slug;

  if (!lookUpSlug) {
    throw new Response("Not Found", {
      status: 404
    });
  }

  let { downloadGridBy, gridTags } = await fetchAPI(getGraphQLString(query), {
    variables: {
      slug: lookUpSlug
    }
  })

  if (!downloadGridBy) {
    throw new Response("Not Found", {
      status: 404
    });
  }

  const getCookie = createLockedPageCookie(downloadGridBy.page.cookie.name)
  const logoutRedirect = getLockedPageRedirectLogoutPath(lookUpSlug)
  await checkForCookieLogin(request, getCookie, logoutRedirect)

  return json({
    user: true,
    freebies: downloadGridBy.grid.items,
    filterTags: gridTags,
    ...downloadGridBy
  })

}
interface ILoaderData {
  freebies: IGridItem[]
  filterTags: IFilterTag[]
  title: string
}
const LockedMembersPage = () => {
  let data = useLoaderData<ILoaderData>()
  console.log(`${data.title} data.freebies`, data.freebies);

  const { filter, handleFilterClick, handlePageClick, posts, pagination } = useFreebies<IGridItem[]>({ items: data.freebies })

  return (
    <Layout>
      <div>Logged In: {data.title}</div>
      <FreebieFilter
        setFilter={handleFilterClick}
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
    </Layout>
  )
}

export default LockedMembersPage


const query = gql`
query LockedPageGrid($slug: String) {
  downloadGridBy(slug: $slug) {
    title
    modified
    page {
      password
      cookie {
        key
        name
      }
    }
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
  gridTags(slug: $slug){
    name
    slug
  }
}
`
