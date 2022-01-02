import {  ReactElement, useReducer } from 'react'
import { fetchInitialState, FetchPaginateContext, IFetchPaginationState } from './index'
import { useFetchPaginationReducer } from './useFetchPaginationReducer'

interface IProps {
  children?: ReactElement,
  defaultState?: IFetchPaginationState
}

/**
 * @Component UseFetchPaginateProvider
 *
 * Global state to track posts that have been loaded
 *
 * Optional default stat to pass posts in if we are on a page that useMatches has found post and pageInfo
 * via the Root component.
 *
 */
const UseFetchPaginateProvider = ({children, defaultState}: IProps) => {
  const [state, dispatch] = useReducer(useFetchPaginationReducer, defaultState ? defaultState : fetchInitialState)
  const value = {state, dispatch}
  return <FetchPaginateContext.Provider value={value}>
    {children}
  </FetchPaginateContext.Provider>
}

export default UseFetchPaginateProvider
