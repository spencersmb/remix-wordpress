import { SEARCH_STATE_ENUMS } from "@App/enums/searchEnums";
import type { Dispatch} from "react";
import { useContext } from "react";
import { createContext } from "react";
import type { ISearchAction} from "./useSearchReducer";
import { ISearchTypes } from "./useSearchReducer";

export interface ISearchContextState {
  isOpen: boolean,
  status: SEARCH_STATE_ENUMS,
  client: null | any,
  data: {
    generated: number,
    posts: SearchPostResult[]
  } | null
}
interface ISearchContextType {
  state: ISearchContextState,
  dispatch: Dispatch<ISearchAction>
}

export const siteSearchState: ISearchContextState  = {
    isOpen: false,
    status: SEARCH_STATE_ENUMS.READY,
    client: null,
    data: {
      generated: 0,
      posts: []
    }
}

export const SearchContext = createContext<ISearchContextType | undefined>(undefined)
SearchContext.displayName = 'SearchContext'

const useSearchContext = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchContext Provider')
  }
  return context
}

export function useSearch(){
  const {state, dispatch} = useSearchContext()

  const openSearch = () => {
    dispatch({
      type: ISearchTypes.SHOW_SEARCH,
    })
  }

  const closeSearch = () => {
    dispatch({
      type: ISearchTypes.HIDE_SEARCH,
    })
  }

  const addClient = (client: any) => {
    dispatch({
      type: ISearchTypes.ADD_CLIENT,
      payload: {
        client,
      }
    })
  }

  return {
    state,
    openSearch,
    closeSearch,
    addClient
  }
}