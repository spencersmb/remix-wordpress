import { consoleHelper } from "@App/utils/windowUtils"

export enum MakersLibraryPaginateTypes {
  ADD_FREEBIES = 'ADD_FREEBIES',
  LOADING = 'LOADING',
}

interface MakersLibraryPaginateAddCategory{
  type: MakersLibraryPaginateTypes.ADD_FREEBIES,
  payload: {
    pageInfo: {
      page: number,
      endCursor: string,
      hasNextPage: boolean,
    }
    category: string,
    freebies: IResourceItem[]
  }
}

export type MakersLibraryPaginateAction =
  | MakersLibraryPaginateAddCategory
  | {type: MakersLibraryPaginateTypes.LOADING}

export const useMakersLibraryPaginateReducer = (state: MakersLibraryStateType, action: MakersLibraryPaginateAction): MakersLibraryStateType => {
  consoleHelper(`MakersLibrary Pagination Reducer ${action.type}`, {
    action,
    state
  }, 'useMakersLibraryPaginateReducer()', {bg: '#ffd321', text: '#000'})


  switch (action.type) {
    case MakersLibraryPaginateTypes.LOADING :
      return {
        ...state,
        loading: true
      }

    case MakersLibraryPaginateTypes.ADD_FREEBIES:

      let updatedFreebies = []
      const catExists = state.categories[action.payload.category]

      if(catExists){
        updatedFreebies = [
          ...state.categories[action.payload.category].freebies,
          ...action.payload.freebies
        ]
      }else{
        updatedFreebies = [
          ...action.payload.freebies
        ]
      }

      // Then return the final category Object
      return {
        ...state,
        categories:{
          ...state.categories,
          [action.payload.category]:{
            pageInfo: action.payload.pageInfo,
            freebies: updatedFreebies
          }
        },
        loading: false
      }

      default:
        return state
  }

}