import type { ReactElement } from "react";
import { useReducer } from "react"
import { MakersLibraryContext, tuesdayMakersInitialState } from "."
import { useMakersLibraryPaginateReducer } from "./useFreebiePaginateReducer"

interface IProps {
  children?: ReactElement,
  defaultState?: MakersLibraryStateType
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
const UseMakersLibraryProvider = ({ children, defaultState }: IProps) => {
  const [state, dispatch] = useReducer(useMakersLibraryPaginateReducer, defaultState ? defaultState : tuesdayMakersInitialState)
  const value = { state, dispatch }
  return <MakersLibraryContext.Provider value={value}>
    {children}
  </MakersLibraryContext.Provider>
}

export default UseMakersLibraryProvider