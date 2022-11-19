import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import AboutMobileDropDown from "../aboutMobileDropdown"

describe('AboutMobileDropDown Test', () => {
  const setup = (props: any) => {
    render(
      <MemoryRouter>
        <div data-testid="parent">
          <AboutMobileDropDown {...props} />
        </div>
      </MemoryRouter>
    )
  }
  it('Correct title with icon', () => {
    setup({})
    const test = screen.queryByText('About')
    const chevronIcon = screen.queryByTestId('chevron-icon')
    expect(test).toBeVisible()
    expect(chevronIcon).toBeTruthy()
  })

  it('Should 3 list items', () => {
    setup({})
    const ul = screen.getByTestId('dropdown')
    expect(ul.children.length).toEqual(3)
  })

  it('Should have correct Text/Link for Item 1', () => {
    setup({})
    const title = screen.getByText('Our Story')
    const desc = screen.getByText('Tuesdays just got a little bit better.')
    const link = title.parentElement?.parentElement
    expect(title).toBeVisible()
    expect(desc).toBeVisible()
    expect(link).toHaveAttribute('href', '/about/our-story')
  })

  it('Should have correct Text/Link for Item 2', () => {
    setup({})
    const title = screen.getByText('Licensing')
    const desc = screen.getByText('Three clear options, we take the guesswork out of choosing a license.')
    const link = title.parentElement?.parentElement
    expect(title).toBeVisible()
    expect(desc).toBeVisible()
    expect(link).toHaveAttribute('href', '/licenses')
  })

  it('Should have correct Text/Link for Item 3', () => {
    setup({})
    const title = screen.getByText('Things I love')
    const desc = screen.getByText('Love my style and want to know where to get my favorites?!')
    const link = title.parentElement?.parentElement
    expect(title).toBeVisible()
    expect(desc).toBeVisible()
    expect(link).toHaveAttribute('href', '/about/things-i-love')
  })
})