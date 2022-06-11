import type { ReactElement } from 'react';
import { useReducer } from 'react'
import type { ISearchContextState } from './index';
import { SearchContext } from './index'
import { useSearchReducer } from './useSearchReducer';

/**
 * @Component UseSearchProvider
 *
 * Primary component to provide context to the whole app for things like Navs, Modals, Users
 */

interface IProps {
  children?: ReactElement,
  defaultState: ISearchContextState
}
const UseSearchProvider = ({ children, defaultState }: IProps) => {
  const [state, dispatch] = useReducer(useSearchReducer, defaultState)
  const value = { state, dispatch }

  return <SearchContext.Provider value={value}>
    {children}
  </SearchContext.Provider>
}

export default UseSearchProvider
