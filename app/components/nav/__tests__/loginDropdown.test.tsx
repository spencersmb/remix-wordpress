import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import LoginDropDown, { loginData } from "../loginDropDown"

describe('LoginDropDown Test', () => {
  const setup = (props: any) => {
    render(
      <MemoryRouter>
        <div data-testid="parent">
          <LoginDropDown {...props} />
        </div>
      </MemoryRouter>
    )
  }
  it('Correct title with icon', () => {
    setup({})
    const loginText = screen.queryByText('Login')
    const userIcon = screen.queryByTestId('user-icon')
    const chevronIcon = screen.queryByTestId('chevron-icon')
    expect(loginText).toBeVisible()
    expect(userIcon).toBeTruthy()
    expect(chevronIcon).toBeTruthy()
  })

  it('Should 3 list items', () => {
    setup({})
    const ul = screen.getByTestId('login-dropdown')
    expect(ul.children.length).toEqual(3)
  })

  it('Should have correct Text/Link for TuesdayMakers', () => {
    setup({})
    const tuesdayMakers = screen.getByText('Tuesday Makers')
    const tuesdayMakersText = screen.getByText(loginData['tuesday-makers'].description)
    const link = tuesdayMakers.parentElement?.parentElement
    expect(tuesdayMakers).toBeVisible()
    expect(tuesdayMakersText).toBeVisible()
    expect(link).toHaveAttribute('href', loginData['tuesday-makers'].link)
  })

  it('Should have correct Text/Link for Teachable', () => {
    setup({})
    const title = screen.getByText(loginData['teachable'].title)
    const text = screen.getByText(loginData['teachable'].description)
    const link = title.parentElement?.parentElement
    expect(title).toBeVisible()
    expect(text).toBeVisible()
    expect(link).toHaveAttribute('href', loginData['teachable'].link)
  })

  it('Should have correct Text/Link for Gumroad', () => {
    setup({})
    const title = screen.getByText(loginData['gumroad'].title)
    const text = screen.getByText(loginData['gumroad'].description)
    const link = title.parentElement?.parentElement
    expect(title).toBeVisible()
    expect(text).toBeVisible()
    expect(link).toHaveAttribute('href', loginData['gumroad'].link)
  })
})