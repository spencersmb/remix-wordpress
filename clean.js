
const fs = require('fs');
const path = require('path')

function clearStaticJson(){
  const files = [
    './public/build',
    './.cache',
    './build',
  ]

  files.forEach((path) => {
    if (fs.existsSync(path)) {
      fs.rmdirSync(path, { recursive: true });
      console.log('deleting folder: ', path )
      // fs.unlinkSync(file)
    }
  })
}

console.log('deleting static json files')
clearStaticJson()
console.log('files deleted')
