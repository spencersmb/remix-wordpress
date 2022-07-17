import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { ErrorInfo } from "react";
import SimpleTabs from "../simpleTabs";
import { useSimpleTabs } from "../simpleTabsContext";
import SimpleTabsHeader from "../simpleTabsHeader";
import Tab from "../tab";
import TabContent from "../tabContent";

describe('useSimpleTabs', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore()
  })

  it('Should throw error', () => {
    function TestError() {
      const { state } = useSimpleTabs()
      return (
        <div>
          Error
        </div>
      )
    }
    expect(
      () => { // additional function wrap
        render(<TestError />);
      }
    ).toThrow(
      new RangeError('useSimpleTabs must be used within a <SimpleTabsProvider />')
    );
  })

  it('should have correct selected tab, tab props, call custom Click fn()', () => {

    const testFn = jest.fn()

    render(<SimpleTabs>
      <Tab {...{
        name: 'spencer',
        onClick: testFn,
        className: 'test-tab'
      }}>
        <div>Inner</div>
      </Tab>
    </SimpleTabs>)


    // render(<TestTabProps />)
    const button = screen.getByRole('tab')
    expect(button).toHaveAttribute('aria-controls', 'spencer')
    expect(button).toHaveAttribute('aria-selected', "false")
    expect(button).toHaveClass('test-tab')

    fireEvent.click(button)

    expect(testFn).toHaveBeenCalledTimes(1)
    expect(button).toHaveAttribute('aria-selected', "true")
    expect(button).toHaveTextContent('Inner')
  })

  it('should render no tabContent if not selected', () => {
    render(<SimpleTabs>
      <div data-testid="parent">
        <TabContent {...{
          index: 0,
          id: 'spencer',
          className: 'test-tabContent',
        }}>
          <div>Inner</div>
        </TabContent>
      </div>
    </SimpleTabs>)

    expect(screen.queryByTestId('parent')).toBeEmptyDOMElement()

  })

  it('should render tabContent if selected', () => {
    render(<SimpleTabs customState={{
      selectedTab: 'spencer',
      tabs: [],
    }}>
      <div data-testid="parent">
        <TabContent {...{
          index: 0,
          id: 'spencer',
          className: 'test-tabContent',
        }}>
          <div>Inner</div>
        </TabContent>
      </div>
    </SimpleTabs>)

    expect(screen.queryByTestId('parent')).toHaveTextContent('Inner')
    expect(screen.getByRole('tabpanel')).toBeVisible()
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', `tab-0`)
    expect(screen.getByRole('tabpanel')).toHaveAttribute('id', `spencer`)
    expect(screen.getByRole('tabpanel')).toHaveClass(`test-tabContent`)

  })

  it('should render tab', () => {
    render(<SimpleTabs>
      <SimpleTabsHeader>
        <Tab {...{
          name: 'spencer',
          className: 'test-tab'
        }}>
          <div>Inner</div>
        </Tab>
        <Tab {...{
          name: 'bigum',
          className: 'test-tab'
        }}>
          <div>Inner 2</div>
        </Tab>
      </SimpleTabsHeader>
    </SimpleTabs>)
    const tabList = screen.getByRole('tablist')
    const tabs = screen.getAllByRole('tab')
    expect(tabList).toBeVisible()

    // Should show both tabs since this is the nav
    expect(tabs.length).toBe(2)

  })

})