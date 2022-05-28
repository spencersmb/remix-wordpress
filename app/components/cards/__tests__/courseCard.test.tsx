import { render, screen } from "@testing-library/react"
import { mockPostDataComplete } from "@TestUtils/mock-data/posts"
import CourseCard from "../courseCard"

describe('CourseCard Component', () => {
  const defaultProps: { course: ICourse } = {
    course: {
      title: 'Title',
      id: 1,
      featuredImage: mockPostDataComplete.featuredImage,
      slug: 'slug',
      details: {
        courseUrl: 'https://remix.run',
        courseTags: ['tag1', 'tag2'],
      }
    }
  }

  const setup = (props: any = {}) => {
    const setupProps = { ...defaultProps, ...props }
    render(<CourseCard {...setupProps} />)
    return {
      card: screen.getByTestId('course-card'),
    }
  }
  it('Should have correct title', () => {
    const { card } = setup()
    expect(card).toHaveTextContent('Title')
  })

  it('Should have correct link', () => {
    setup()
    const link = screen.getAllByRole("link")
    expect(link[0]).toHaveProperty('href', 'https://remix.run/')
  })
})