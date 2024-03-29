import type { BreakpointEnums } from '@App/enums/breakpointEnums'
import { consoleColors, consoleHelper } from '@App/utils/windowUtils'
import type { ColorResult } from 'react-color'
import type { IBlendModeType, IPatternProviderContextState } from '.'

export enum IPPTypes {
  MODAL_CLOSE = 'MODAL_CLOSE',
  SAVE_IMAGE = 'SAVE_IMAGE',
  SET_BG_IMAGE = 'SET_BG_IMAGE',
  SET_DEFAULT_BG = 'SET_DEFAULT_BG',
  SET_IMAGE_CACHE = 'SET_IMAGE_CACHE',
  SET_PATTERN_TYPE = 'SET_PATTERN_TYPE',
  SET_TOUCHED = 'SET_TOUCHED',
  CHANGE_PATTERN_SIZE = 'CHANGE_PATTERN_SIZE',
  CHANGE_PATTERN_RANGE = 'CHANGE_PATTERN_RANGE',
  TOGGLE_BLENDMODE_MENU = 'TOGGLE_BLENDMODE_MENU',
  CHANGE_BLENDMODE = 'CHANGE_BLENDMODE',
  CHANGE_COLOR = 'CHANGE_COLOR',
  RESET_BLENDMODE = 'RESET_BLENDMODE',
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
interface ISetTocuhed {
  type: IPPTypes.SET_TOUCHED,
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

interface IChangePatternSize {
  type: IPPTypes.CHANGE_PATTERN_SIZE,
  payload: number
}

interface IChangePatternRange {
  type: IPPTypes.CHANGE_PATTERN_RANGE,
  payload: [number]
}
interface IToggleBlendModeMenu {
  type: IPPTypes.TOGGLE_BLENDMODE_MENU
}

interface IChangeBlendMode {
  type: IPPTypes.CHANGE_BLENDMODE,
  payload: IBlendModeType
}
interface IChangeColor {
  type: IPPTypes.CHANGE_COLOR,
  payload: ColorResult
}
interface IResetBlendMode {
  type: IPPTypes.RESET_BLENDMODE
}

export type IPPAction =
| IChangeColor
| IResetBlendMode
| IChangeBlendMode
| IToggleBlendModeMenu
| IChangePatternRange
| ISetImageCache
| ISetTocuhed
| IChangePatternSize
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

    case IPPTypes.SET_TOUCHED :
      
      return {
        ...state,
        touched: true
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

    case IPPTypes.CHANGE_PATTERN_SIZE :
      return {
        ...state,
        patternSize: action.payload
      }

    case IPPTypes.CHANGE_PATTERN_RANGE :
      return {
        ...state,
        patternRange: action.payload
      }

    case IPPTypes.TOGGLE_BLENDMODE_MENU :
      return {
        ...state,
        blendMode:{
          ...state.blendMode,
          isOpen: !state.blendMode.isOpen
        }
      }

    case IPPTypes.CHANGE_BLENDMODE :
      return {
        ...state,
        blendMode:{
          ...state.blendMode,
          type: action.payload
        }
      }

    case IPPTypes.CHANGE_COLOR :
      return {
        ...state,
        blendMode:{
          ...state.blendMode,
          color: action.payload
        }
      }

    case IPPTypes.RESET_BLENDMODE :
      return {
        ...state,
        blendMode:{
          ...state.blendMode,
          color: undefined,
          type: null
        }
      }

    default: {
      // throw new Error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}
