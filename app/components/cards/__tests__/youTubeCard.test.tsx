import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import YouTubeVideo from "../youTubeCard__post"

describe('YouTube Card', () => {
  const defualtProps = {
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Create Candy Cane Lettering',
  }
  const setup = (props: any = {}) => {
    const setupProps = { ...defualtProps, ...props }
    render(
      <MemoryRouter>
        <YouTubeVideo {...setupProps} />
      </MemoryRouter>

    )
    return {
      card: screen.getByTestId('youtube_video'),
    }
  }
  it('Should have correct title', () => {
    const { card } = setup()
    expect(card).toHaveAttribute('title', `YouTube video: ${defualtProps.title}`)
  })
  it('Should have correct video src', () => {
    const { card } = setup()
    expect(card).toHaveAttribute('src', defualtProps.url)
  })
})