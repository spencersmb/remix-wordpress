import type { ReactChild } from 'react';
import React from 'react'
import { useSimpleTabs } from './simpleTabsContext'

/**
 * @Component Tab
 *
 * The tab that user clicks to navigate
 * Click handler on this element is assigned via getTabsProps
 * and is defined in useSimpleTabs Provider
 *
*  @tested - 5/27/2022
 * @param {React.Children} children
 * @param {string} name: unique prop on the tab to connect with the content
 *
 */

const Tab = ({ name, children, onClick, className }: { name: string, children: ReactChild, onClick?: any, className?: string }) => {
  const { state, getTabsProps } = useSimpleTabs()
  return <div className={className} data-name={name} {...getTabsProps({
    onClick: onClick || null,
    'aria-controls': name,
    'role': 'presentation',
    'aria-checked': state.selectedTab === name ? 'true' : "false"
  })}>
    {children}
  </div>
}

export default Tab;