import prettier from 'prettier';
import { fetchAPI } from '../utils/fetch.server'
import gql from 'graphql-tag';
import { getGraphQLString } from '../utils/graphqlUtils'
import { sitemapPages } from '../components/sitemap/sitemap-pages'
import type { LoaderFunction } from '@remix-run/node';

async function getSitemapData(count: number = 10){
  return fetchAPI(getGraphQLString(QUERY_SITEMAP), {
    variables: {
      count
    }
  })
}
 
export const loader: LoaderFunction = async({request}) => {
  let url = new URL(request.url);
  const setCount = process.env.NODE_ENV === 'production' ? 1000 : 10;
  console.log('setCount', setCount);
  const {posts, pages} = await getSitemapData(setCount)
  let xml = await generateXmlIndex({
    pages: [], // pages
    // pages: pages.edges, // pages to be set manually currently
    posts: posts.edges,
    homepage: url.origin
  })
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
interface IGenerateSiteMapFunction{
  pages: {
    node: IPageRaw
  }[]
  posts: {
    node:  IPostRaw
  }[]
  homepage: string
}

/**
 * 
 * @function generateXmlIndex
 * @returns  XML STRING
 * 
 * Pulls posts from CMS and PAGES from a custom Object (sitemapPages) and generates a sitemap.xml file
 */
async function generateXmlIndex({pages, posts, homepage}: IGenerateSiteMapFunction) {

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>HOMEPAGE</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
  ${sitemapPages
    .map((page: any) => {
      return `
        <url>
          <loc>${homepage}/${page.slug}</loc>
          <priority>0.4</priority>
          <lastmod>${page.modifiedTime}</lastmod>
        </url>
      `;
    }).join('')
  }
  ${posts
    .map((data) => {
      const post = data.node
      return `
            <url>
              <loc>${homepage}/${post.slug}</loc>
              <priority>0.3</priority>
              <lastmod>${post.seo.opengraphModifiedTime}</lastmod>
            </url>
          `;
    })
    .join('')}
    </urlset>
  `

  const sitemapFormatted = prettier.format(sitemap, {
    printWidth: 120,
    parser: 'html',
  });

  return sitemapFormatted;
}

// TODO: Figure out how to do pages built in remix
const QUERY_SITEMAP = gql`
    query SiteMap($count: Int) {
        posts(first: $count) {
            __typename
            edges {
                __typename
                node {
                    status
                    date
                    modified
                    title
                    slug
                    seo {
                        title
                        opengraphModifiedTime
                        metaDesc
                    }
                }
            }
        }
    }
`
