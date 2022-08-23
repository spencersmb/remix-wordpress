import { renderUi } from "@TestUtils/renderUtils"
import BasicSubmitBtn from "../basicSubmitBtn"

describe('Generic Submit Button', () => {

  it('Should have correct default Button Text', () => {
    const { getByText } = renderUi(<BasicSubmitBtn
      loading={false}
      text="My Button"
      className=""
      loadingText="Loading"
    />)
    expect(getByText('My Button')).toBeInTheDocument()
  })

  it('Should have correct default loading Text', () => {
    const { getByText } = renderUi(<BasicSubmitBtn
      loading={true}
      text="My Button"
      className=""
      loadingText="Loading"
    />)

    expect(getByText('Loading')).toBeInTheDocument()
  })

  it('Should have correct Button Classes', () => {
    const { getByTestId } = renderUi(<BasicSubmitBtn
      loading={false}
      text="My Button"
      className="spencer"
      loadingText="Loading"
    />)

    expect(getByTestId('submit-btn')).toHaveClass('spencer')
  })

  it('Should have correct Button Text for Loading State', () => {
    const { getByText } = renderUi(<BasicSubmitBtn
      loading={true}
      text="My Button"
      className=""
      loadingText="Loading"
    />)

    expect(getByText('Loading')).toBeInTheDocument()
  })

  it('Should not Show spinner for Normal State', () => {
    const { queryByTestId } = renderUi(<BasicSubmitBtn
      loading={false}
      text="My Button"
      className=""
      loadingText="Loading"
    />)
    expect(queryByTestId('tw-spinner-one')).toBeNull()
  })

  it('Should have Show spinner for Loading State', () => {
    const { getByTestId } = renderUi(<BasicSubmitBtn
      loading={true}
      text="My Button"
      className=""
      loadingText="Loading"
    />)
    expect(getByTestId('tw-spinner-one')).toBeInTheDocument()
  })


})