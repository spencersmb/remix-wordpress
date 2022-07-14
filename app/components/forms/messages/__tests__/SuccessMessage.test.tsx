import { renderUi } from "@TestUtils/renderUtils"
import FormSuccessMessage from "../SuccessMessage"


describe('Error Message Bar', () => {
  const setup = (props: { message: string, className?: string }) => {
    return renderUi(<FormSuccessMessage id="error" {...props} />)
  }
  it('Should show correct message', () => {
    const { queryByText } = setup({ message: 'Success Message' })
    expect(queryByText('Success Message')).toBeInTheDocument()
  })
})