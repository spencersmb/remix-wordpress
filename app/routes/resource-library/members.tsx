import { json, LoaderFunction, MetaFunction, redirect, useLoaderData } from 'remix'
import { requireResourceLibraryUser } from '../../utils/resourceLibrarySession.server'
import ResourceLibraryNav from '../../components/resourceLibrary/resourceNav'
import * as React from 'react'
import { Layout } from '../../root'
import { getHtmlMetadataTags } from '../../utils/seo'
import { fetchAPI } from '../../lib/api/fetch'
import { GetAllFreebiesQuery } from '../../lib/graphql/queries/resourceLibrary'
import { flattenResourceData, IFilterTag, IResourceFreebie } from '../../utils/resourceLibraryUtils'
import FreebieFilter from '../../components/resourceLibrary/freebieFilter'
import useFreebies from '../../hooks/useFreebies'
import Freebie from '../../components/resourceLibrary/freebie'

export let meta: MetaFunction = (metaData): any => {
  const {data, location, parentsData} = metaData
  if(!data || !parentsData || !location){
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
      avatar:{
        url:'',
        width: 24,
        height: 24
      },
      slug: 'resource-library/members'
    },
    slug: 'resource-library/members',
    content: '',
    date: '',
    seo: {
      title: 'Resource Library: Members - Every Tuesday',
      metaDesc: 'Resource Library members only access with over 200+ assets for free!',
      fullHead:'',
      opengraphModifiedTime: '',
      opengraphPublishedTime: '',
      readingTime: '3min'
    }
  }
  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: null,
    page,
    location
  })
};

export let loader: LoaderFunction = async ({request}) => {
  await requireResourceLibraryUser(request, '/resource-library')
  try{
    // get Resource Library content
    let data = await fetchAPI(GetAllFreebiesQuery)
    console.log('data', data)
    return json({
      freebies: flattenResourceData(data.resourceLibraries),
      filterTags: data.cptTags
    })
  }catch (e){
    console.error(`e in /resource-library`, e)
    return redirect('/resource-library')
  }
}
interface ILoaderData {
  freebies: IResourceFreebie[]
  filterTags: IFilterTag[]
}
const ResourceLibraryMembers = () => {
  const data = useLoaderData<ILoaderData>()

  const {filter, handleFilterClick, handlePageClick, posts, pagination} = useFreebies<IResourceFreebie[]>({items: data.freebies})

  // console.log('pagination', pagination)
  // console.log('member data', data)

  return (
    <Layout alternateNav={<ResourceLibraryNav showLogout={true}/>}>
      <div>
        <h1>Members Area</h1>
        <FreebieFilter
          filterTags={data.filterTags}
          selectedFilter={filter}
          handleClick={handleFilterClick}
        />
        <div>
          {posts
            .map(item => (<Freebie {...item}/>))}
        </div>

        <div>
          {pagination.hasNextPage && <button onClick={handlePageClick}>Show More</button>}
        </div>
      </div>
    </Layout>
  )
}
export default ResourceLibraryMembers



