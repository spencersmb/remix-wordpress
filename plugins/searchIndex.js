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
