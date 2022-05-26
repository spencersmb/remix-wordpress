import ReactDOM from "react-dom"
import InputBase from "../inputBase"
import { createRoot } from 'react-dom/client';
import { root } from "postcss";
import { fireEvent, render, screen } from "@testing-library/react";

/**
 * @jest-environment jsdom
 */

const setup = (props: any) => {
  render(<InputBase {...props} />)
  const input = screen.getByTestId('test-id')
  return {
    input
  }
}

const props = {
  id: 'test-id',
  name: 'test-name',
  type: 'text',
  placeholder: 'spencer',
  value: 'test-value',
  onChange: () => { },
  invalid: false
}

const disabledProps = {
  ...props,
  disabled: true
}
describe('InputBase Component', () => {
  test('Should have the correct props', () => {

    const { input } = setup(props)
    expect(input).toBeVisible()
    expect(input).toHaveProperty('name', 'test-name')
    expect(input).toHaveProperty('placeholder', 'spencer')
    expect(input).toHaveProperty('type', 'text')
    expect(input).toHaveValue('test-value')

    fireEvent.click(input, { target: { value: '23' } })
    expect(input).toHaveValue('23')
  })

  test('Should be disabled', () => {
    const { input } = setup(disabledProps)
    expect(input).toBeDisabled()
  })
})
