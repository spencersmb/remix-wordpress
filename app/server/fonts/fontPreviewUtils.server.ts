import text2png from 'text2png'
import tuesdayFont from './tuesday/tuesdayscript-regular-webfont.ttf'
import skinnyJeansScript from './skinny-jeans/SkinnyJeans-Script.woff'
import skinnyJeansCaps from './skinny-jeans/SkinnyJeans-Caps.woff'
import skinnyJeansSymbols from './skinny-jeans/SkinnyJeans-Symbols.woff'

interface ICreateText2Png{
  size: string
  fontFamily: string
  color: string
  lineSpacing: number
  padding: number
}

export function createAlphabetImages({size, fontFamily, color, lineSpacing, padding}: ICreateText2Png){
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  const images: string[] = []
  for (let i in alphabet) {
    const imageBuffer = text2png(alphabet[i], {
      font: `${size} ${fontFamily}`,
      color,
      // backgroundColor: 'linen',
      lineSpacing,
      padding
    });

    images.push(imageBuffer.toString('base64'))
  }

  return images
}

export function createNumberImages({size, fontFamily, color, lineSpacing, padding}: ICreateText2Png){
  const number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '?', ':', ';', '"']
  const images: string[] = []
  for (let i in number) {
    const imageBuffer = text2png(number[i], {
      font: `${size} ${fontFamily}`,
      color,
      // backgroundColor: 'linen',
      lineSpacing,
      padding
    });

    images.push(imageBuffer.toString('base64'))
  }

  return images
}

export function createFontTitle({title, size, fontFamily, color, lineSpacing, padding}: {title: string} & ICreateText2Png){
  const image = text2png(title, {
      font: `${size} ${fontFamily}`,
      color,
      // backgroundColor: 'linen',
      lineSpacing,
      padding
    });
  return image.toString('base64')
}

export function createUpperLowercaseImages({size, fontFamily, color, lineSpacing, padding}: ICreateText2Png){
  const alphabet = ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz']
  const images: string[] = []
  for (let i in alphabet) {
    const imageBuffer = text2png(alphabet[i], {
      font: `${size} ${fontFamily}`,
      color,
      // backgroundColor: 'linen',
      lineSpacing,
      padding
    });

    images.push(imageBuffer.toString('base64'))
  }

  return images
}

interface IFontFile {
  type: string
  family: string
  url: string
}
interface IFontFamily {
  name: string
  files: IFontFile[]
}
interface IFontAsset {
  [id: string]: IFontFamily
}
export const fontAssets: IFontAsset = {
  'tuesday': {
    name: 'Tuesday Script',
    files: [
      {
        type: 'regular',
        family: 'tuesday',
        url: tuesdayFont
      }
    ]
  },
  'skinny':{
    name: 'Skinny Jeans',
    files: [
      {
        type: 'script',
        family: 'SkinnyJeans-Script',
        url: skinnyJeansScript
      },
      {
        type: 'caps',
        family: 'SkinnyJeans-Caps',
        url: skinnyJeansCaps
      },
      // {
      //   type: 'symbols',
      //   family: 'skinny-symbols',
      //   url: skinnyJeansSymbols
      // }
    ]
  }
}
interface IRegisteredFont {
  [id: string]: {
    name: string
    styles: {
      [id: string]: {
        type: string
        family: string
        url: string
      }
    }
  }
}
export const registeredFonts: IRegisteredFont = {
  'skinny': {
    name: 'Skinny Jeans',
    styles: {
      'script': {
        type: 'script',
        family: 'skinny',
        url: skinnyJeansScript
      },
      'caps': {
        type: 'caps',
        family: 'skinny-caps',
        url: skinnyJeansCaps
      }
    }
  }
}