import { useSiteReducer } from './useSiteReducer'
import { ReactElement, useReducer } from 'react'
import { ISiteContextState, SiteContext } from './index'

/**
 * @Component UseSiteProvider
 *
 * Primary component to provide context to the whole app for things like Navs, Modals, Users
 */

interface IProps {
  children?: ReactElement,
  defaultState: ISiteContextState
}
const UseSiteProvider = ({children, defaultState}: IProps) => {
  const [state, dispatch] = useReducer(useSiteReducer, defaultState)
  const value = {state, dispatch}
  return <SiteContext.Provider value={value}>
    {children}
  </SiteContext.Provider>
}

export default UseSiteProvider
