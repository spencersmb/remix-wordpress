const { default: gql } = require('graphql-tag')
const utils = require('./utils')

async function getAllPosts(){
  const env = utils.envConfig()
  const allPostsQuery = `
    query AllPosts($count: Int) {
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
  const allPostsGql = gql`
  query AllPosts($count: Int) {
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
  console.log('env', parseInt(env.postCount, 10))
  return await utils.fetchAPIGQL(utils.getGraphQLString(allPostsGql), {
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
