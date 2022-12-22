const { default: gql } = require('graphql-tag')
const utils = require('./utils')
const fs = require('fs');
const path = require('path')

const ALL_POSTS_QUERY = gql`
  query AllPostsSearch($first: Int, $after: String) {
        posts(first: $first, after: $after) {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
          }
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
  console.log('env search count', parseInt(env.postCount, 10))
  return await utils.fetchAPIGQL(utils.getGraphQLString(allPostsGql), {
    variables:{
      count: parseInt(env.postCount, 10)
    }
  })
}

const fetchAllPosts = async (endCursor, accData) =>{
  const newData = accData || {posts: []}
  const env = utils.envConfig()
  try {
    const data = await utils.fetchAPIGQL(utils.getGraphQLString(ALL_POSTS_QUERY), {
    variables:{
      first: 100,
      after: endCursor ? endCursor : null
    }
  })
  console.log('adding posts', data.posts.edges.length)
  console.log('total posts', newData.posts.length)
    newData.posts = newData.posts.concat(data.posts.edges)

    // if dev - just return the first 100 to hurry up
    // if(!env.production){
    //   return {
    //     posts:{
    //       edges: newData.posts
    //     }
    //   }
    // }

    if (!data.posts.pageInfo.hasNextPage) {
      return {
        posts:{
          edges: newData.posts
        }
      }
    } else {
      return await fetchAllPosts(data.posts.pageInfo.endCursor, newData)
    }

  } catch (e) {
    console.log('e', e)
  }
    
}


async function getAllPostsRecursive() {
  const env = utils.envConfig()
  return new Promise(async (resolve, reject) => {

    if(env.skipSearch){
      console.log('skipping search index')
      // let rawdata = fs.readFileSync(dir, 'utf8');
      // let rawdata = await fs.readJson(dir)
      return fs.readFile('./public/wp-search.json', 'utf8', function (err, data) {
          if (err) throw err; // we'll not consider error handling for now
          // console.log('obj', obj)
          let rawData = JSON.parse(data)
          return resolve({
            generated: rawData.generated,
            posts:{
              edges: rawData.posts
            }
          })
      });
    }


    try{
      const data = await fetchAllPosts()
      console.log( 'search DONE data', data)
      return resolve(data)
    }catch(e){
      reject(e)
    }
  })
}

module.exports = {
  name: 'SearchIndex',
  getData: getAllPostsRecursive,
  getFile: utils.generateIndexSearch,
  outputDirectory: './public',
  fileName:'wp-search.json',
  verbose: true
}
