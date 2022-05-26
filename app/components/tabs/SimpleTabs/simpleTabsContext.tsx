import React, { useContext } from 'react'

export interface ITabsState {
  tabs: [],
  selectedTab: string,
}
interface ISimpleTabsContext {
  state: ITabsState,
  setState: any
  handleTabSelect: any
}

export const simpleTabsDefaultState: ITabsState = {
  tabs: [],
  selectedTab: '',
}
// @ts-ignore
export const SimpleTabsContext = React.createContext<ISimpleTabsContext | undefined>()

SimpleTabsContext.displayName = 'SimpleTabsContext'

export const useSimpleTabsContext = () => {
  const context = useContext(SimpleTabsContext)
  if (context === undefined) {
    throw new Error('useSimpleTabs must be used within a <SimpleTabsProvider />')
  }
  return context
}


/**
 * @Component useSimpleTabs
 * @tested - 5/27/2022
 *
 * @param {React.Children} children
 */
export const useSimpleTabs = () => {

  // FROM KCD - pass args to an onClick handler
  const callAll = (...fns: any) => (...args: any) => fns.forEach((fn: any) => fn?.(...args))
  const { state, handleTabSelect, setState } = useSimpleTabsContext()

  // Get all props for the tab, then merge with the onClick handler
  function getTabsProps({
    onClick,
    ...props
  }: any = {}) {
    return {
      'role': 'tab',
      onClick: callAll(onClick, handleTabSelect),
      ...props,
    }
  }
  return {
    getTabsProps,
    state,
    setState,
    handleTabSelect
  }
}