import { createContext, Dispatch, useContext } from 'react'
import { IFetchPaginateAction, IFetchPaginateTypes, IPageInfo } from './useFetchPaginationReducer'

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



const useFetchPaginate = () => {
  const {state, dispatch} = useFetchPaginateContent()

  const addPostsAction = (pageInfo: IPageInfo) => {
    dispatch({
      type: IFetchPaginateTypes.ADD_POSTS,
      payload: pageInfo
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
