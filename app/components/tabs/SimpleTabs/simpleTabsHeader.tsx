import React, { useEffect } from 'react'
import type { ITabsState } from './simpleTabsContext';
import { useSimpleTabs } from './simpleTabsContext'

/**
 * @Component SimpleTabsHeader
 *
 * The tabs that user will click to navigate
 * @tested - 5/27/2022
 * @param {React.Children} children
 * @param {string} classNames
 */

interface IProps {
  startPosition?: number
  children: any
  className?: string
}
const SimpleTabsHeader = ({ children, className, startPosition = 0 }: IProps) => {
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
        selectedTab: elements.tabs[startPosition],
        tabs: elements.tabs
      }
    })
  }, [children, setState, startPosition])


  return (
    <ul className={className} role='tablist'>
      {children}
    </ul>
  )
}

export default SimpleTabsHeader;