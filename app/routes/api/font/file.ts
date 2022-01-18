import { json, LoaderFunction } from "remix";
import skinnyJeansScript from '../../../server/fonts/skinny-jeans/SkinnyJeans-Script.woff'
import skinnyJeansCaps from '../../../server/fonts/skinny-jeans/SkinnyJeans-Caps.woff'
import skinnyJeansSymbols from '../../../server/fonts/skinny-jeans/SkinnyJeans-Symbols.woff'
import tuesdayFont from '../../../server/fonts/tuesday/tuesdayscript-regular-webfont.woff'
import missMagnolia from '../../../server/fonts/miss-magnolia/MissMagnolia-Regular.woff'
import honeymoon from '../../../server/fonts/honeymoon/honeymoon-regular-webfont.woff'
import hawthorne from '../../../server/fonts/hawthorne/HawthorneScript-Regular.woff'
import espresso from '../../../server/fonts/espresso-roast/EspressoRoast-Script.woff'
import espressoCaps from '../../../server/fonts/espresso-roast/EspressoRoast-Caps.woff'
import espressoSymbols from '../../../server/fonts/espresso-roast/EspressoRoast-Symbols.woff'
import cornerBakery from '../../../server/fonts/cornerbakery/CornerBakery-Regular.woff'

import { FontPreviewName } from "~/enums/fonts";

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
  
  return json({
    font
  })
}


const fontAssetsFile: IFontAsset = {
  [FontPreviewName.TUESDAY]: {
    name: 'Tuesday Script',
    files: [
      {
        type: 'regular',
        family: 'tuesday',
        url: tuesdayFont
      }
    ]
  },
  [FontPreviewName.SKINNYJEANS]:{
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
  },
  [FontPreviewName.MISSMAGNOLIA]: {
    name: 'Miss Magnolia',
    files: [
      {
        type: 'regular',
        family: 'miss-magnolia',
        url: missMagnolia
      }
    ]
  },
  [FontPreviewName.HONEYMOON]: {
    name: 'Honeymoon',
    files: [
      {
        type: 'regular',
        family: 'honeymoon',
        url: honeymoon
      }
    ]
  },
  [FontPreviewName.HAWTHORNE]: {
    name: 'Hawthorne',
    files: [
      {
        type: 'regular',
        family: 'hawthorne',
        url: hawthorne
      }
    ]
  },
  [FontPreviewName.ESPRESSOROAST]: {
    name: 'Espresso Roast',
    files: [
      {
        type: 'script',
        family: 'espresso',
        url: espresso
      },
      {
        type: 'caps',
        family: 'espresso-caps',
        url: espressoCaps
      },
      {
        type: 'symbols',
        family: 'espresso-symbols',
        url: espressoSymbols
      },
    ]
  },
  [FontPreviewName.CORNERBAKERY]: {
    name: 'Corner Bakery',
    files: [
      {
        type: 'regular',
        family: 'cornerbakery',
        url: cornerBakery
      },
    ]
  },
}