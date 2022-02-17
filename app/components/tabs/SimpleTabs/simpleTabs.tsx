import React, { FunctionComponent, useState } from 'react'
import { ITabsState, SimpleTabsContext, simpleTabsDefaultState } from './simpleTabsContext'

/**
 * @Component SimpleTabs
 *
 * A generic Tab Component with a shareable state so that other content can
 * react to the selected tab.
 *
 * @param {React.Children} children
 */
const SimpleTabs: FunctionComponent = ({ children }) => {
  const [state, setState] = useState<ITabsState>(simpleTabsDefaultState)

  const handleTabSelect = (e: any) => {
    const tabId = e.currentTarget.getAttribute('data-name')
    setState((state: any) => {
      return {
        ...state,
        selectedTab: tabId,
      }
    })
  }

  const value = {
    state,
    setState,
    handleTabSelect
  }
  return (
    <SimpleTabsContext.Provider value={value}>
      {children}
    </SimpleTabsContext.Provider>
  )
}

export default SimpleTabs;