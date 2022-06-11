import { consoleColors, consoleHelper } from "@App/utils/windowUtils"
import type { ISearchContextState } from "."

export enum ISearchTypes {
  SHOW_SEARCH = 'SHOW_SEARCH',
  HIDE_SEARCH = 'HIDE_SEARCH',
}

interface IShowSearch{
  type: ISearchTypes.SHOW_SEARCH,
}

interface IHideSearch{
  type: ISearchTypes.HIDE_SEARCH,
}

export type ISearchAction = 
  | IHideSearch
  | IShowSearch

export const useSearchReducer = (
  state: ISearchContextState, 
  action: ISearchAction
  ): ISearchContextState => {

  consoleHelper('search reducer action', {action, state}, 'useSearchReducer()' , {bg: consoleColors.orange, text: "#000"})
  
  switch (action.type) {
    case ISearchTypes.SHOW_SEARCH:{
      return{
        ...state,
        isOpen: true
      }
    }

    case ISearchTypes.HIDE_SEARCH:{
      return{
        ...state,
        isOpen: false
      }
    }
    default:
      return state
  }
}