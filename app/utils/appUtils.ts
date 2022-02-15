import { RouteData } from "@remix-run/react/routeData"
import { useMatches } from "remix"
import { IFetchPaginationState, fetchInitialState } from "~/hooks/useFetchPagination"
import { ISelectedMatch } from "~/interfaces/remix"

export const getDefaultState = () => {
  let matches = useMatches()
  let selectedMatch: undefined | ISelectedMatch = matches.find(match => match.data?.pageInfo)
  const posts: IPost[] | null = selectedMatch ? selectedMatch?.data?.posts : null
  const pageInfo: IwpPageInfo = selectedMatch ? selectedMatch?.data?.pageInfo : null
  
  // const selectedCategory = selectedMatch ? selectedMatch.data.category : null
  // Filter through useMatches to check if this is a category page
  // if it is then set the category value for the default context initialization
  // let categories: ICategories | {} = (selectedMatch && selectedCategory)
  //   ? {
  //     [selectedCategory]: {
  //       pageInfo: {
  //         page: 1,
  //         hasNextPage: selectedMatch.data.pageInfo.hasNextPage,
  //         endCursor: selectedMatch.data.pageInfo.endCursor,
  //       },
  //       posts: [...selectedMatch.data.posts]
  //     }
  //   } : {}


  let defaultState: IFetchPaginationState | undefined = (posts && pageInfo) ? {
    ...fetchInitialState,
    // pageInfo: {
    //   page: 1,
    //   hasNextPage: pageInfo.hasNextPage,
    //   endCursor: pageInfo.endCursor,
    // },
    // posts,
    // loading: false,
    // categories
  } : undefined

  console.log('matches', matches);
  

  return defaultState
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}