import { lfmImgRoot } from "@App/utils/lfmUtils"
import { renderUi } from "@TestUtils/renderUtils"
import { MemoryRouter } from "react-router"
import MiniCourseNavItem from "../miniCourseNavItem"

describe('LFM: MiniCourse Nav item', () => {
  const video1 = {
    title: '3 Steps to choosing a font style that sells',
    description: 'Learn how to choose a font style that sells',
    videoId: '',
    image: {
      src: `${lfmImgRoot.imigix}/mini-course/video-1.jpg?w=200&fit=crop&q=80`,
      alt: 'Learn Font Making Free Mini Course - Video 1',
      width: 200,
      height: 120,
      placeholder: `${lfmImgRoot.imigix}/mini-course/video-1.jpg?w=20&fit=crop&q=80`,
    },
    link: '/learn-font-making/mini-course/video-1',
  }
  const toggleNav = jest.fn()
  const setup = () => {
    return (renderUi(
      <MemoryRouter>
        <MiniCourseNavItem
          index={0}
          video={video1}
          toggleNav={toggleNav}
          cookieUnlock={undefined} />
      </MemoryRouter>
    ))
  }
  it('Should not error', () => {
    const { queryByText } = setup()
    expect(queryByText(video1.title)).toBeInTheDocument()
  })
})