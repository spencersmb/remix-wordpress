import { render } from "@testing-library/react"
import AccentHeaderText from "../accentHeaderText"

describe('Accent Header text', () => {

  const setup = (props: any = {}) => {
    const setupProps = { ...props }

    return render(
      <AccentHeaderText {...setupProps} />
    )
  }

  it('It should have correct text', () => {
    const { getByText } = setup({ text: 'Join' })
    expect(getByText('Join')).toBeInTheDocument()
  })
})