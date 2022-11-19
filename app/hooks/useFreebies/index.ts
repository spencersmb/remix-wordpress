import { GetAllFreebiesQuery, GetFreebiesQuery } from '@App/lib/graphql/queries/resourceLibrary';
import { getGraphQLString } from '@App/utils/graphqlUtils';
import { flattenResourceData } from '@App/utils/resourceLibraryUtils';
import { isArray } from 'lodash';
import type { Dispatch} from 'react';
import { useEffect} from 'react';
import { useContext} from 'react';
import { createContext, useState } from 'react'
import type { MakersLibraryPaginateAction} from './useFreebiePaginateReducer';
import { MakersLibraryPaginateTypes } from './useFreebiePaginateReducer'


/*
  ASYNC FREEBIE PAGINATION START
*/
export interface MakersLibraryContextType {
  state: MakersLibraryStateType,
  dispatch: Dispatch<MakersLibraryPaginateAction>
}
export const tuesdayMakersInitialState:MakersLibraryStateType = {
  loading: false,
  categories: {},
  initialized: false
}

export const MakersLibraryContext = createContext<MakersLibraryContextType>({
  state: tuesdayMakersInitialState,
  dispatch: () => null
})
MakersLibraryContext.displayName = 'MakersLibraryContext'

interface initialContext {
  category?: {
    [id: string] : {
      freebies: IResourceItem[]
      pageInfo: {
        page: number,
        endCursor: string,
        hasNextPage: boolean,
      }
    }
  }
}
const useMakersLibraryContent = (initialData?:initialContext) => {
  // console.log('newData', newData);
  
  let context
  // console.log('useMakersLibraryContent', useMakersLibraryContent);
  
  // Initialize Context State based on state & dispatch types
  context = useContext(MakersLibraryContext)

  // just check for the first key and if state is empty we'll add it to the context
  if(initialData?.category && !context.state.categories[Object.keys(initialData?.category)[0]]){
    // console.log('setCategory State');
    const catName = Object.keys(initialData.category)[0]
    context.state.categories[catName] = initialData.category[catName]
  }

  // console.log('skip');
  context.state.initialized = true
  
  if (!context) {
    throw new Error('useMakersLibraryContent must be used within a MakersLibrary Provider component')
  }
  return context
}

interface useMakersLibraryAsyncOptions{
  selectedFilter: {name: string, slug: string}
  itemsPerPage?: number
  initialData:{
    pageInfo: IwpPageInfo & {page: number},
    freebies: IResourceItem[]
  }
}

type IhandleFilterClick = (filter: {name: string, slug: string}) => void

export function useMakersLibraryAsync({
  selectedFilter,
  itemsPerPage = 12,
  initialData,
  }: useMakersLibraryAsyncOptions): {
    setFilter: (filter: {name: string, slug: string}) => void
    handleFilterClick: IhandleFilterClick,
    handleFetchMorePosts: () => void,
    selectedFilter: {name: string, slug: string},
    state: MakersLibraryStateType,
    dispatch: Dispatch<MakersLibraryPaginateAction>
  } {

    const category = {
      [selectedFilter.slug]:{
        pageInfo: initialData.pageInfo,
        freebies: initialData.freebies
      }
    }

    const {state, dispatch} = useMakersLibraryContent({category})
    
    const [filter, setFilter] = useState<{name: string, slug: string}>(selectedFilter)

    const handleFilterClick: IhandleFilterClick = (filterTag) => () => {
      setFilter(filterTag)
    }

    const loadingFreebies = ()=>{
      dispatch({
        type: MakersLibraryPaginateTypes.LOADING
      })
    }

    const addFreebiesAction = (data: AddFreebies) => {
      dispatch({
        type: MakersLibraryPaginateTypes.ADD_FREEBIES,
        payload: data
      })
    }

    const handleFetchMorePosts = async () => {
      loadingFreebies()
      const url = window.ENV.PUBLIC_WP_API_URL as string

      const variables = {
        first: 12,
        after: state.categories[filter.slug] ? state.categories[filter.slug].pageInfo.endCursor : null,
        catName: filter.name === 'All' ? null : filter.slug
      }

      console.log('variables', variables);
      

      const body = await fetch(url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: filter.name === 'All' 
              ? getGraphQLString(GetAllFreebiesQuery)
              : getGraphQLString(GetFreebiesQuery),
            variables
          })
        })
      const response = await body.json()
      const { data } = response

      const modifiedData = flattenResourceData(response.data.resourceLibraries) || []
      
      // UPDATE STATE
      const page = state.categories[filter.slug] ? state.categories[filter.slug].pageInfo.page + 1 : 1

      addFreebiesAction({
        category: filter.slug,
        pageInfo: {
          ...data.resourceLibraries.pageInfo,
          page
        },
        freebies: isArray(modifiedData) ? modifiedData : []
      })

    }

    useEffect(() => {
      // If the category is empty, get it
      if (!state.categories[filter.slug]) {
        handleFetchMorePosts()
      }

    }, [filter])

    return {
      setFilter,
      handleFilterClick,
      handleFetchMorePosts,
      selectedFilter: filter,
      state,
      dispatch
    }
  } 

interface AddFreebies {
  pageInfo: IwpPageInfo & {page: number},
  freebies: IResourceItem[]
  category: string
}

