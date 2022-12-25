import { SEARCH_STATE_ENUMS } from '@App/enums/searchEnums'
import { fetchInitialState } from '@App/hooks/useFetchPagination'
import UseFetchPaginateProvider from '@App/hooks/useFetchPagination/useFetchPaginateProvider'
import { useMatchesLookup } from '@App/hooks/useMatchesLookup'
import { siteSearchState } from '@App/hooks/useSearch'
import UseSearchProvider from '@App/hooks/useSearch/useSearchProvider'
import { siteInitialState } from '@App/hooks/useSite'
import UseSiteProvider from '@App/hooks/useSite/useSiteProvider'
import { createSiteMetaData, getWPMenu } from '@App/lib/wp/site'

interface Props {
  children: React.ReactNode
}

function ContextLoader(props: Props) {
  const { children } = props
  const data = useMatchesLookup('/')
  const fallbackUser = {
    wpAdmin: false,
    resourceUser: null
  }
  const fallbackMenu = getWPMenu(null)
  const searchData = !data ? {} : data.searchData
  let value = {
    ...siteInitialState,
    menu: !data ? fallbackMenu.menus : data.menus,
    metadata: !data ? createSiteMetaData('https://every-tuesday.com') : data.metadata, // merge from Server-side Metadata response from WP
    user: !data ? fallbackUser : data.user,
  }
  return (
    <>
      <UseSiteProvider defaultState={value}>
        <UseFetchPaginateProvider defaultState={fetchInitialState}>
          <UseSearchProvider defaultState={{
            ...siteSearchState,
            status: !searchData ? SEARCH_STATE_ENUMS.ERROR : SEARCH_STATE_ENUMS.LOADED,
            data: searchData,
            // client,
          }}>
            <>
              {children}
            </>
          </UseSearchProvider>
        </UseFetchPaginateProvider>
      </UseSiteProvider>
    </>
  )
}

export default ContextLoader
