import { QUERY_POSTS_BY_CAT } from '@App/lib/graphql/queries/posts';
import { getGraphQLString } from '@App/utils/graphqlUtils';
import { flattenAllPosts } from '@App/utils/posts';
import { setWindowUrlParams } from '@App/utils/windowUtils';
import type { Dispatch} from 'react';
import { useState} from 'react';
import { useEffect} from 'react';
import { useCallback} from 'react';
import { createContext, useContext } from 'react'
import { useSetUrlBlogParams, useSetUrlPageHistory } from '../blogHooks';
import { useHasLoaded } from '../useHasLoaded';
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

export const FetchPaginateContext = createContext<IFetchPaginateContextType | undefined>(undefined)

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
  
  if (!context) {
    throw new Error('usePaginateFetch must be used within a FetchPaginate Provider component')
  }

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
  
 
  return context
}

/*
 ** useFetchPaginate
 ** Adds posts to the global context so users don't have to keep hitting
 ** an API if they don't refresh the page.
 */
const useFetchPaginate = (newData?: updateContext, loaderDataCategories?: {initialCategories: any}) => {
  const {state, dispatch} = useFetchPaginateContent(newData)
  const [category, setCategory] = useState(loaderDataCategories ? loaderDataCategories.initialCategories.selectedCategory : 'all')
  
  const addPostsAction = (data: IPageInfo) => {
    dispatch({
      type: IFetchPaginateTypes.ADD_POSTS,
      payload: data
    })
  }

  const addCategoryAction = useCallback( (data: IPageInfo & {category: string}) => {
    dispatch({
      type: IFetchPaginateTypes.ADD_CATEGORY,
      payload: data
    })
  },[dispatch])

  const loadingPosts = useCallback(() => {
    dispatch({
      type: IFetchPaginateTypes.LOADING
    })
  }, [dispatch])

  const clearCategory = useCallback(() => {
    dispatch({
      type: IFetchPaginateTypes.CLEAR_CATEGORY
    })
  },[dispatch])

  const clearPosts = () => {
    dispatch({
      type: IFetchPaginateTypes.CLEAR_POSTS
    })
  }

  const fetchCategory = useCallback(async ({
    endCursor,
    page
  }: IFetchCategory) => {

    const url = window.ENV.PUBLIC_WP_API_URL as string

    const variables = {
      first: 12,
      after: endCursor,
      catName: category === 'all' ? '' : category,
    }
    const body = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getGraphQLString(QUERY_POSTS_BY_CAT),
          variables
        })
      })
    const response = await body.json()
    const { data } = response
    const filteredPosts = flattenAllPosts(response.data.posts) || []

    addCategoryAction({
      category,
      pageInfo: {
        page,
        endCursor: data.posts.pageInfo.endCursor,
        hasNextPage: data.posts.pageInfo.hasNextPage,
      },
      posts: filteredPosts
    })

  }, [category, addCategoryAction])

  useEffect(() => {
    const categories = state.categories
    if (!categories[category]) {
      console.log('fetch new posts cat empty', categories)
      loadingPosts()
      // fetchMoreCategories()
      fetchCategory({
        endCursor: categories[category] ? categories[category].pageInfo.endCursor : null,
        page: categories[category] ? categories[category].pageInfo.page + 1 : 1
      })
    }
  }, [category, fetchCategory, loadingPosts, state.categories])

  // Set page number in url each time we change data from fetch for non category pages
  useSetUrlPageHistory(state.pageInfo.page)

  // Set URL with params depending on category everytime we change category or page
  useSetUrlBlogParams({
    category,
    pageInfo: state.pageInfo,
    categories: state.categories
  })

  // Clear the category when the component unmounts
  useEffect(() => {
    return () => {
      clearCategory()
    }
  }, [clearCategory])

  return {
    category,
    setCategory,
    fetchCategory,
    loadingPosts,
    addPostsAction,
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
