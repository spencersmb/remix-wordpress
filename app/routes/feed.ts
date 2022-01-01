import RSS from 'rss'
import { fetchAPI } from '../utils/fetch'
import { LoaderFunction } from 'remix'
import { getGraphQLString } from '../utils/graphqlUtils'
import { gql } from '@apollo/client'

async function getFeedData(){
  return fetchAPI(getGraphQLString(query), {
    variables: {
      count: 10
    }
  })
}

export const loader: LoaderFunction = async({request}) => {
  let url = new URL(request.url);
  const {posts} = await getFeedData()

  let xml = await generateFeed(posts.edges, url.origin )
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml"
    }
  });
}

async function generateFeed(posts: {node: IPostRaw}[], origin: string){

  const feed = new RSS({
    title: 'myTitle',
    description: 'description',
    site_url: origin,
    feed_url: `${origin}/feed`,
    copyright: `2015 Every-Tuesday`,
    language: 'us-EN',
    pubDate: new Date(),
  });

  posts.map((data) => {

    const post = data.node
    console.log('data', post)

    feed.item({
      title: post.title,
      guid: `${origin}/${post.slug}`,
      url: `${origin}/${post.slug}`,
      date: post.date,
      description: post.excerpt,
      author: post.author.node.name,
      categories: post.categories.edges.map(cat => cat.node.name) || [],
    });
  });

  return feed.xml({ indent: true });
}

const query = gql`
    query FeedPosts($count: Int) {
        posts(first: $count) {
            edges {
                node {
                    author{
                        node{
                            name
                        }
                    }
                    categories{
                        edges{
                            node{
                                name
                            }
                        }
                    }
                    date
                    modified
                    title
                    slug
                    excerpt
                    date
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
