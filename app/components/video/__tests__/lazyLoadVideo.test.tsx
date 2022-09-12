import { screen } from "@testing-library/react";
import { renderUi } from "@TestUtils/renderUtils"
import LazyLoadVideo from "../lazyLoadVideo"

describe('Lazy Load Video Setup', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  const videoUrl = 'https://static.showit.co/file/E0ybNlpeQ8qUB00gPpkPEg/124817/bonnie_b_roll_1_-_web.mp4'

  const setup = () => renderUi(<LazyLoadVideo video={videoUrl} />)

  it('It Should render with correct Video properties', () => {
    const { getByTestId } = setup()
    const video = getByTestId('lazyLoadVideo')
    const sources = Array.from(video.children)

    expect(sources[0]).toHaveAttribute('src', videoUrl)
    expect(sources[0]).toHaveAttribute('data-src', videoUrl)
    expect(sources[0]).toHaveAttribute('type', 'video/mp4')

    expect(video).toHaveAttribute('autoplay')
    expect(video).toHaveAttribute('loop')
    expect(video).toHaveAttribute('playsInline')
    expect(video).toHaveClass('opacity-100')


  })
})