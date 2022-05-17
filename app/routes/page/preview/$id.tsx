import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Layout from '~/components/layoutTemplates/layout'
import { previewLoaderRouteHandler } from '../../../utils/loaderHelpers'

export let loader: LoaderFunction = async ({ request, params, context }) => previewLoaderRouteHandler(request, params)

const PostPreview = () => {
  const data = useLoaderData()
  console.log('dataRes', data)

  return (
    <Layout>
      <div>
        Preview
      </div>
    </Layout>
  )
}

export default PostPreview
