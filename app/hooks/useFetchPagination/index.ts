import type { Dispatch} from 'react';
import { createContext, useContext } from 'react'
import type { IFetchPaginateAction, IPageInfo} from './useFetchPaginationReducer';
import { IFetchPaginateTypes, IPageInfoOld } from './useFetchPaginationReducer'

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
  // console.log('newData', newData);
  
  let context
  // console.log('FetchPaginateContext', FetchPaginateContext);
  
  // Initialize Context State based on FetchPaginateContext "createContext"
  context = useContext(FetchPaginateContext)
  // console.log('context pre', context);

  // When this first renders we check if customData was passed in to override the default state intially set in the context
  
  // Only do this on first Render load to getData in from Server
  // Check if the new data has posts because of how we map the data in from the server. We also check for page info and check that state has 0 posts. If it does we set the state to the new data.
  
  // Have to check for context.state.posts because if it's just a page link click instead of a page refresh, it should already have data in it.
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
