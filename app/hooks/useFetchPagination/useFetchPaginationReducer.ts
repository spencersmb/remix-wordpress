import { consoleHelper } from '../../utils/windowUtils'
import { IFetchPaginationState } from './index'

export enum IFetchPaginateTypes {
  ADD_POSTS = 'ADD_POSTS',
  LOADING = 'LOADING',
}
export interface IPageInfo {
  page: number,
  endCursor: string,
  hasNextPage: boolean,
  posts: IPost[]
}
interface IFetchPaginateAddPosts{
  type: IFetchPaginateTypes.ADD_POSTS,
  payload: IPageInfo
}
export type IFetchPaginateAction =
  | IFetchPaginateAddPosts
  | {type: IFetchPaginateTypes.LOADING}

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
    // case EssAuthTypes.MODAL_OPEN :
    //   return {
    //     ...state,
    //     modal:{
    //       ...state.modal,
    //       component: action.payload.template,
    //       open: true,
    //     }
    //   }
    // case EssAuthTypes.MODAL_CLOSE :
    //   return {
    //     ...state,
    //     modal:{
    //       ...state.modal,
    //       open: false,
    //     }
    //   }

    default: {
      // throw new Error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}
