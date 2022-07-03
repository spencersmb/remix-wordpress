import { fontAssetsFile } from '@App/server/fonts/fontPreviewUtils';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node'

export let loader: LoaderFunction = async({request, params}) => {
  const url = new URL(request.url)
  
  const fontSlug = url.searchParams.get('font')
  
  if(!fontSlug){
    return {
      error: {
        message: 'no font found'
      }
    }
  }
  
  const font = fontAssetsFile[fontSlug]

  if(!font){
    return {
        error: {
          message: 'no font found'
        }
      }
  }

  console.log('return font found', font);
  
  return json({
    font
  })
}
