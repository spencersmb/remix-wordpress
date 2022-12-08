import { formatDate } from "@App/utils/posts"
import { mockSearchPost } from "@TestUtils/mock-data/posts"
import { renderUi } from "@TestUtils/renderUtils"
import { MemoryRouter } from "react-router"
import SmallPostCard from "../smallPostCard"

describe('SmallPostCard test', () => {
  const setup = (props: any) => renderUi(
    <MemoryRouter>
      <SmallPostCard {...props} />
    </MemoryRouter>
  )
  it('Link should have correct URL', () => {
    const { getByTestId } = setup({
      post: mockSearchPost
    })
    const link = getByTestId('small-post-card')
    expect(link.getAttribute('href')).toBe(`/${mockSearchPost.slug}`)
  })

  it.skip('img should have correct Source Url', () => {
    const { getByTestId } = setup({
      post: mockSearchPost
    })
    const img = getByTestId('small-post-card-image')

    // Selects the medium image
    expect(img.getAttribute('src')).toBe(mockSearchPost.featuredImage?.node?.mediaDetails.sizes[6].sourceUrl)
  })

  it('Should have correct date and title', () => {
    const { queryByText } = setup({
      post: mockSearchPost
    })
    const date = queryByText(formatDate(mockSearchPost.date))
    const title = queryByText(mockSearchPost.title)
    expect(date).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })
})