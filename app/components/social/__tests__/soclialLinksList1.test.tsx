import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import SocialLinksList1 from "../socialLinksList1"

describe('Social Links List 1', () => {
  const setup = (props: any = {}) => {
    render(
      <MemoryRouter>
        <UseSiteProvider defaultState={siteInitialState}>
          <SocialLinksList1 {...props} />
        </UseSiteProvider>
      </MemoryRouter>
    )
  }

  it('Should have 4 social links text / url', () => {
    setup()
    const footerSocialLinks = screen.getAllByTestId('social-link')
    expect(footerSocialLinks.length).toBe(4)

    expect(footerSocialLinks[0]).toHaveTextContent('Youtube')
    expect(footerSocialLinks[0]).toHaveAttribute('href', 'https://youtube.com/everytues')

    expect(footerSocialLinks[1]).toHaveTextContent('Pinterest')
    expect(footerSocialLinks[1]).toHaveAttribute('href', 'https://pinterest.com/everytuesday')

    expect(footerSocialLinks[2]).toHaveTextContent('Instagram')
    expect(footerSocialLinks[2]).toHaveAttribute('href', 'https://instagram.com/everytuesday')

    expect(footerSocialLinks[3]).toHaveTextContent('Facebook')
    expect(footerSocialLinks[3]).toHaveAttribute('href', 'https://facebook.com/everytuesday')

  })

  it('Should have correct UL css classes', () => {
    setup({
      ulClassName: 'test-class',
      svgColor: '#fff'
    })

    const ul = screen.getByTestId('social-links-ul')
    expect(ul).toHaveClass('test-class')
  })

  it('Svg Should have correct color', () => {
    setup({
      ulClassName: 'test-class',
      svgColor: '#fff'
    })

    const footerSocialLinks = screen.getAllByTestId('social-link')
    const svg = footerSocialLinks[0].firstChild as SVGElement
    expect(svg).toHaveAttribute('fill', '#fff')
  })
})