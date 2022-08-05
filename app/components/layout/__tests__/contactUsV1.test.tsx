import { renderUi } from "@TestUtils/renderUtils"
import { MemoryRouter } from "react-router"
import ContactUsV1 from "../contactUsV1"

describe('Contact Module V1', () => {
  const setup = (props: any = {}) => {
    return renderUi(
      <MemoryRouter>
        <ContactUsV1 />
      </MemoryRouter>)
  }
  it('Should have correct contact Text', () => {
    const { getByText } = setup()
    expect(getByText('Still have questions?')).toBeInTheDocument()
  })

  it('Should have correct contact Link Text and URL', () => {
    const { getByText } = setup()
    const button = getByText('Contact Us')
    const url = button.getAttribute('href')
    expect(url).toBe('/contact')
  })


})