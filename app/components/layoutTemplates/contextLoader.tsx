import { SEARCH_STATE_ENUMS } from '@App/enums/searchEnums'
import { fetchInitialState } from '@App/hooks/useFetchPagination'
import UseFetchPaginateProvider from '@App/hooks/useFetchPagination/useFetchPaginateProvider'
import { useMatchesLookup } from '@App/hooks/useMatchesLookup'
import { siteSearchState } from '@App/hooks/useSearch'
import UseSearchProvider from '@App/hooks/useSearch/useSearchProvider'
import { siteInitialState } from '@App/hooks/useSite'
import UseSiteProvider from '@App/hooks/useSite/useSiteProvider'

interface Props {
  children: React.ReactNode
}

function ContextLoader(props: Props) {
  const { children } = props
  const data = useMatchesLookup('/')
  if (!data) {
    throw new Error('No data found for route')
  }
  const { menus, metadata, user, searchData } = data

  const value = {
    ...siteInitialState,
    menu: menus,
    metadata, // merge from Server-side Metadata response from WP
    user,
  }
  return (
    <>
      <UseSiteProvider defaultState={value}>
        <UseSearchProvider defaultState={{
          ...siteSearchState,
          status: !searchData ? SEARCH_STATE_ENUMS.ERROR : SEARCH_STATE_ENUMS.LOADED,
          data: searchData,
          // client,
        }}>
          <UseFetchPaginateProvider defaultState={fetchInitialState}>
            <>
              {children}
            </>
          </UseFetchPaginateProvider>
        </UseSearchProvider>
      </UseSiteProvider>
    </>
  )
}

export default ContextLoader
