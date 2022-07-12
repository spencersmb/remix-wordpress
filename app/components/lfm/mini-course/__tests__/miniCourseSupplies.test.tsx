import { renderUi } from "@TestUtils/renderUtils"
import MiniCourseSupplies from "../miniCourseSupplies"

describe('LFM:MiniCourse Video Links', () => {
  const setup = () => renderUi(<MiniCourseSupplies />)
  it('Should have 3 Category Titles with correct titles', () => {
    const { queryByText } = setup()
    expect(queryByText('Software')).toBeTruthy()
    expect(queryByText('Mockup Websites')).toBeTruthy()
    expect(queryByText('Supplies')).toBeTruthy()
  })
  it('Should have 3 Lists of links with correct items', () => {
    const { getAllByTestId } = setup()
    const lists = getAllByTestId('category-list')
    const list1 = lists[0]
    const list2 = lists[1]
    const list3 = lists[2]
    expect(lists).toHaveLength(3)
    expect(list1.querySelectorAll('li')).toHaveLength(6)
    expect(list2.querySelectorAll('li')).toHaveLength(4)
    expect(list3.querySelectorAll('li')).toHaveLength(5)
  })
  it('Should have correct link with text and url', () => {
    const { queryByText } = setup()
    const link: HTMLLinkElement | null = queryByText('Adobe Illustrator')
    if (!link) throw new Error('No link found')
    expect(link.href).toBe('https://www.adobe.com/downloads.html')
  })
})