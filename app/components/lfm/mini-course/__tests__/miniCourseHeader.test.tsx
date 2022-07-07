import { renderUi } from "@TestUtils/renderUtils"
import MiniCourseHeader from "../miniCourseHeader"

describe('LFM: MiniCourse Header', () => {
  const setup = (props: {
    fontLoadingState: string
    date: string
    form?: React.ReactNode
  }) => renderUi(<MiniCourseHeader {...props} />)
  it('Should have date', () => {
    const { queryByText } = setup({
      date: 'July 14, 2022',
      fontLoadingState: 'loading',
    })
    expect(queryByText('ENROLLMENT REOPENING')).toBeInTheDocument()
    expect(queryByText('July 14, 2022')).toBeInTheDocument()
  })
  it('Should not have magnolia font content', () => {
    const { queryByText } = setup({
      date: 'July 14, 2022',
      fontLoadingState: 'loading',
    })

    expect(queryByText('Actual fonts made by students')).toBeNull()
  })
  it('Should have magnolia font content', () => {
    const { queryByText } = setup({
      date: 'July 14, 2022',
      fontLoadingState: 'completed',
    })

    expect(queryByText('Actual fonts made by students')).toBeInTheDocument()
  })

  it('Should have 5 images', () => {
    const { getByTestId } = setup({
      date: 'July 14, 2022',
      fontLoadingState: 'loading',
    })
    const images = getByTestId('intro-header-fonts')
    expect(images.children).toHaveLength(5)
  })

  it('Should have title and tag line', () => {
    const { queryByText } = setup({
      date: 'July 14, 2022',
      fontLoadingState: 'loading',
    })

    expect(queryByText('Learn Font Making')).toBeInTheDocument()
    expect(queryByText('The proven step-by-step process to create professional and profitable hand lettered fonts.')).toBeInTheDocument()
  })

  it('Should have CTA', () => {
    const { queryByText } = setup({
      date: 'July 14, 2022',
      fontLoadingState: 'loading',
    })

    expect(queryByText('Sign up to get notified of the next public enrollment and take a free font making mini course while you wait!')).toBeInTheDocument()
  })

  it('Should have Form', () => {
    const { queryByText } = setup({
      date: 'July 14, 2022',
      fontLoadingState: 'loading',
      form: <div>Form</div>
    })

    expect(queryByText('Form')).toBeInTheDocument()
  })



})