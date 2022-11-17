import { useEffect, useState } from "react";
import useFetchPaginate from "@App/hooks/useFetchPagination";
import Layout from "@App/components/layoutTemplates/layout";
import { fetchAPI } from "@App/utils/fetch.server";
import { flattenAllPosts } from "@App/utils/posts";
import { createOgImages, getBasicPageMetaTags, getHtmlMetadataTags, mdxPageMeta } from "@App/utils/seo";
import { consoleHelper } from "@App/utils/windowUtils";
import BlogFeaturedPost from "@App/components/blog/blogFeaturedPost";
import type { IPageInfo } from "@App/hooks/useFetchPagination/useFetchPaginationReducer";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { POST_BASIC_FIELDS, POST_FEATURED_IMAGE, POST_RESOURCE_FIELDS } from "@App/lib/graphql/queries/posts";
import gql from 'graphql-tag';
import BlogCategoryTabs from "@App/components/blog/blogHomeTabs/blogCategoryTabs";
import { AnimatePresence, motion } from "framer-motion";
import OutlinedButton from "@App/components/buttons/outlinedButton";
import BlogPostGrid from "@App/components/blog/blogPostGrid";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { HeadersFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cacheControl } from "@App/lib/remix/loaders";
import { spinnerColors } from "@App/components/spinners/spinnerColors";
import { isEmpty } from "lodash";
import { getStaticPageMeta } from "@App/utils/pageUtils";
import BlogMainIndex from "@App/components/blog/blogMain";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// headers for the entire DOC when someone refreshes the page or types in the url directly
// export const headers: HeadersFunction = ({ loaderHeaders }) => {
//   return {
//     ...cacheControl
//   }
// }
const description = `Get the most up-to-date content on Procreate from Every-Tuesday. Follow along with our tutorials from the blog, learn new tips and tricks, and get inspired by our community.`;
const title = 'Blog'
const pageMetaData = {
  title,
  slug: 'blog',
  description,
  seo: {
    title,
    opengraphModifiedTime: '',
    metaDesc: description
  }
}
const pageMeta = getStaticPageMeta({
  title: title,
  desc: description,
  slug: 'blog',
})
// export let meta = mdxPageMeta({
//   page: pageMeta
// })
export let meta: MetaFunction = (metaData): any => {
  const { data, location, parentsData } = metaData
  if (!data || !parentsData || isEmpty(parentsData) || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: data.post,
    page: data.page,
    location
  })
}
// export let meta: MetaFunction = (metaData): any => {
//   const { data, location, parentsData } = metaData
//   if (!data || !parentsData || isEmpty(parentsData) || !location) {
//     return {
//       title: '404',
//       description: 'error: No metaData or Parents Data',
//     }
//   }
//   const metadata = parentsData.root.metadata
//   let googleFollow = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
//   const url = `${metadata.domain}${location.pathname}`

//   return {
//     'robots': googleFollow,
//     canonical: url,
//     'og:locale': 'en_US',
//     'og:site_name': `${metadata.siteTitle}.com`,
//     'og:type': 'website',
//     title: pageMeta.seo.title,
//     description: pageMeta.seo.metaDesc,
//     'og:title': pageMeta.seo.title,
//     'og:description': pageMeta.seo.metaDesc,
//     ...createOgImages({
//       altText: pageMeta.featuredImage?.altText || 'defaultFeaturedImage.altText',
//       url: pageMeta.featuredImage?.sourceUrl || 'defaultFeaturedImage.sourceUrl',
//       width: '1920',
//       height: '1080'
//     }),
//     'twitter:card': `@${metadata.social.twitter.username}`,
//     'twitter:site': `@${metadata.social.twitter.username}`,
//     'twitter:creator': 'summary_large_image',
//     'twitter:label1': `Written by`,
//     'twitter:data1': `Teela`,
//     'twitter:label2': `Est. reading time`,
//     'twitter:data2': `1 minute`,
//   }
// }


export let loader: LoaderFunction = async ({ request, }) => {
  let variables: {
    first: number;
    after: string | null;
    catName?: string;
  } = {
    first: 13,
    after: null
  }
  // check URL for params to fetch the correct amount of items
  let url = new URL(request.url)
  let params = url.searchParams
  let page = params.get('page')
  let cat = params.get('cat')

  if (page && !cat) {
    variables = {
      first: (parseInt(page, 10) * 12) + 1, // +1 is to account for the featured post
      after: null,
    }
  }

  let wpAPI
  let wpCatAPI
  try {
    wpAPI = await fetchAPI(getGraphQLString(postQuery), {
      variables
    })

    if (cat && page) {
      variables.catName = cat
      variables.first = (parseInt(page, 10) * 12)
      wpCatAPI = await fetchAPI(getGraphQLString(catQuery), {
        variables
      })
    }

  } catch (e) {
    console.error('error', e)
  }
  const pageInfo = wpAPI?.posts.pageInfo
  const posts = flattenAllPosts(wpAPI?.posts) || []
  let categories = wpCatAPI && cat ? {
    selectedCategory: cat,
    category: {
      [cat]: {
        posts: flattenAllPosts(wpCatAPI?.posts),
        pageInfo: {
          ...wpCatAPI?.posts.pageInfo,
          page: page ? parseInt(page, 10) : 1,
        },

      }
    }
  } : null

  // https://remix.run/api/remix#json
  return json({
    page: pageMetaData,
    posts,
    pageInfo,
    categories,
    pageUrlParams: page && !cat ? parseInt(page, 10) : 1
  }, {
    headers: {
      // ...cacheControl
    }
  })
};

function BlogIndex() {
  let loaderData = useLoaderData<typeof loader>();

  return (
    <Layout>

      <BlogMainIndex loaderData={loaderData} />

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