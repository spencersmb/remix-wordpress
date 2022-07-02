import skinnyJeansScript from '../../server/fonts/skinny-jeans/SkinnyJeans-Script.woff'
import skinnyJeansCaps from '../../server/fonts/skinny-jeans/SkinnyJeans-Caps.woff'
import skinnyJeansSymbols from '../../server/fonts/skinny-jeans/SkinnyJeans-Symbols.woff'
import tuesdayFont from '../../server/fonts/tuesday/tuesdayscript-regular-webfont.woff'
import missMagnolia from '../../server/fonts/miss-magnolia/MissMagnolia-Regular.woff'
import honeymoon from '../../server/fonts/honeymoon/honeymoon-regular-webfont.woff'
import hawthorne from '../../server/fonts/hawthorne/HawthorneScript-Regular.woff'
import espresso from '../../server/fonts/espresso-roast/EspressoRoast-Script.woff'
import espressoCaps from '../../server/fonts/espresso-roast/EspressoRoast-Caps.woff'
import espressoSymbols from '../../server/fonts/espresso-roast/EspressoRoast-Symbols.woff'
import cornerBakery from '../../server/fonts/cornerbakery/CornerBakery-Regular.woff'

enum FontPreviewName {
  TUESDAY = 'tuesday',
  SKINNYJEANS = 'skinny',
  MISSMAGNOLIA = 'magnolia',
  HONEYMOON = 'honeymoon',
  HAWTHORNE = 'hawthorne',
  ESPRESSOROAST = 'espresso',
  CORNERBAKERY = 'cornerbakery',
}
export const fontAssetsFile: IFontAsset = {
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

// import text2png from 'text2png'
// import tuesdayFont from './tuesday/tuesdayscript-regular-webfont.ttf'
// import skinnyJeansScript from './skinny-jeans/SkinnyJeans-Script.woff'
// import skinnyJeansCaps from './skinny-jeans/SkinnyJeans-Caps.woff'
// import skinnyJeansSymbol from './skinny-jeans/SkinnyJeans-Symbols.woff'

// interface ICreateText2Png{
//   size: string
//   fontFamily: string
//   color: string
//   lineSpacing: number
//   padding: number
// }

// export function createAlphabetImages({size, fontFamily, color, lineSpacing, padding}: ICreateText2Png){
//   const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
//   const images: string[] = []
//   for (let i in alphabet) {
//     const imageBuffer = text2png(alphabet[i], {
//       font: `${size} ${fontFamily}`,
//       color,
//       // backgroundColor: 'linen',
//       lineSpacing,
//       padding
//     });

//     images.push(imageBuffer.toString('base64'))
//   }

//   return images
// }

// export function createNumberImages({size, fontFamily, color, lineSpacing, padding}: ICreateText2Png){
//   const number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '?', ':', ';', '"']
//   const images: string[] = []
//   for (let i in number) {
//     const imageBuffer = text2png(number[i], {
//       font: `${size} ${fontFamily}`,
//       color,
//       // backgroundColor: 'linen',
//       lineSpacing,
//       padding
//     });

//     images.push(imageBuffer.toString('base64'))
//   }

//   return images
// }

// export function createFontTitle({title, size, fontFamily, color, lineSpacing, padding}: {title: string} & ICreateText2Png){
//   const image = text2png(title, {
//       font: `${size} ${fontFamily}`,
//       color,
//       // backgroundColor: 'linen',
//       lineSpacing,
//       padding
//     });
//   return image.toString('base64')
// }

// export function createUpperLowercaseImages({size, fontFamily, color, lineSpacing, padding}: ICreateText2Png){
//   const alphabet = ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz']
//   const images: string[] = []
//   for (let i in alphabet) {
//     const imageBuffer = text2png(alphabet[i], {
//       font: `${size} ${fontFamily}`,
//       color,
//       // backgroundColor: 'linen',
//       lineSpacing,
//       padding
//     });

//     images.push(imageBuffer.toString('base64'))
//   }

//   return images
// }

// interface IRegisteredFont {
//   [id: string]: {
//     name: string
//     styles: {
//       [id: string]: {
//         type: string
//         family: string
//         url: string
//       }
//     }
//   }
// }
// export const registeredFonts: IRegisteredFont = {
//   'skinny': {
//     name: 'Skinny Jeans',
//     styles: {
//       'script': {
//         type: 'script',
//         family: 'skinny',
//         url: skinnyJeansScript
//       },
//       'caps': {
//         type: 'caps',
//         family: 'skinny-caps',
//         url: skinnyJeansCaps
//       }
//     }
//   }
// }
