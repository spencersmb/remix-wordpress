import { queries, getQueriesForElement } from "@testing-library/dom";
import { fireEvent, render, screen } from "@testing-library/react";
import InputBase from "../input/inputBase";

/**
 * @jest-environment jsdom
 */

const setup = (props: any) => {
  render(<div data-testid="parent">
    <InputBase {...props} />
  </div>)
  const input = screen.getByTestId(props.id)
  return {
    input,
    parent: screen.getByTestId('parent')
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

const labelProps = {
  ...props,
  id: 'favorite-number',
  type: 'number',
  label: 'Favorite Numbers'

}
describe('InputBase Component', () => {

  test('renders an input with label "Favorite Numbers', () => {
    const { parent } = setup(labelProps)
    // const label = parent.querySelector('label')
    // const input = queries.getByLabelText(parent, /favorite Numbers/i)
    const { getByLabelText } = getQueriesForElement(parent)
    const input = getByLabelText(/favorite Numbers/i)
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'number')
  })

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
