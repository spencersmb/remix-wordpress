import {  ReactElement, useReducer } from 'react'
import { fetchInitialState, FetchPaginateContext, IFetchPaginationState } from './index'
import { useFetchPaginationReducer } from './useFetchPaginationReducer'

interface IProps {
  children?: ReactElement,
  defaultState?: IFetchPaginationState
}
const UseFetchPaginateProvider = ({children, defaultState}: IProps) => {
  const [state, dispatch] = useReducer(useFetchPaginationReducer, defaultState ? defaultState : fetchInitialState)
  const value = {state, dispatch}
  return <FetchPaginateContext.Provider value={value}>
    {children}
  </FetchPaginateContext.Provider>
}

export default UseFetchPaginateProvider
