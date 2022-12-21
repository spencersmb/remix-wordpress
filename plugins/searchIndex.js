const { default: gql } = require('graphql-tag')
const utils = require('./utils')

async function getAllPosts(){
  const env = utils.envConfig()
  const allPostsGql = gql`
  query AllPostsSearch($count: Int) {
        posts(first: $count) {
          edges {
            node { 
              tags(first: 20){
                edges{
                  node{
                    name
                  }
                }
              }
              title
              slug
              date
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
                      height
                      name
                      sourceUrl
                    }
                  }
                    altText
                    sourceUrl
                    srcSet
                    sizes
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
