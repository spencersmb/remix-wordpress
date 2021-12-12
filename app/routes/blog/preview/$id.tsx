import { LoaderFunction, useLoaderData } from 'remix'
import { previewLoaderRouteHandler } from '../../../utils/loaderHelpers'
import { Layout } from '../../../root'
import { consoleHelper } from '../../../utils/windowUtils'

export let loader: LoaderFunction = async({request, params,context}) => previewLoaderRouteHandler(request, params)

const PostPreview = () => {
  const data = useLoaderData<{post: IPost}>()
  consoleHelper('data', data)

  return (
    <Layout>
      <div>
        Preview Post
      </div>
    </Layout>
  )
}

export default PostPreview
