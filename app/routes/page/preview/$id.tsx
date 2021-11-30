import { LoaderFunction, useLoaderData } from 'remix'
import { previewLoaderRouteHandler } from '../../../lib/utils/loaderHelpers'
import { Layout } from '../../../root'

export let loader: LoaderFunction = async({request, params,context}) => previewLoaderRouteHandler(request, params)

const PostPreview = () => {
  const data = useLoaderData()
  console.log('data', data)

  return (
    <Layout>
      <div>
        Preview
      </div>
    </Layout>
  )
}

export default PostPreview
