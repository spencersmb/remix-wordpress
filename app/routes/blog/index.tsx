
import Layout from "@App/components/layoutTemplates/layout";
import { fetchAPI, fetchAPIBatch } from "@App/utils/fetch.server";
import { flattenAllPosts } from "@App/utils/posts";
import { mdxPageMeta } from "@App/utils/seo";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { POST_RESOURCE_FIELDS } from "@App/lib/graphql/queries/posts";
import gql from 'graphql-tag';
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getStaticPageMeta } from "@App/utils/pageUtils";
import BlogIndexTemplate from "@App/components/pageTemplates/blogIndexTemplate";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

const page = getStaticPageMeta({
  title: 'Blog',
  slug: 'blog',
  desc: `Get the most up-to-date content on Procreate from Every-Tuesday. Follow along with our tutorials from the blog, learn new tips and tricks, and get inspired by our community.`
})

export function meta({ data, matches }: any) {
  // Want to snag some meta from a matched route? No problem!
  let rootModule = matches.find((match: any) => match.route.id === "root");
  // console.log('rootModule', rootModule)
  // console.log('matches', matches)
  // console.log('data', data)
  // Only want to merge its og: tags? Easy breezy!
  // let rootOgTags = rootModule.meta.filter((meta: any) =>
  //   meta.property?.startsWith("charSet")
  // );
  let rootOgTags = rootModule.meta

  return [
    ...rootOgTags,
    { title: 'static title' },
    {
      property: "music:album",
      content: "https://open.spotify.com/album/1Igrcji3zf5aC61saylDE1",
    },
  ];
}

// export let meta = mdxPageMeta

export let loader: LoaderFunction = async ({ request, }) => {
  let variables: {
    first: number;
    after: string | null;
    catName?: string;
  } = {
    first: 12,
    after: null,
    catName: '' // all
  }
  // check URL for params to fetch the correct amount of items
  let response
  let url = new URL(request.url)
  let params = url.searchParams
  let pageParam = params.get('page')
  let cat = params.get('cat')

  if (pageParam) {
    variables = {
      ...variables,
      first: (parseInt(pageParam, 10) * 12),
    }
  }

  if (cat) {
    variables = {
      ...variables,
      catName: cat === 'all' ? '' : cat
    }
  }


  try {
    response = await fetchAPIBatch([
      {
        query: getGraphQLString(postQuery),
        variables: {
          first: 1,
          after: null
        },
        operationname: 'GetMorePosts'
      },
      {
        query: getGraphQLString(catQuery),
        variables,
        operationname: 'CategoryPageQuery'
      }
    ])

  } catch (e) {
    console.error('error', e)
  }
  const pageInfo = {}
  const posts: any = []
  const filterPosts = flattenAllPosts(response[0].data.posts) as IPost[]
  const categoryRes = response[1].data.posts
  let categoryNameRewrite = cat ? cat : 'all'
  let categories = {
    selectedCategory: categoryNameRewrite,
    category: {
      [categoryNameRewrite]: {
        posts: flattenAllPosts(categoryRes),
        pageInfo: {
          ...categoryRes.pageInfo,
          page: pageParam ? parseInt(pageParam, 10) : 1,
        },

      }
    }
  }
  // https://remix.run/api/remix#json
  return json({
    response,
    featured: filterPosts[0],
    page,
    posts,
    pageInfo,
    categories,
    pageUrlParams: pageParam && !cat ? parseInt(pageParam, 10) : 1
  })
};


function BlogIndex() {
  let loaderData = useLoaderData<typeof loader>();

  return (
    <Layout disableNavStyles={true}>
      {/* Blog index */}
      <BlogIndexTemplate loaderData={loaderData} />

    </Layout>
  )
}

export default BlogIndex



const postQuery = gql`
 ${POST_RESOURCE_FIELDS}
query GetMorePosts($first: Int, $after: String) {
  posts(first: $first, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      node {
        id
        tutorialManager {
          youtube {
              id
              duration
          }
          ...postResourceFields
          postExcerpt
        }
        categories {
          edges {
            node {
              databaseId
              id
              name
              slug
            }
          }
        }
        date
        excerpt
        featuredImage {
          node {
            mediaDetails {
              sizes{
                width
                file
                height
                name
                sourceUrl
                mimeType
              }
            }
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
        title
        slug
        isSticky
      }
    }
  }
}
`
const catQuery = gql`
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
          id
          tutorialManager {
            youtube {
                id
                duration
            }
            # ...postResourceFields
            postExcerpt
          }
          content
          date
          dateGmt
          excerpt
          modified
          databaseId
          title
          slug
          isSticky
          categories {
            edges {
                node {
                  databaseId
                  id
                  name
                  slug
                }
            }
          }
          tags{
            edges{
                node{
                  name
                  slug
                }
            }
          }
          featuredImage {
            node {
              mediaDetails {
                sizes{
                  width
                  file
                  height
                  name
                  sourceUrl
                  mimeType
                }
              }
              altText
              caption
              sourceUrl
              srcSet
              sizes
              id
            }
          }
        }
      }
    }
  }
`