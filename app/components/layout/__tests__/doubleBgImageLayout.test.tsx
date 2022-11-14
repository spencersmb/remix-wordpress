/**
 * @jest-environment jsdom
*/
import { render, screen } from "@testing-library/react"
import { renderUi } from "@TestUtils/renderUtils";
import DoubleBgImageLayout from "../doubleBgImageLayout"

describe('DoubleBgImageLayout', () => {

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

  const setup = (props: any = {}) => {
    return renderUi(<DoubleBgImageLayout {...props} />)
  }

  it('Should have 2 Bg Images', () => {
    const { queryAllByTestId } = setup()
    expect(queryAllByTestId('bgImage')).toHaveLength(2)
  })

  it('Should have Tuesday Makers Text', () => {
    const { queryByText } = setup()
    expect(queryByText('Tuesday Makers')).toBeVisible()
  })

  it('Should have form children', () => {
    const { queryByText } = setup({
      form: <div>Form</div>
    })
    expect(queryByText('Form')).toBeVisible()
  })
})