import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import FooterLinks from "../footerLinks"

describe('Footer Component', () => {

  const setup = () => {
    render(
      <MemoryRouter>
        <UseSiteProvider defaultState={siteInitialState}>
          <FooterLinks />
        </UseSiteProvider>
      </MemoryRouter>
    )
  }
  it('Should Show Footer Logo with Home Url', () => {
    setup()
    const footerLogo = screen.getByTestId('footer-logo')
    const logoLink = screen.getByTestId('logo-link')
    expect(footerLogo).toHaveTextContent('Digital Art + Lettering')
    expect(footerLogo).toHaveTextContent('Every Tuesday Home Page')
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('Should Show 2 Footer Link Headers', () => {
    setup()
    const footerHeaders = screen.getAllByTestId('footer-link')
    expect(footerHeaders.length).toBe(2)
    expect(footerHeaders[0]).toHaveTextContent('Discover')
    expect(footerHeaders[1]).toHaveTextContent('Help + Information')
  })

  it('Should have correct foot link text/url', () => {
    setup()
    const footerLinks = screen.getAllByTestId('footer-link--item')
    expect(footerLinks.length).toBe(7)
    expect(footerLinks[0]).toHaveTextContent('Blog')
    expect(footerLinks[0]).toHaveAttribute('href', '/blog')
    expect(footerLinks[1]).toHaveTextContent('Courses')
    expect(footerLinks[1]).toHaveAttribute('href', '/courses')
    expect(footerLinks[2]).toHaveTextContent('Products')
    expect(footerLinks[2]).toHaveAttribute('href', '/products')
    expect(footerLinks[3]).toHaveTextContent('Tuesday Makers')
    expect(footerLinks[3]).toHaveAttribute('href', '/tuesday-makers')
    expect(footerLinks[4]).toHaveTextContent('About')
    expect(footerLinks[4]).toHaveAttribute('href', '/about')
    expect(footerLinks[5]).toHaveTextContent('Contact')
    expect(footerLinks[5]).toHaveAttribute('href', '/contact')
    expect(footerLinks[6]).toHaveTextContent('Licenses')
    expect(footerLinks[6]).toHaveAttribute('href', '/licenses')
  })

  it('Should have correct social header text', () => {
    setup()
    const footerSocial = screen.getByTestId('social-links-block')
    expect(footerSocial).toHaveTextContent('Follow Us')
  })

  it('Should have social link text / url', () => {
    setup()
    const footerSocialLinks = screen.getAllByTestId('social-link')
    expect(footerSocialLinks.length).toBe(4)

    expect(footerSocialLinks[0]).toHaveTextContent('Youtube')
    expect(footerSocialLinks[0]).toHaveAttribute('href', 'https://youtube.com/everytues')
  })
})