import { screen } from "@testing-library/react";
import { renderUi } from "@TestUtils/renderUtils"
import StartHere from "../startHere";

describe('Start Here Home Module', () => {

  const setup = () => renderUi(<StartHere />)

  it('It Should render the Video', () => {
    const { queryByTestId } = setup()
    const video = queryByTestId('lazyLoadVideo')
    expect(video).toBeVisible()
  })

  it('It Should render Pin Image', () => {
    const { queryByTestId } = setup()
    const pin = queryByTestId('imigx-container')
    expect(pin).toBeVisible()
  })

  it('It Should render Title Text', () => {
    const { queryByText } = setup()
    const title = queryByText(/New to Procreate?/i)
    expect(title).toBeVisible()
  })

  it('It Should render Title SubText', () => {
    const { queryByText } = setup()
    const subTitle = queryByText(/^Start Here!$/i)
    expect(subTitle).toBeVisible()
  })

  it('It Should render description', () => {
    const { queryByTestId } = setup()
    const desc = queryByTestId('desc')
    expect(desc).toBeVisible()
  })

  it('It Should render Link Button', () => {
    const { queryByText } = setup()
    const button = queryByText(/^Start Here$/i)
    expect(button).toBeVisible()
    expect(button).toHaveAttribute('href', 'https://learn.every-tuesday.com/procreate-for-beginners')

  })
})