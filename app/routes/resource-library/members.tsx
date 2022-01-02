import { json, LoaderFunction, MetaFunction, redirect, useLoaderData } from 'remix'
import { requireResourceLibraryUser } from '../../utils/resourceLibrarySession.server'
import ResourceLibraryNav from '../../components/resourceLibrary/resourceNav'
import * as React from 'react'
import { Layout } from '../../root'
import { getHtmlMetadataTags } from '../../utils/seo'
import { fetchAPI } from '../../utils/fetch'
import { GetAllFreebiesQuery } from '../../lib/graphql/queries/resourceLibrary'
import { flattenResourceData } from '../../utils/resourceLibraryUtils'
import FreebieFilter from '../../components/resourceLibrary/freebieFilter'
import useFreebies from '../../hooks/useFreebies'
import Freebie from '../../components/resourceLibrary/freebie'
import { getGraphQLString } from '../../utils/graphqlUtils'
import useSite from '~/hooks/useSite'
import { useEffect } from 'react'

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
    id: '24',
    title: 'Resource Library: Members',
    author: {
      id: '22',
      name: 'Teela',
      avatar: {
        url: '',
        width: 24,
        height: 24
      },
      slug: 'resource-library-members'
    },
    slug: 'resource-library-members',
    content: '',
    date: '',
    seo: {
      title: 'Resource Library: Members - Every Tuesday',
      metaDesc: 'Resource Library members only access with over 200+ assets for free!',
      fullHead: '',
      opengraphModifiedTime: '',
      opengraphPublishedTime: '',
      readingTime: '3min'
    }
  }

  /*
  Build Metadata tags for the page
   */
  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: null,
    page,
    location
  })
};

export let loader: LoaderFunction = async ({ request, context, params }) => {
  await requireResourceLibraryUser(request, '/resource-library')

  try {
    let data = await fetchAPI(getGraphQLString(GetAllFreebiesQuery))
    return json({
      user: true,
      freebies: flattenResourceData(data.resourceLibraries),
      filterTags: data.cptTags
    })
  } catch (e) {
    console.error(`e in /resource-library`, e)
    return redirect('/resource-library')
  }
}
interface ILoaderData {
  freebies: IResourceItem[]
  filterTags: IFilterTag[]
}
const ResourceLibraryMembers = () => {
  const data = useLoaderData<ILoaderData>()
  console.log('data', data);

  const { state: { user }, resourecLibraryLogin } = useSite()


  /*
  * Check for user when coming directly from the login page to make sure the user is passed to the global context.
  */
  useEffect(() => {
    if (!user?.resourceUser) {
      resourecLibraryLogin()
    }
  }, [])

  const { filter, handleFilterClick, handlePageClick, posts, pagination } = useFreebies<IResourceItem[]>({ items: data.freebies })

  return (
    <div>
      <h1>Members Area</h1>
      <FreebieFilter
        filterTags={data.filterTags}
        selectedFilter={filter}
        handleClick={handleFilterClick}
      />
      <div>
        {posts
          .map(item => (<Freebie key={item.id} {...item} />))}
      </div>

      <div>
        {pagination.hasNextPage && <button onClick={handlePageClick}>Show More</button>}
      </div>
    </div>
  )
}
export default ResourceLibraryMembers



