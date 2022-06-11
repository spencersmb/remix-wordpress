import { previewLoaderRouteHandler } from '../../../utils/loaderHelpers'
import Layout from "@App/components/layoutTemplates/layout"
import { consoleHelper } from '../../../utils/windowUtils'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export let loader: LoaderFunction = async ({ request, params, context }) => previewLoaderRouteHandler(request, params)

const PostPreview = () => {
  const data = useLoaderData<{ post: IPost }>()
  consoleHelper('data', data)

  return (
    <Layout>
      <div>
        Preview Tutorial
      </div>
    </Layout>
  )
}

export default PostPreview
