import { previewLoaderRouteHandler } from '../../../utils/loaderHelpers'
import Layout from "~/components/layoutTemplates/layout"
import { consoleHelper } from '../../../utils/windowUtils'
import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export let loader: LoaderFunction = async ({ request, params, context }) => previewLoaderRouteHandler(request, params)

const PostPreview = () => {
  const data = useLoaderData<{ post: IPost }>()
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
