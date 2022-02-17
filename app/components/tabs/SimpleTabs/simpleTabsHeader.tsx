import React, { ReactChildren, ReactNode, useEffect } from 'react'
import { ITabsState, useSimpleTabs } from './simpleTabsContext'

/**
 * @Component SimpleTabsHeader
 *
 * The tabs that user will click to navigate
 *
 * @param {React.Children} children
 * @param {string} classNames
 */

interface IProps {
  children: any
  className?: string
}
const SimpleTabsHeader = ({ children, className }: IProps) => {
  const { setState } = useSimpleTabs()


  /**
   * @useEffect
   *
   * Map over the children in the header, each has a NAME prop that should have a
   * unique name provided to it. This name is pushed into a TABS array that we set to
   * state so we can reference each item later as the user clicks through them.
   *
   * First child is also set as the default selected TAB
   *
   */
  useEffect(() => {
    const elements: { tabs: string[] } = { tabs: [] }

    React.Children.map(children, (child: { props: { name: string } }) => {
      if (child.props.name) {
        elements.tabs.push(child.props.name)
      }
    })

    // Add the Tabs to state to map over
    // <Tab />
    setState((state: ITabsState) => {
      return {
        ...state,
        selectedTab: elements.tabs[0],
        tabs: elements.tabs
      }
    })
  }, [])


  return (
    <ul className={className}>
      {children}
    </ul>
  )
}

export default SimpleTabsHeader;