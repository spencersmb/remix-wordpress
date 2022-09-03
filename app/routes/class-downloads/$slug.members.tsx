import gql from 'graphql-tag';
import { fetchAPI } from "@App/utils/fetch.server"
import { getGraphQLString } from "@App/utils/graphqlUtils"
import { checkForCookieLogin } from "@App/utils/loaderHelpers"
import FreebieFilter from "@App/components/resourceLibrary/freebieFilter"
import GridItem from "@App/components/gridDownloads/gridItem"
import { getlockedPageMetaTags, getLockedPageRedirectLogoutPath } from "@App/utils/lockedPagesUtils"
import { createLockedPageCookie } from "@App/server/lockedPages.server"
import Layout from "@App/components/layoutTemplates/layout"
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { lockedPagesMeta } from '@App/lib/lockedPages/classDownloads';
import { consoleHelper } from '@App/utils/windowUtils';
import GridItems from '@App/components/gridDownloads/gridItems';
import useFreebiesLocal from '@App/hooks/useFreebies/useFreebiesPaginate';
import { classNames } from '@App/utils/appUtils';
import OutlinedButton from '@App/components/buttons/outlinedButton';
import { spinnerColors } from '@App/components/spinners/spinnerColors';

export let meta: MetaFunction = (rootData) => (getlockedPageMetaTags(rootData, { membersPage: true }))

export let loader: LoaderFunction = async ({ request, params }) => {
  const lookUpSlug = params.slug;

  if (!lookUpSlug) {
    throw new Response("Not Found", {
      status: 404
    });
  }

  const lockedMeta = lockedPagesMeta[lookUpSlug]

  if (!lockedMeta) {
    return {
      title: '404',
      description: 'error: No Locked Data found',
    }
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

  // PAGE coming from the server needs to be renamed so that JSONLD doesn't get crossed with wrong data
  const response = {
    ...downloadGridBy,
    serverPage: downloadGridBy.page, // not needed on the front end..
    page: lockedMeta.membersPage
  }

  return json({
    user: true,
    freebies: downloadGridBy.grid.items,
    filterTags: gridTags,
    ...response
  })

}
interface ILoaderData {
  page: IPageCore
  freebies: IGridItem[]
  filterTags: IFilterTag[]
  title: string
}

const LockedMembersPage = () => {
  let data = useLoaderData<ILoaderData>()
  consoleHelper(`${data.title} data`, data);
  const mobileFilterTags = [
    { slug: 'all', name: 'All' },
    ...data.filterTags
  ]
  const { filter, handleFilterClick, handlePageClick, posts, pagination, setFilter } = useFreebiesLocal<IGridItem[]>({ items: data.freebies })

  return (
    <Layout>
      <div className='py-16 bg-cream-100 grid-container grid-resource-header laptop:pb-16 laptop:pt-0'>

        {/* TITLE */}
        <div className='col-span-2 col-start-2 mt-8 mb-16 text-center tablet:col-start-2 tablet:col-span-12 tablet:mt-10 tablet:mb-12 desktop:col-start-2 desktop:mt-20 desktop:col-span-12 laptop:mb-20'>
          <h1 className='text-5xl font-sentinel__SemiBoldItal'>{data.title}</h1>
          <h2 className='mt-4 text-2xl'>Members Area</h2>
        </div>

        {/* FILTER */}
        <div className='relative col-span-2 col-start-2 row-start-2 mb-8 tablet:col-start-2 tablet:col-span-12 laptop:mb-3 desktop:col-start-2 desktop:col-span-12'>
          <FreebieFilter
            setFilter={setFilter}
            filterTags={mobileFilterTags}
            selectedFilter={filter}
            handleClick={handleFilterClick}
            position={'center'}
          />
        </div>

        {/* FILTER BACKGROUND */}
        <div className={`row-start-2 bg-white col-span-full`} />

        {/* GRID ITEMS */}
        <div className='col-span-2 col-start-2 mt-8 tablet:col-start-2 tablet:col-span-12'>
          <GridItems gridItems={posts} />
        </div>

        {/* <div>
          {!pagination.hasNextPage && 
          <OutlinedButton
            className='mx-auto bg-transparent btn btn-outline'
            clickHandler={handlePageClick}
            text={'Show More'} loading={state.loading}
            loadingText={'Loading...'}
            spinnerColors={spinnerColors.sageOutline}
              />
          }
        </div> */}
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
          altText
          caption
          sourceUrl
          srcSet
          sizes
          id
          mediaDetails {
            width
            height
            sizes{
              width
              file
              height
              name
              sourceUrl
              mimeType
            }
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
