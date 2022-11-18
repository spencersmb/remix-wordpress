import { previewLoaderRouteHandler } from '../../../utils/loaderHelpers'
import Layout from "@App/components/layoutTemplates/layout"
import { consoleHelper } from '../../../utils/windowUtils'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import BlogTemplate from '@App/components/blog/blogTemplate'
import { mdxPageMeta } from '@App/utils/seo'

export let meta = mdxPageMeta
export let loader: LoaderFunction = async ({ request, params, context }) => previewLoaderRouteHandler(request, params)

const PostPreview = () => {
  const { post } = useLoaderData<typeof loader>()

  return (
    <Layout>
      <BlogTemplate post={post} />
    </Layout>
  )
}

export default PostPreview
