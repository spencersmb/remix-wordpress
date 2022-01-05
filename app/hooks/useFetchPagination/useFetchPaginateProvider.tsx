import { ReactElement, useReducer } from 'react'
import { fetchInitialState, FetchPaginateContext, IFetchPaginationState } from './index'
import { useFetchPaginationReducer } from './useFetchPaginationReducer'

interface IProps {
  children?: ReactElement,
  defaultState?: IFetchPaginationState
}

/**
 * @Component UseFetchPaginateProvider
 *
 * Global state to track posts that have been loaded
 *
 * Optional default stat to pass posts in if we are on a page that useMatches has found post and pageInfo
 * via the Root component.
 * 
 * Categories Hack:
 * Initialize the page/State with category from server just like the posts, however on react.router navigation
 * we compare categories state manually to add in the new category that way. This works because we pass state down to the page but
 * technically the manually added in state doesn't get added all the way until a user hits load more button and the category gets
 * offically added through the correct conext flow
 *
 */
const UseFetchPaginateProvider = ({ children, defaultState }: IProps) => {
  const [state, dispatch] = useReducer(useFetchPaginationReducer, defaultState ? defaultState : fetchInitialState)
  let updatedState = state
  const defaultArray = Object.keys(defaultState?.categories || {})
  const stateCatArray = Object.keys(state?.categories || {})

  // check for mismatching states on user navigation
  if (defaultArray.toString() !== stateCatArray.toString()) {
    // console.log('modifiy state')
    updatedState = {
      ...state,
      categories: {
        ...state.categories,
        ...defaultState?.categories
      }
    }
  }
  // console.log('UseFetchPaginateProvider: state', state)
  // console.log('defaultArray.values', defaultArray.toString())
  // console.log('stateCatArray', stateCatArray.toString())
  // console.log('UseFetchPaginateProvider: defaultState', defaultState)
  const value = { state: updatedState, dispatch }
  return <FetchPaginateContext.Provider value={value}>
    {children}
  </FetchPaginateContext.Provider>
}

export default UseFetchPaginateProvider
