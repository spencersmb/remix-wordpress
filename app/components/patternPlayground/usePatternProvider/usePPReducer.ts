import type { BreakpointEnums } from '@App/enums/breakpointEnums'
import { consoleColors, consoleHelper } from '@App/utils/windowUtils'
import type { IPatternProviderContextState } from '.'

export enum IPPTypes {
  MODAL_CLOSE = 'MODAL_CLOSE',
  SAVE_IMAGE = 'SAVE_IMAGE',
  SET_BG_IMAGE = 'SET_BG_IMAGE',
  SET_IMAGE_CACHE = 'SET_IMAGE_CACHE',
  SET_PATTERN_TYPE = 'SET_PATTERN_TYPE',
}

interface ISetImage {
  type: IPPTypes.SAVE_IMAGE,
  payload: {
    image: HTMLImageElement
  }
}

interface ISetBgImage {
  type: IPPTypes.SET_BG_IMAGE,
  payload: {
    url: string
  }
}

interface ISetImageCache {
  type: IPPTypes.SET_IMAGE_CACHE,
  payload: {
    0: string | null
    1: string | null
    2: string | null
  }
}

interface ISetPatternType {
  type: IPPTypes.SET_PATTERN_TYPE,
  payload: number
}
export type IPPAction =
| ISetImageCache
| ISetPatternType
| ISetImage
| ISetBgImage
| {type: IPPTypes.MODAL_CLOSE}

export const usePPReducer = (state: IPatternProviderContextState, action: IPPAction): IPatternProviderContextState => {
  consoleHelper('site reducer action', action, 'usePPReducer()' , {
    bg: consoleColors.yellow, text: "#000"})
  switch (action.type) {

    case IPPTypes.MODAL_CLOSE :
      return {
        ...state,
      }

    case IPPTypes.SAVE_IMAGE :
      return {
        ...state,
        image: action.payload.image
      }

    case IPPTypes.SET_BG_IMAGE :
      return {
        ...state,
        backgroundImage: action.payload.url
      }

    case IPPTypes.SET_IMAGE_CACHE :
      return {
        ...state,
        imageCache: action.payload
      }

    case IPPTypes.SET_PATTERN_TYPE :
      return {
        ...state,
        patternType: action.payload
      }

    default: {
      // throw new Error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}
