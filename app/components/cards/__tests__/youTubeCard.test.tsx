import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import YouTubeVideo from "../youTubeCard__post"

describe('YouTube Card', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
    window.IntersectionObserverEntry = {
      prototype: {
        // @ts-ignore
        isIntersecting: () => null,
      },
    };
  });
  // @ts-ignore
  window.matchMedia = jest.fn((query: string) => {
    return { matches: false };
  })
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
      parent: screen.getByTestId('embed-parent'),
    }
  }
  it('Should have correct children', () => {
    const { parent } = setup()
    expect(parent.children).toHaveLength(2)
  })
})