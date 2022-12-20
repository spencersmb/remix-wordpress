import { previewLoaderRouteHandler } from '../../../utils/loaderHelpers'
import Layout from "@App/components/layoutTemplates/layout"
import { consoleHelper } from '../../../utils/windowUtils'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { mdxPageMetaV2 } from '@App/utils/seo'
import BlogSlugTemplate from '@App/components/pageTemplates/blogSlugTemplate'

export let meta = mdxPageMetaV2
export let loader: LoaderFunction = async ({ request, params, context }) => previewLoaderRouteHandler(request, params)

const PostPreview = () => {
  const { post } = useLoaderData<typeof loader>()

  return (
    <Layout>
      <BlogSlugTemplate post={post} />
    </Layout>
  )
}

export default PostPreview
