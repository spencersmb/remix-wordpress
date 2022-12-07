import gql from 'graphql-tag';
import { capitalize } from "lodash";
import { useEffect } from "react";
import Layout from "@App/components/layoutTemplates/layout";
import { fetchAPI } from "@App/utils/fetch.server";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { flattenAllPosts } from "@App/utils/posts";
import { getBasicPageMetaTags, mdxPageMeta } from "@App/utils/seo";
import { consoleHelper } from "@App/utils/windowUtils";
import { POST_BASIC_FIELDS, POST_FEATURED_IMAGE } from "@App/lib/graphql/queries/posts";
import PostsGrid from "@App/components/blog/postsGrid";
import type { HeadersFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { spinnerColors } from '@App/components/spinners/spinnerColors';
import OutlinedButton from '@App/components/buttons/outlinedButton';
import CategoryTemplate from '@App/components/pageTemplates/categoryTemplate';

export let meta = mdxPageMeta

export let loader: LoaderFunction = async ({ request, params }) => {
  let variables = {
    first: 12,
    after: null,
    catName: params.cat
  }
  let url = new URL(request.url)
  let searchParams = url.searchParams
  let pageParams = searchParams.get('page')

  if (pageParams) {
    variables = {
      first: parseInt(pageParams, 10) * 12,
      after: null,
      catName: params.cat
    }
  }
  let wpAPI = await fetchAPI(getGraphQLString(query), {
    variables
  })
  const pageInfo = wpAPI?.posts.pageInfo
  const posts = flattenAllPosts(wpAPI?.posts) || []

  // if (wpAPI.postBy === null) {
  //   //TODO: redirect to custom 404 page
  //   throw new Response("Not Found", { status: 404 });
  // }
  const category = capitalize(params.cat)
  const page = {
    title: `${category} Archives`,
    slug: params.cat,
    description: `Every-Tuesday Category: ${category}`,
    seo: {
      title: `${category} Archives`,
      opengraphModifiedTime: '', //TODO: figure out how to get this
      metaDesc: `The Arhives page for ${category}. This page contains all the posts in the ${category} category.`,
    }
  }
  return json({
    category: params.cat,
    pageInfo,
    posts,
    page,
    pageParams: pageParams ? parseInt(pageParams, 10) : 1
  })
};

interface ILoaderData {
  posts: IPost[],
  pageInfo: {
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
  },
  pageParams: number
  category: string
}
export default function CategoryPage() {
  const data = useLoaderData<typeof loader>();


  return (
    <Layout>
      <CategoryTemplate {...data} />
    </Layout>
  )
}

const query = gql`
  ${POST_BASIC_FIELDS}
  ${POST_FEATURED_IMAGE}
  query CategoryPageQuery($first: Int, $catName: String!, $after: String) {
    posts(
      first: $first
      after: $after
      where: {
        categoryName: $catName, 
        orderby: {
          field: DATE, 
          order: DESC
          }
        }
    ) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ...postBasicFields
          ...featuredImageFields
        }
      }
    }
  }
`