import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { loginData } from "../loginDropDown"
import TuesdayMakersNavAd from "../tuesdayMakersNavAd"

describe('TuesdayMakers Mobile Nav Ad Test', () => {
  const setup = (props: any) => {
    render(
      <MemoryRouter>
        <div data-testid="parent">
          <TuesdayMakersNavAd {...props} />
        </div>
      </MemoryRouter>
    )
  }
  it('Correct title and desc', () => {
    setup({})
    const title = screen.queryByText('Tuesday Makers')
    const desc = screen.queryByText('Receive special offers on courses + products and gain access to the Resource Library')
    expect(title).toBeVisible()
    expect(desc).toBeVisible()
  })

  it('Should have Signup button with correct Link', () => {
    setup({})
    const button = screen.queryByText('Sign Up')
    expect(button).toBeVisible()
    expect(button).toHaveAttribute('href', '/tuesday-makers')
  })

  it('Should Flower Bg Image', () => {
    setup({})
    const image = screen.getByTestId('lazy-load-image-ff-project-5')
    expect(image).toBeVisible()
    expect(image).toHaveAttribute('src', 'https://et-website.imgix.net/et-website/images/tuesday-makers/ff-project-5.jpg?auto=format&w=500&fit=clip')
  })
})