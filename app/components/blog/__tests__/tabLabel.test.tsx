import { screen } from '@testing-library/react'
import TabLabel from "../blogHomeTabs/tabLabel"
import { TabsProviderRender } from '@TestUtils/providerUtils'

const providerDefaultProps = {
  tabs: [],
  selectedTab: '',
}
const providerSelectedProps = {
  tabs: [],
  selectedTab: 'test-id',
}
describe('TabLabel', () => {
  it('Tab shows correct  text', () => {

    const tabProps = {
      id: 'test-id',
      text: 'test-text',
      Svg: () => <div>Svg</div>,
    }
    TabsProviderRender(
      <TabLabel {...tabProps} />
      , { props: providerDefaultProps })
    expect(screen.getByTestId('tab')).toHaveTextContent('test-text')

    // expect(screen.getByText(/^My Name Is:/)).toHaveTextContent('My Name Is: C3P0')
  })

  it('Tab shows correct class for non-selected', () => {
    const tabProps = {
      id: 'test-id',
      text: 'test-text',
      Svg: () => <div>Svg</div>,
    }
    const css = 'text-sage-600'
    TabsProviderRender(<TabLabel {...tabProps} />, { props: providerDefaultProps })
    expect(screen.getByTestId('tab')).toHaveClass(css)
  })

  it('Tab shows correct class for selected', () => {
    const tabProps = {
      id: 'test-id',
      text: 'test-text',
      Svg: () => <div data-testid="svg">Svg</div>,
    }
    const css = 'text-sage-700'
    TabsProviderRender(<TabLabel {...tabProps} />, { props: providerSelectedProps })
    expect(screen.getByTestId('tab')).toHaveClass(css)
  })

  it('Should show neutral svg fill color', () => {
    const tabProps = {
      id: 'test-id',
      text: 'test-text',
      Svg: (props: any) => <div data-testid="test-svg" {...props}>Svg</div>,
    }
    TabsProviderRender(<TabLabel {...tabProps} />, { props: providerDefaultProps })
    const svgElement = screen.getByTestId('test-svg')
    const svgcolor = 'var(--sage-600)'

    expect(svgElement).toHaveAttribute('fill', svgcolor)
  })

  it('Should show correct svg fill color', () => {
    const tabProps = {
      id: 'test-id',
      text: 'test-text',
      Svg: (props: any) => <div data-testid="test-svg" {...props}>Svg</div>,
    }
    TabsProviderRender(<TabLabel {...tabProps} />, { props: providerSelectedProps })
    const svgElement = screen.getByTestId('test-svg')
    const svgcolor = 'var(--sage-700)'

    expect(svgElement).toHaveAttribute('fill', svgcolor)
  })

  it('Should show correct svg stroke color', () => {
    const tabProps = {
      id: 'test-id',
      text: 'test-text',
      iconFillType: 'stroke',
      Svg: (props: any) => <div data-testid="test-svg" {...props}>Svg</div>,
    }
    TabsProviderRender(<TabLabel {...tabProps} />, { props: providerSelectedProps })
    const svgElement = screen.getByTestId('test-svg')
    const svgcolor = 'var(--sage-700)'

    expect(svgElement).toHaveAttribute('stroke', svgcolor)
  })


})
