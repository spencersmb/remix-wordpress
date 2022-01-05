import { RouteData } from "@remix-run/react/routeData"
import { useMatches } from "remix"
import { IFetchPaginationState, fetchInitialState } from "~/hooks/useFetchPagination"
interface ISelectedMatch {
  pathname: string;
  params: import("react-router").Params<string>;
  data: RouteData;
  handle: any;
}
export const getDefaultState = () => {
  let matches = useMatches()
  let selectedMatch: undefined | ISelectedMatch = matches.find(match => match.data?.pageInfo)
  const posts: IPost[] | null = selectedMatch ? selectedMatch?.data?.posts : null
  const pageInfo: IwpPageInfo = selectedMatch ? selectedMatch?.data?.pageInfo : null
  const selectedCategory = selectedMatch ? selectedMatch.data.category : null

  // Filter through useMatches to check if this is a category page
  // if it is then set the category value for the default context initialization
  let categories: ICategories | {} = (selectedMatch && selectedCategory)
    ? {
      [selectedCategory]: {
        pageInfo: {
          page: 1,
          hasNextPage: selectedMatch.data.pageInfo.hasNextPage,
          endCursor: selectedMatch.data.pageInfo.endCursor,
        },
        posts: [...selectedMatch.data.posts]
      }
    } : {}


  let defaultState: IFetchPaginationState | undefined = (posts && pageInfo) ? {
    ...fetchInitialState,
    page: 1,
    hasNextPage: pageInfo.hasNextPage,
    endCursor: pageInfo.endCursor,
    posts,
    loading: false,
    categories
  } : undefined

  return defaultState
}