const utils = require('./utils')

async function getAllPosts(){
  const env = utils.envConfig()
  const allPostsQuery = `
    query AllPosts($count: Int)
    {
        posts(first: $count) {
            edges {
                node { 
                  tags(first: 100){
                    edges{
                      node{
                        name
                      }
                    }
                  }
                  tutorialManager {
                    postExcerpt
                    thumbnail {
                      image {
                        altText
                        caption
                        sourceUrl
                        srcSet
                        sizes
                        id
                        mediaDetails{
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
                      }
                    }
                  }
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
      count: parseInt(env.postCount, 10)
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
