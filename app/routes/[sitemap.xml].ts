import prettier from 'prettier';
import { fetchAPI } from '../utils/fetch'
import { gql } from '@apollo/client'
import { getGraphQLString } from '../utils/graphqlUtils'
import { sitemapPages } from '../components/sitemap/sitemap-pages'
import { LoaderFunction } from '@remix-run/node';

async function getSitemapData(){
  return fetchAPI(getGraphQLString(QUERY_SITEMAP), {
    variables: {
      count: 1000
    }
  })
}

export const loader: LoaderFunction = async({request}) => {
  let url = new URL(request.url);
  const {posts, pages} = await getSitemapData()
  let xml = await generateXmlIndex({
    pages: pages.edges,
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
          <priority>0.3</priority>
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
        pages(first: $count){
            edges {
                node {
                    status
                    title
                    slug
                    seo {
                        title
                        opengraphModifiedTime
                    }
                    author {
                        node {
                            username
                        }
                    }
                }
            }
        }
    }
`
