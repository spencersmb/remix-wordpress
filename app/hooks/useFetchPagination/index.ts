import { createContext, Dispatch, useContext } from 'react'
import { IFetchPaginateAction, IFetchPaginateTypes, IPageInfo, IPageInfoOld } from './useFetchPaginationReducer'

export const fetchInitialState:IFetchPaginationState = {
  loading: false,
  pageInfo: {
    page: 1,
    endCursor: '',
    hasNextPage: false,
  },
  posts: [],
  categories: {},
  init: false
}

export const FetchPaginateContext = createContext<IFetchPaginateContextType>({
  state: fetchInitialState,
  dispatch: () => null
})
FetchPaginateContext.displayName = 'FetchPaginateContext'

interface updateContext {
  posts?: any
  pageInfo?: {
    page: number,
    endCursor: string,
    hasNextPage: boolean,
  }
  category?: {
    [id: string] : {
      posts: any
      pageInfo: {
        page: number,
        endCursor: string,
        hasNextPage: boolean,
      }
    }
  }
}
const useFetchPaginateContent = (newData?:updateContext) => {
  console.log('newData', newData);
  
  let context
  // console.log('FetchPaginateContext', FetchPaginateContext);
  
  context = useContext(FetchPaginateContext)
  // console.log('context pre', context);
  
  // if(newData){
  //   context = createContext<IFetchPaginateContextType>({
  //     state: fetchInitialState,
  //     dispatch: () => null
  //   })
  // }
  // console.log('!context.state.init', context.state.init);
  
  // Only do this on first Render load to getData in from Server
  if((newData?.posts && newData.pageInfo) && context.state.posts.length === 0){
    context.state.init = true
    context.state.posts = newData.posts
    context.state.pageInfo = newData.pageInfo
  }

  if(newData?.category && !context.state.categories[Object.keys(newData?.category)[0]]){
    // console.log('setCategory State');
    const catName = Object.keys(newData.category)[0]
    context.state.categories[catName] = newData.category[catName]
  }

  // console.log('skip');
  context.state.init = true
  
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
const useFetchPaginate = (newData?: updateContext) => {
  const {state, dispatch} = useFetchPaginateContent(newData)

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

  const clearCategory = () => {
    dispatch({
      type: IFetchPaginateTypes.CLEAR_CATEGORY
    })
  }

  const clearPosts = () => {
    dispatch({
      type: IFetchPaginateTypes.CLEAR_POSTS
    })
  }
  return {
    addCategoriAction,
    loadingPosts,
    addPostsAction,
    clearCategory,
    clearPosts,
    state,
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
  pageInfo:{
    page: number,
    endCursor: string,
    hasNextPage: boolean,
  }
  posts: IPost[],
  loading: boolean,
  categories:ICategories
  init: boolean
}
export interface IFetchPaginateContextType {
  state: IFetchPaginationState,
  dispatch: Dispatch<IFetchPaginateAction>
}
