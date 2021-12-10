import { json, LoaderFunction, MetaFunction, Outlet, redirect, useLoaderData } from 'remix'
import { requireResourceLibraryUser } from '../../utils/resourceLibrarySession.server'
import ResourceLibraryNav from '../../components/resourceLibrary/resourceNav'
import * as React from 'react'
import { Layout } from '../../root'
import { getHtmlMetadataTags } from '../../lib/utils/seo'
import { fetchAPI } from '../../lib/api/fetch'
import { GetAllFreebiesQuery } from '../../lib/graphql/queries/resourceLibrary'
import { flattenResourceData, IFilterTag, IResourceFreebie } from '../../utils/resourceLibraryUtils'
import FreebieFilter from '../../components/resourceLibrary/freebieFilter'
import { useState } from 'react'
import useFreebies from '../../hooks/useFreebies'

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

  const filterTest = data.freebies.filter(freebie => {
    const tags = freebie.tags.map(tag => tag.slug)
    const hasTag = tags.indexOf(filter)
    if(filter === 'all'){
      return freebie
    }
    return hasTag !== -1
  })
  console.log('filterTest', filterTest.length)
  console.log('pagination', pagination)


  // const [filter, setFilter] = useState('all')
  // const handleFilterClick = (filterTag: string) => () => {
  //   setFilter(filterTag)
  // }
  console.log('member data', data)


  // send RS items to context so we can filter by pages easily with 10 items per page




  async function getItems(){
    // const agent = new https.Agent({
    //   rejectUnauthorized: false
    // })
    const res = await fetch('https://etheadless.local/graphql', {
      method: 'POST',
      // @ts-ignore
      // agent,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GetAllFreebiesQuery,
      }),
    })
    const body = await res.json()
    console.log('body', body)

  }
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
            .map(item => (
            <div key={item.id}>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>

        <div>
          {pagination.hasNextPage && <button onClick={handlePageClick}>Show More</button>}
        </div>
      </div>
    </Layout>
  )
}
export default ResourceLibraryMembers



