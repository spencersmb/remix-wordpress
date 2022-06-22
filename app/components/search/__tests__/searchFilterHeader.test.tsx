import { fireEvent, render, screen } from "@testing-library/react"
import SearchFilterHeader from "../searchFilterHeader"

describe('Search Filter Header', () => {
  const closeCategory = jest.fn()
  const handleSetCategory = jest.fn()
  handleSetCategory.mockImplementation((key: string) => () => { return key })
  const defaultProps = {
    category: null,
    closeCategory,
    handleSetCategory
  }
  const setup = (props: any) => {
    render(<div data-testid="parent">
      <SearchFilterHeader {...props} />
    </div>)
  }

  it('Should Have Filter by Skill level text', () => {
    setup(defaultProps)
    expect(screen.getByText(/Filter by Skill level/i)).toBeTruthy()
  })

  it('Should not show clear category btn', () => {
    setup(defaultProps)
    expect(screen.queryByText(/Clear/i)).toBeNull()
  })

  it('Should Show 3 pills and call handleCategoryClick with correct key', () => {
    setup(defaultProps)
    const pills = screen.getAllByTestId('pillTest')
    const pillOne = pills[0]
    expect(pills).toHaveLength(3)
    fireEvent.click(pillOne)
    expect(handleSetCategory).toHaveBeenCalledWith('Beginner')
  })

  it('Should show clear category btn and handle clearCat click', () => {
    setup({ ...defaultProps, category: 'Beginner' })
    const clearText = screen.queryByText(/Clear/i)
    const btn = clearText?.parentElement
    expect(clearText).toBeVisible()

    if (btn) {
      fireEvent.click(btn)
      expect(closeCategory).toHaveBeenCalled()
    }
  })
})