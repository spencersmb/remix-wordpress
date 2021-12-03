import { json, LoaderFunction, redirect, useLoaderData } from 'remix'
import { requireResourceLibraryUser } from '../../utils/resourceLibrarySession.server'
import ResourceLibraryNav from '../../components/resourceLibrary/resourceNav'
import * as React from 'react'
import { Layout } from '../../root'

export let loader: LoaderFunction = async ({request}) => {
  await requireResourceLibraryUser(request, '/resource-library')

  try{
    // get Resource Library content
    // First 10 items in content?
    return json({
      resourceData: []
    })
  }catch (e){
    console.error(`e in /resource-library`, e)
    return redirect('/resource-library')
  }
}

const ResourceLibraryMembers = () => {
  const data = useLoaderData()
  console.log('data', data)

  return (
    <Layout alternateNav={<ResourceLibraryNav showLogout={true}/>}>
      <div>
        Members AREA
      </div>
    </Layout>
  )
}
export default ResourceLibraryMembers
