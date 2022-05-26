import { consoleHelper } from '../../utils/windowUtils'
import type { IFetchPaginationState } from './index';
import { fetchInitialState } from './index'

export enum IFetchPaginateTypes {
  ADD_POSTS = 'ADD_POSTS',
  ADD_CATEGORY = 'ADD_CATEGORY',
  LOADING = 'LOADING',
  CLEAR_CATEGORY = 'CLEAR_CATEGORY',
  CLEAR_POSTS = 'CLEAR_POSTS',
}
export const useFetchPaginationReducer = (state: IFetchPaginationState, action: IFetchPaginateAction): IFetchPaginationState => {
  consoleHelper('fetch pagination reducer action', action)
  switch (action.type) {

    case IFetchPaginateTypes.ADD_POSTS :
      return {
        ...state,
        ...action.payload,
        loading: false
      }

    case IFetchPaginateTypes.LOADING :
      return {
        ...state,
        loading: true
      }

    case IFetchPaginateTypes.ADD_CATEGORY :
      console.log('posts add_category',state);
      // check for category
      // update posts with current + new posts
      let posts = []
      const catExists = state.categories[action.payload.category]
      if(catExists){
        posts = [
          ...state.categories[action.payload.category].posts,
          ...action.payload.posts
        ]
      }else{
        posts = [
          ...action.payload.posts
        ]
      }

      // Then return the final category Object
      return {
        ...state,
        categories:{
          ...state.categories,
          [action.payload.category]:{
            pageInfo: action.payload.pageInfo,
            posts
          }
        },
        loading: false
      }

    case IFetchPaginateTypes.CLEAR_CATEGORY :
      return{
        ...state,
        categories:{}
      }

    case IFetchPaginateTypes.CLEAR_POSTS :
      return{
        ...state,
        posts: [],
        pageInfo: fetchInitialState.pageInfo
      }


    default: {
      // throw new Error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}

export interface IPageInfo {
  pageInfo:{
    page: number,
    endCursor: string,
    hasNextPage: boolean,
  }
  posts: IPost[]
}
export interface IPageInfoOld {
  page: number,
  endCursor: string,
  hasNextPage: boolean,
  posts: IPost[]
}
interface IFetchPaginateAddPosts{
  type: IFetchPaginateTypes.ADD_POSTS,
  payload: IPageInfo
}
interface IFetchPaginateAddCategory{
  type: IFetchPaginateTypes.ADD_CATEGORY,
  payload: IPageInfo & {category: string}
}
export type IFetchPaginateAction =
  | IFetchPaginateAddCategory
  | IFetchPaginateAddPosts
  | {type: IFetchPaginateTypes.LOADING}
  | {type: IFetchPaginateTypes.CLEAR_CATEGORY}
  | {type: IFetchPaginateTypes.CLEAR_POSTS}
