import { renderUi } from "@TestUtils/renderUtils"
import FormErrorMessage from "../ErrorMessage"


describe('Error Message Bar', () => {
  const setup = (props: { message: string, className?: string }) => {
    return renderUi(<FormErrorMessage id="error" {...props} />)
  }
  it('Should show correct message', () => {
    const { queryByText } = setup({ message: 'Error Message' })
    expect(queryByText('Error Message')).toBeInTheDocument()
  })
})