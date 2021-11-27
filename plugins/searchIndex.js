const utils = require('./utils')
const path = require('path')

// const data = await getAllPosts()
// const file = utils.generateIndexSearch(data)
// const outputDirectory = './public'
// const fileName = 'wp-search.json'
// const outputLocation = path.join(outputDirectory, fileName);
async function create(){
  const data = await getAllPosts()
  const file = utils.generateIndexSearch(data)
  const outputDirectory = './public'
  const fileName = 'wp-search.json'
  const outputLocation = path.join(outputDirectory, fileName);

  // plugin.name SearchIndex
  // plugin.outputDirectory ./public
  // plugin.outputLocation public/wp-search.json
  if(file !== false){
    return await utils.createFile(file, 'Search Index', './public',  outputLocation, true )
  }

  return null
}

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
