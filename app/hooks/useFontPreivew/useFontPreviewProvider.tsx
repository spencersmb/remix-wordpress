import { useFontPreviewReducer } from './useFontPreviewReducer'
import { ReactElement, useReducer } from 'react'
import { FontPreviewContext, fontPreviewInitialState, IFpState } from './index'

/**
 * @Component UseFontPreviewProvider
 *
 * Primary component to provide context to the whole app for things like Navs, Modals, Users
 */

interface IProps {
  children?: ReactElement,
  defaultState?: IFpState
}
const UseFontPreviewProvider = ({ children, defaultState }: IProps) => {
  const initialState = defaultState || fontPreviewInitialState
  const [fontPreview, dispatch] = useReducer(useFontPreviewReducer, initialState)
  const value = { fontPreview, dispatch }
  return <FontPreviewContext.Provider value={value}>
    {children}
  </FontPreviewContext.Provider>
}

export default UseFontPreviewProvider
