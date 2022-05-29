import { render, screen } from "@testing-library/react"
import FooterCopyright from "../footerCopyright"
import { MemoryRouter } from "react-router-dom"

describe('Footer Copyright Component', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <FooterCopyright />
      </MemoryRouter>
    )
  }
  it('Should show correct copyright', () => {
    setup()
    const footerCopyright = screen.getByTestId('footer-copyright')
    expect(footerCopyright).toHaveTextContent('© Copyright 2021 Every Tuesday, LLC')
  })

  it('Should have correct links', () => {
    setup()
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(2)
    expect(links[0]).toHaveTextContent('Privacy & Cookies')
    expect(links[0]).toHaveAttribute('href', '/privacy-and-cookies')
    expect(links[1]).toHaveTextContent('Terms & Conditions')
    expect(links[1]).toHaveAttribute('href', '/terms-and-conditions')
  })
})