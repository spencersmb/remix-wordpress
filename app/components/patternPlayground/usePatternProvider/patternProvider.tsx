import type { ReactElement } from 'react';
import { useReducer } from 'react'
import type { IPatternProviderContextState } from '.';
import { PatternProviderContext } from '.';
import { usePPReducer } from './usePPReducer';

/**
 * @Component UsePatternProvider
 *
 * Primary component to provide context to the whole app for things like Navs, Modals, Users
 */

interface IProps {
  children?: ReactElement,
  defaultState: IPatternProviderContextState
}
const UsePatternProvider = ({ children, defaultState }: IProps) => {
  const [state, dispatch] = useReducer(usePPReducer, defaultState)
  const value = { state, dispatch }
  return <PatternProviderContext.Provider value={value}>
    {children}
  </PatternProviderContext.Provider>
}

export default UsePatternProvider
