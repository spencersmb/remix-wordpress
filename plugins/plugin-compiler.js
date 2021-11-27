const utils = require('./utils')
const dotenv = require('dotenv');
const path = require('path')
dotenv.config();
const compile = (pluginsArray) => {

  const actions = pluginsArray.map( async(plugin) => {
    const name = utils.lowercaseFirstChar(plugin)
    const pluginFile = `./${name}.js`
    const pluginImport = require(pluginFile)

    const data = await pluginImport.getData()
    const file = pluginImport.getFile(data)
    const outputLocation = path.join(pluginImport.outputDirectory, pluginImport.fileName);

    // plugin.name SearchIndex
    // plugin.outputDirectory ./public
    // plugin.outputLocation public/wp-search.json
    if(file !== false){
      return await utils.createFile(
        {
          file,
          name: pluginImport.name,
          directory: pluginImport.outputDirectory,
          location: outputLocation,
          verbose: pluginImport.verbose
        }
      )
    }

    // return pluginImport.create()
  })

  Promise.all(actions).then((results)=>{
  }).catch()
}

compile([
  'SearchIndex'
])
