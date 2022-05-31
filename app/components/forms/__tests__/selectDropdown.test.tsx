import { renderUi } from "@TestUtils/renderUtils";
import SelectDropdown from "../dropdown/selectDropdown";

describe('License Select Dropdown', () => {
  const setFilter = jest.fn();
  const defaultProps = {
    setFilter,
    selected: { name: "All", slug: 'all' },
    items: [
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

})