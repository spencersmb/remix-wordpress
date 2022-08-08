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
interface IProps {
  defaultFilter? : {name: string, slug: string}
  itemsPerPage? : number
}

/**
 * @function createPaginatedList
 *
 * used to take in a large amount of posts that can be filtered via tags. Start off by show 10 items per
 * fetch from the master array. Then return the amount per page in total. If page 2, return the first 20 items from
 * the master array.
 *
 * Filter is an added function that returns all the items from the master array matching that filter
 * After the filter is applied, calculate the amount of pages based on the array length.
 *
 * @param {array} items // Any postType with tags array inside
 * @param {number} postsPerPage // The total amount of posts to show each time
 * @param {number} currentPage // current page user is on
 * @param {string} filterTag // the filter that is being applied
 */
function createPaginatedList (items: any, postsPerPage: number, currentPage: number, filterTag: {name: string, slug: string}): IUseFreebiesPostReturn<any> {

  const filteredPages = items.filter((item: any) => {

    if(filterTag.slug === 'all'){
      return item
    }

    console.log('item', item);
    const tags = item.tags.map((tag: any) => tag.slug)
    console.log('tags', tags);
    
    const hasTag = tags.indexOf(filterTag.slug)

    return hasTag !== -1
  })

  const pagesCount = Math.ceil(filteredPages.length / postsPerPage);
  let page = Number(currentPage);
  if (typeof page === 'undefined' || isNaN(page)) {
    page = 1;
  }

  return {
    posts: filteredPages.filter((item: any,index: number) => (index < page * postsPerPage)),
    pagination: {
      currentPage: page,
      pagesCount,
      hasNextPage: pagesCount > page
    }
  }
}

type IhandlePageClick = () => void
type IhandleFilterClick = (filter: {name: string, slug: string}) => void
interface IUseFreebiesReturn {
  setFilter: (filter: {name: string, slug: string}) => void
  filter: {name: string, slug: string},
  handleFilterClick: IhandleFilterClick
  handlePageClick: IhandlePageClick
}
interface IUseFreebiesPostReturn<T> {
  posts: T,
  pagination: {
    currentPage: number,
    pagesCount: number,
    hasNextPage: boolean
}
} 
/**
 * @Function useFreebies
 *
 * The primary hook that keeps track of what filter is selected + what page this is. Page is basically how many
 * times the user has clicked show more. Based on those 2 items we determine what posts to show.
 *
 */
function useFreebies<TData = any> ({
  defaultFilter = {name: 'All', slug: 'all'},
  itemsPerPage = 10,
  items
  }: IProps & {items: TData}): IUseFreebiesReturn & IUseFreebiesPostReturn<TData> {

  const [filter, setFilter] = useState<{name: string, slug: string}>(defaultFilter)
  const [page, setPage] = useState(1)
  const handleFilterClick: IhandleFilterClick = (filterTag) => () => {
    setFilter(filterTag)
  }
  const handlePageClick: IhandlePageClick = () => {
    setPage(page + 1)
  }

  return {
    ...createPaginatedList(items, itemsPerPage, page, filter),
    filter,
    setFilter,
    handleFilterClick,
    handlePageClick
  }
}


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
// Needs to accept Data
// Needs to accept a default filter
// Needs to accept pageInfo

// State stores everything under their own category under makersLibrary

interface useMakersLibraryAsyncOptions{
  selectedFilter: {name: string, slug: string}
  itemsPerPage?: number
  initialData:{
    pageInfo: IwpPageInfo & {page: number},
    freebies: IResourceItem[]
  }
}
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

    

    // const [page, setPage] = useState(1)
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
        catName: filter.name === 'All' ? null : filter.name
      }

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
      console.log('data', data);
      

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
        console.log('fetching new cat in useEffect');
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
export default useFreebies
