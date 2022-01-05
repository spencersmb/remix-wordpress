import { createContext, Dispatch, useContext } from 'react'
import { IFetchPaginateAction, IFetchPaginateTypes, IPageInfo } from './useFetchPaginationReducer'

export const fetchInitialState:IFetchPaginationState = {
  loading: false,
  page: 1,
  endCursor: '',
  hasNextPage: false,
  posts: [],
  categories: {}
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

  const addCategoriAction = (data: IPageInfo & {category: string}) => {
    dispatch({
      type: IFetchPaginateTypes.ADD_CATEGORY,
      payload: data
    })
  }

  const loadingPosts = ()=>{
    dispatch({
      type: IFetchPaginateTypes.LOADING
    })
  }

  return {
    addCategoriAction,
    loadingPosts,
    addPostsAction,
    state:{
      ...state
      
    },
    dispatch
  }
}

export default useFetchPaginate
export interface ICategories {
  [key: string]: {
      pageInfo: {
        page: number,
        endCursor: string,
        hasNextPage: boolean,
      }
      posts: IPost[]
    }
}
export interface IFetchPaginationState{
  page: number,
  endCursor: string,
  hasNextPage: boolean,
  posts: IPost[],
  loading: boolean,
  categories:ICategories
}
export interface IFetchPaginateContextType {
  state: IFetchPaginationState,
  dispatch: Dispatch<IFetchPaginateAction>
}
