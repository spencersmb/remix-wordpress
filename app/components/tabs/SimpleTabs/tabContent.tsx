import React from 'react'
import { useSimpleTabs } from './simpleTabsContext'


/**
 * @Component TabContent
 * @tested - 5/27/2022
  * Display the content of the selected tab based on the selected id.
 * The ID is the name of the tab
 *
 *
 * @param {React.Children} children
 * @param {string} id
 */
interface Props {
  className?: string
  id: string
  children: React.ReactNode
}
const TabContent = ({ id, children, className }: Props) => {
  const { state } = useSimpleTabs()
  return state.selectedTab !== id
    ? null
    : <div id={id} role={'tabpanel'} aria-labelledby={`${id}-tab`} className={className}>
      {children}
    </div>
}

export default TabContent;