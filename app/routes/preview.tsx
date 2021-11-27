import { LoaderFunction, redirect, useLoaderData } from 'remix'
import { getPreviewPostPageServer, getViewerServer } from '../lib/api/fetch'

export let loader: LoaderFunction = async({request, params,context}) => {
  // check for cookies
  const cookies = request.headers.get('cookie')
  if(!cookies){
    return redirect('/login')
  }

  console.log('cookies', cookies)


  const res = await getViewerServer(cookies)
  const resPost = await getPreviewPostPageServer({
    postType: 'post',
    postId: '8678',
    cookie: cookies
  })


  return {
    cookies,
    user: await res.json(),
    data: await resPost.json()
  }
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
