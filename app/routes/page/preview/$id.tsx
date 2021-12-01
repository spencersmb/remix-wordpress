import { LoaderFunction, useLoaderData } from 'remix'
import { previewLoaderRouteHandler } from '../../../lib/utils/loaderHelpers'
import { Layout } from '../../../root'

export let loader: LoaderFunction = async({request, params,context}) => previewLoaderRouteHandler(request, params)

const PostPreview = () => {
  const data = useLoaderData()
  const dataRes = JSON.parse(data)
  console.log('dataRes', dataRes)

  return (
    <Layout>
      <div>
        Preview
      </div>
    </Layout>
  )
}

export default PostPreview
