import ReactDOM from "react-dom"
import { fireEvent, render, screen } from "@testing-library/react";
import PaidProducts from "../tutorialContent/paidProducts";
import renderer from 'react-test-renderer';
import { mockPostData, mockTutorailManager__default, mockTutorailManager__withPaidProducts } from "@TestUtils/mock-data/posts";

describe('paidProduct Test', () => {

  /**
 * @jest-environment jsdom
 */

  test('PaidProducts component renders correctly', () => {
    const tree = renderer
      .create(<PaidProducts post={mockPostData} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Shows zero paid products', () => {
    render(<PaidProducts post={mockPostData} />)
    const element = screen.getByTestId('test-paidProduct')
    expect(element).toBeInTheDocument()
    expect(element.innerHTML).toBeFalsy()
  })

  it('Should show color palette V', () => {
    render(<PaidProducts post={{
      ...mockPostData,
      tutorialManager: {
        ...mockTutorailManager__default
      }
    }} />)
    const colorPaletteH = screen.getByTestId('test-colorSwatch')
    expect(colorPaletteH).toHaveClass('swatch_vertical')
  })

  it('Should show color palette H', () => {
    render(<PaidProducts post={{
      ...mockPostData,
      tutorialManager: {
        ...mockTutorailManager__withPaidProducts
      }
    }} />)
    const colorPaletteH = screen.getByTestId('test-colorSwatch')
    expect(colorPaletteH).toHaveClass('swatch_horizontal')
  })
})