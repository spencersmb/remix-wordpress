const utils = require('./utils')

async function getAllPrettyLinks(){
  const allPrettyLinksQuery = `
    query AllPrettyLinks
    {
      prettyLinkTypes {
        name
        redirect_type
        slug
        url
      }
    }
`
  return await utils.fetchAPI(allPrettyLinksQuery)
}

module.exports = {
  name: 'PrettyLinks',
  getData: getAllPrettyLinks,
  getFile: utils.generatePrettyLinks,
  outputDirectory: './public',
  fileName:'wp-prettyLinks.json',
  verbose: true
}
