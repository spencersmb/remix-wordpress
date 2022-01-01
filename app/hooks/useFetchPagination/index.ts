import { createContext, Dispatch, useContext } from 'react'
import { IFetchPaginateAction, IFetchPaginateTypes, IPageInfo } from './useFetchPaginationReducer'

export const fetchInitialState = {
  loading: false,
  page: 1,
  endCursor: '',
  hasNextPage: false,
  posts: []
}

export const FetchPaginateContext = createContext<IFetchPaginateContextType>({
  state: fetchInitialState,
  dispatch: () => null
})
FetchPaginateContext.displayName = 'FetchPaginateContext'

const useFetchPaginateContent = () => {
  const context = useContext(FetchPaginateContext)
  if (!context) {
    throw new Error('usePaginateFetch must be used within a FetchPaginate Provider component')
  }
  return context
}

/*
 ** useFetchPaginate
 ** Adds posts to the global context so users don't have to keep hitting
 ** an API if they don't refresh the page.
 */
const useFetchPaginate = () => {
  const {state, dispatch} = useFetchPaginateContent()

  const addPostsAction = (data: IPageInfo) => {
    dispatch({
      type: IFetchPaginateTypes.ADD_POSTS,
      payload: data
    })
  }

  const loadingPosts = ()=>{
    dispatch({
      type: IFetchPaginateTypes.LOADING
    })
  }

  return {
    loadingPosts,
    addPostsAction,
    state,
    dispatch
  }
}

export default useFetchPaginate

export interface IFetchPaginationState{
  page: number,
  endCursor: string,
  hasNextPage: boolean,
  posts: IPost[],
  loading: boolean
}
export interface IFetchPaginateContextType {
  state: IFetchPaginationState,
  dispatch: Dispatch<IFetchPaginateAction>
}
