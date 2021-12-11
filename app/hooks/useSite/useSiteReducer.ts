import { ISiteContextState } from './index'
import { consoleHelper } from '../../utils/windowUtils'

export enum ISiteTypes {
  ADD_POSTS = 'ADD_POSTS',
}

export type ISiteAction =
  | {type: ISiteTypes.ADD_POSTS}

export const useSiteReducer = (state: ISiteContextState, action: ISiteAction): ISiteContextState => {
  consoleHelper('site reducer action', action)
  switch (action.type) {

    default: {
      // throw new Error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}
