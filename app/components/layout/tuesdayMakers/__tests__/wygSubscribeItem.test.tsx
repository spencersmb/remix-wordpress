import { renderUi } from "@TestUtils/renderUtils"
import WygSubscribeItem from "../wygSubscriberItem"

describe('WygSubscribeItem Tests', () => {
  const testItem = {
    title: 'title',
    index: 0,
    description: 'description'
  }
  const setup = (props: any = {}) => {
    const setupProps = { ...props }
    return renderUi(<WygSubscribeItem {...setupProps} />)
  }
  it('Should have correct index number', () => {
    const { queryByText } = setup(testItem)
    expect(queryByText('01')).toBeTruthy()
  })

  it('Should have correct title', () => {
    const { queryByText } = setup(testItem)
    expect(queryByText('title')).toBeTruthy()
  })

  it('Should have correct description', () => {
    const { queryByText } = setup(testItem)
    expect(queryByText('description')).toBeTruthy()
  })

  it('Should have correct className for first items', () => {
    const { getByTestId } = setup(testItem)
    expect(getByTestId('wygSubscriberItem')).toHaveClass('tablet:col-start-2 tablet:col-span-6 desktop:col-start-3 desktop:col-span-5')
  })

  it('Should have correct className for last two items', () => {
    const { getByTestId } = setup({ ...testItem, index: 5 })
    expect(getByTestId('wygSubscriberItem')).toHaveClass('tablet:col-start-8 tablet:col-span-6 desktop:col-start-8 desktop:col-span-5')
  })
})