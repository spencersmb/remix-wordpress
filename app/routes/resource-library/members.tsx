import { json, LoaderFunction, MetaFunction, Outlet, redirect, useLoaderData } from 'remix'
import { requireResourceLibraryUser } from '../../utils/resourceLibrarySession.server'
import ResourceLibraryNav from '../../components/resourceLibrary/resourceNav'
import * as React from 'react'
import { Layout } from '../../root'
import { getHtmlMetadataTags } from '../../lib/utils/seo'
import { fetchAPI } from '../../lib/api/fetch'
import { GetAllFreebiesQuery } from '../../lib/graphql/queries/resourceLibrary'
import { flattenResourceData } from '../../utils/resourceLibraryUtils'

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
  let data = await fetchAPI(GetAllFreebiesQuery)
  console.log('data', data)
  
  try{
    // get Resource Library content
    // First 10 items in content?
    return json({
      freebies: flattenResourceData(data.resourceLibraries),
      filterTags: data.cptTags
    })
  }catch (e){
    console.error(`e in /resource-library`, e)
    return redirect('/resource-library')
  }
}

const ResourceLibraryMembers = () => {
  const data = useLoaderData()
  console.log('member data', data)
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
        Members AREA
        <button onClick={getItems}>get itemts</button>
      </div>
    </Layout>
  )
}
export default ResourceLibraryMembers



