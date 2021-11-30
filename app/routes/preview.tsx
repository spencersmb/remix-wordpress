import { LoaderFunction, redirect, useLoaderData } from 'remix'
import { getPreviewPostPageServer, getViewerServer } from '../lib/api/fetch'
import { previewUrlParams } from '../lib/utils/loaderHelpers'

export let loader: LoaderFunction = async({request, params,context}) => {
  console.log('params', request)
  // const cookies = request.headers.get('cookie')
  const {id, previewType, url} = previewUrlParams(request)

  let loginUrl = `/login${url.search}`

  // check for cookies
  if(!previewType || !id){
    return redirect(loginUrl)
  }

  // check for logged in user
  // try to get user info or post info and if request is rejected - redirect to login
  // else pass data through
  try{
    const res = await getPreviewPostPageServer({previewType, id})
    const json = await res.json()
    const postPageData = json.data[previewType]
    console.log('postPageData', postPageData)

    if(postPageData === null){
      return redirect(loginUrl)
    }

    return {
      // cookies,
      // user: await res.json(),
      [previewType]: postPageData
    }

  }catch (e){
    console.log('e', e)
    return {
      data: e
    }
  }



  // return {
  //   cookies,
  //   // user: await res.json(),
  //   data: await resPost.json()
  // }
}

const Preview = () => {
  const data = useLoaderData()
  console.log('data', data)

  return (
    <div>
      Preview
    </div>
  )
}

export default Preview
