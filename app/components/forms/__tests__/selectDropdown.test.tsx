import { fireEvent, queryByLabelText, screen } from "@testing-library/react";
import { renderUi } from "@TestUtils/renderUtils";
import SelectDropdown from "../dropdown/selectDropdown";

describe('License Select Dropdown', () => {
  const setFilter = jest.fn();
  const defaultProps = {
    setFilter,
    selected: { name: "All", slug: 'all' },
    items: [
      { name: "All", slug: 'all' },
      {
        name: 'Procreate Drawing',
        slug: 'procreate-drawing'
      },
      {
        name: 'Photoshop',
        slug: 'photoshop'
      }
    ]
  }
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have ALL selected', () => {
    const { getByRole } = renderUi(<SelectDropdown {...defaultProps} />)
    const button = getByRole(/button/i)
    expect(button).toHaveTextContent('All')
  })

  it('should call setFilter', () => {
    const { getByTestId, queryByRole } = renderUi(<SelectDropdown {...defaultProps} />)
    const button = getByTestId('filterClick')
    if (button.firstChild)
      fireEvent.click(button.firstChild)
    const listbox = queryByRole('listbox')
    if (listbox) {
      fireEvent.click(listbox.children[1])
      expect(setFilter).toHaveBeenCalled()
    }
  })

})