import { useSiteReducer } from './useSiteReducer'
import { ReactChildren, ReactElement, useReducer } from 'react'
import { ISiteContextState, SiteContext } from './index'

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
