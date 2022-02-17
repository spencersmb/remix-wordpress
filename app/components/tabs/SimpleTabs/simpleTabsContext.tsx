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

export const SimpleTabsContext = React.createContext<ISimpleTabsContext>({
  state: simpleTabsDefaultState,
  setState: () => null,
  handleTabSelect: () => null
})

SimpleTabsContext.displayName = 'SimpleTabsContext'

export const useSimpleTabsContext = () => {
  const context = useContext(SimpleTabsContext)
  if (context === undefined) {
    throw new Error('useSimpleTabs must be used within a <SimpleToggle />')
  }
  return context
}

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