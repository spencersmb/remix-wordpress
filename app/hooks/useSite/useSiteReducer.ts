import { ISiteContextState } from './index'
import { consoleHelper } from '../../utils/windowUtils'

export enum ISiteTypes {
  ADD_POSTS = 'ADD_POSTS',
  LOGOUT = 'LOGOUT',
  MODAL_OPEN = 'MODAL_OPEN',
  MODAL_CLOSE = 'MODAL_CLOSE',
}

export type ISiteAction =
  | {type: ISiteTypes.ADD_POSTS}

export const useSiteReducer = (state: ISiteContextState, action: ISiteAction): ISiteContextState => {
  consoleHelper('site reducer action', action)
  switch (action.type) {

    case ISiteTypes.ADD_POSTS :
      return {
        ...state,
      }
    // case EssAuthTypes.LOGOUT :
    //   return {
    //     ...state,
    //     loggedIn: false
    //   }
    // case EssAuthTypes.MODAL_OPEN :
    //   return {
    //     ...state,
    //     modal:{
    //       ...state.modal,
    //       component: action.payload.template,
    //       open: true,
    //     }
    //   }
    // case EssAuthTypes.MODAL_CLOSE :
    //   return {
    //     ...state,
    //     modal:{
    //       ...state.modal,
    //       open: false,
    //     }
    //   }

    default: {
      // throw new Error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}
