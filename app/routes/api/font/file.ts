import { registerFont } from "canvas";
import { json, LoaderFunction } from "remix";
import { createAlphabetImages, createFontTitle, createNumberImages, createUpperLowercaseImages, fontAssets, registeredFonts } from "~/server/fonts/fontPreviewUtils";
import skinnyJeansScript from '../../../server/fonts/skinny-jeans/SkinnyJeans-Script.woff'
import skinnyJeansCaps from '../../../server/fonts/skinny-jeans/SkinnyJeans-Caps.woff'
import skinnyJeansSymbols from '../../../server/fonts/skinny-jeans/SkinnyJeans-Symbols.woff'

export let loader: LoaderFunction = async({request, params}) => {
  const url = new URL(request.url)
  
  const fontSlug = url.searchParams.get('font')
  // const fontStyle = url.searchParams.get('style')

  if(!fontSlug){
    return {
      error: {
        message: 'no font found'
      }
    }
  }
  
  const font = fontAssetsFile[fontSlug]
  // const font = registeredFonts[fontSlug]

  if(!font){
    return {
        error: {
          message: 'no font found'
        }
      }
  }
  // registerFont(`./${font.styles[fontStyle].url}`, { family: `${font.styles[fontStyle].family}`})

  // let fontImages = {
  //   alphabet: createAlphabetImages({
  //     size: '24px',
  //     fontFamily: font.styles[fontStyle].family,
  //     color: 'linen',
  //     lineSpacing: 10,
  //     padding: 20
  //   }),
  //   numbers: createNumberImages({
  //     size: '24px',
  //     fontFamily: font.styles[fontStyle].family,
  //     color: 'linen',
  //     lineSpacing: 10,
  //     padding: 20
  //   }),
  //   upperLower: createUpperLowercaseImages({
  //     size: '90px',
  //     fontFamily: font.styles[fontStyle].family,
  //     color: 'linen',
  //     lineSpacing: 10,
  //     padding: 20
  //   })
  // }

  // registerFont(`./${skinnyJeansScript}`, { family: 'SkinnyJeans-Script' })
  // registerFont(`./${skinnyJeansCaps}`, { family: 'SkinnyJeans-Caps', style:"caps" })
  let fontImages: any = {}
  // font.files.forEach(file => {
  //   // registerFont(`./${file.url}`, { family: `${file.family}` })
  // })
  // font.files.forEach(file => {
  //   console.log('file.family', file.family);
  //   console.log('file.type', file.type);
  //   console.log('file.ulr', file.url)

  //   fontImages['title'] = createFontTitle({
  //     title: font.name,
  //     size: '60px',
  //     fontFamily: fontSlug,
  //     color: 'linen',
  //     lineSpacing: 10,
  //     padding: 20
  //   })
    
  //   fontImages[file.type] = {
  //     alphabet: createAlphabetImages({
  //       size: '24px',
  //       fontFamily: file.family,
  //       color: 'linen',
  //       lineSpacing: 10,
  //       padding: 20
  //     }),
  //     numbers: createNumberImages({
  //       size: '24px',
  //       fontFamily: file.family,
  //       color: 'linen',
  //       lineSpacing: 10,
  //       padding: 20
  //     }),
  //     upperLower: createUpperLowercaseImages({
  //       size: '90px',
  //       fontFamily: file.family,
  //       color: 'linen',
  //       lineSpacing: 10,
  //       padding: 20
  //     })
  //   }
  // })
    
  return json({
    font,
    fontImages
  })
}


const fontAssetsFile: IFontAsset = {
  // 'tuesday': {
  //   name: 'Tuesday Script',
  //   files: [
  //     {
  //       type: 'regular',
  //       family: 'tuesday',
  //       url: tuesdayFont
  //     }
  //   ]
  // },
  'skinny':{
    name: 'Skinny Jeans',
    files: [
      {
        type: 'script',
        family: 'skinny',
        url: skinnyJeansScript
      },
      {
        type: 'caps',
        family: 'skinny-caps',
        url: skinnyJeansCaps
      },
      {
        type: 'symbols',
        family: 'skinny-symbols',
        url: skinnyJeansSymbols

      },
    ]
  }
}