import { consoleColors, consoleHelper } from "@App/utils/windowUtils"
import type { ISearchContextState } from "."

export enum ISearchTypes {
  SHOW_SEARCH = 'SHOW_SEARCH',
  HIDE_SEARCH = 'HIDE_SEARCH',
  ADD_CLIENT = 'ADD_CLIENT',
}

interface IShowSearch{
  type: ISearchTypes.SHOW_SEARCH,
}

interface IHideSearch{
  type: ISearchTypes.HIDE_SEARCH,
}

interface IAddClient{
  type: ISearchTypes.ADD_CLIENT,
  payload: {
    client: any,
  }
}

export type ISearchAction = 
  | IHideSearch
  | IShowSearch
  | IAddClient

export const useSearchReducer = (
  state: ISearchContextState, 
  action: ISearchAction
  ): ISearchContextState => {

  consoleHelper(
    `Search Reducer ${action.type}`, 
    {action, state}, 
    'useSearchReducer()',
    {bg: consoleColors.orange, text: "#000"})
  
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

    case ISearchTypes.ADD_CLIENT:{
      return{
        ...state,
        client: action.payload.client
      }
    }
    default:
      return state
  }
}