import { GetAllFreebiesQuery } from "@App/lib/graphql/queries/resourceLibrary"
import { fetchAPIClientSide } from "@App/utils/fetch.cleint"
import { getGraphQLString } from "@App/utils/graphqlUtils"
import { useEffect } from "react"

export function usePrefetchTuesdayMakersApiCall() {
  useEffect(() => {
    async function prefetchData() {
      await fetchAPIClientSide(getGraphQLString(GetAllFreebiesQuery))
    }
    prefetchData().catch()

  }, [])
}