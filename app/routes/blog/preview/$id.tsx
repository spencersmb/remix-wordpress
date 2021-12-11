import { LoaderFunction, useLoaderData } from 'remix'
import { previewLoaderRouteHandler } from '../../../utils/loaderHelpers'
import { Layout } from '../../../root'

export let loader: LoaderFunction = async({request, params,context}) => previewLoaderRouteHandler(request, params)

const PostPreview = () => {
  const data = useLoaderData<string>()
  const dataRes = JSON.parse(data)
  console.log('dataRes', dataRes)

  // const js = data.json()
  // console.log('data', js)

  return (
    <Layout>
      <div>
        Preview Post
      </div>
    </Layout>
  )
}

export default PostPreview
