import { consoleHelper } from '../../utils/windowUtils'
import { IFetchPaginationState } from './index'

export enum IFetchPaginateTypes {
  ADD_POSTS = 'ADD_POSTS',
  ADD_CATEGORY = 'ADD_CATEGORY',
  LOADING = 'LOADING',
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
      // update posts

      // replace
      let posts = []
      const hasPosts = state.categories[action.payload.category]
      if(hasPosts){
        posts = [
          ...state.categories[action.payload.category].posts,
          ...action.payload.posts
        ]
      }else{
        posts = [
          ...action.payload.posts
        ]
      }
      return {
        ...state,
        categories:{
          ...state.categories,
          [action.payload.category]:{
            pageInfo: {
              page: action.payload.pageInfo.page + 1,
              endCursor: action.payload.pageInfo.endCursor,
              hasNextPage: action.payload.pageInfo.hasNextPage
            },
            posts
          }
        },
        loading: false
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
