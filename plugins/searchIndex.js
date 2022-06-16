const utils = require('./utils')

async function getAllPosts(){
  const allPostsQuery = `
    query AllPosts($count: Int)
    {
        posts(first: $count) {
            edges {
                node {
                    title
                    excerpt
                    databaseId
                    categories{
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
                          width
                          height
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
                    slug
                    date
                    modified
                    categories {
                        edges {
                            node {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`
  return await utils.fetchAPI(allPostsQuery, {
    variables:{
      count: parseInt(process.env.GLOBAL_POST_COUNT, 10)
    }
  })
}

module.exports = {
  name: 'SearchIndex',
  getData: getAllPosts,
  getFile: utils.generateIndexSearch,
  outputDirectory: './public',
  fileName:'wp-search.json',
  verbose: true
}
