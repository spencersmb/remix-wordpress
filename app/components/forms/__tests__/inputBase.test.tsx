import type { BoundFunctions } from "@testing-library/dom";
import { queries, getQueriesForElement } from "@testing-library/dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderUi } from "@TestUtils/renderUtils";
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

let handleChange = jest.fn()

const props = {
  id: 'test-id',
  name: 'test-name',
  type: 'text',
  placeholder: 'spencer',
  className: 'custom-class',
  value: 'test-value',
  onChange: handleChange,
  invalid: false,
  label: 'Test Label',
}

const disabledProps = {
  ...props,
  disabled: true
}

const labelProps: InputBaseProps = {
  ...props,
  id: 'favorite-number',
  type: 'number',
  label: 'Favorite Numbers',
  placeholder: 'Enter Number',
  className: 'custom-class',

}

describe('InputBase Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders an input with label "Favorite Numbers', () => {

    // New way that is more efficient when dealing with multiple elements
    // const input = queries.getByLabelText(parent, /favorite Numbers/i)
    // const { getByLabelText } = getQueriesForElement(parent)
    const { getByLabelText } = renderUi(<InputBase {...labelProps} />)
    const input = getByLabelText(/favorite Numbers/i)
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'number')
  })

  test('Should render the correct props', () => {
    const { getByLabelText } = renderUi(<InputBase {...props} />)
    const input = getByLabelText(/Test Label/i)
    expect(input).toBeVisible()
    expect(input).toHaveProperty('name', 'test-name')
    expect(input).toHaveProperty('placeholder', 'spencer')
    expect(input).toHaveProperty('type', 'text')
    expect(input).toHaveProperty('id', 'test-id')
    expect(input).toHaveProperty('required', false)
    expect(input).toHaveProperty('disabled', false)
    // expect(input).toHaveAttribute('aria-label', 'Test Label')
    expect(input).not.toHaveProperty('aria-describedby')
    expect(input).toHaveValue('test-value')
    expect(input).toHaveClass('custom-class')
    expect(input).toBeValid()

    fireEvent.click(input, { target: { value: '23' } })
    expect(input).toHaveValue('23')
  })

  test('HandleClick event should be called 1 time', () => {
    const { getByLabelText } = renderUi(<InputBase {...props} />)
    const input = getByLabelText(/Test Label/i)
    fireEvent.change(input, { target: { value: '23' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test('Should be disabled', () => {
    const { input } = setup(disabledProps)
    expect(input).toBeDisabled()
  })

  test('Should be invalid', () => {
    const invalid = {
      ...props,
      invalid: true
    }
    const { getByLabelText } = renderUi(<InputBase {...invalid} />)
    const input = getByLabelText(/Test Label/i)
    expect(input).toHaveAttribute('aria-describedby', 'test-id-error')

  })

  test('Should be required', () => {
    const required = {
      ...props,
      required: true
    }
    const { getByLabelText } = renderUi(<InputBase {...required} />)
    const input = getByLabelText(/Test Label/i)
    expect(input).toHaveProperty('required', true)
  })

  test('Should have default value', () => {
    const required = {
      id: 'test-id',
      name: 'test-name',
      type: 'text',
      placeholder: 'spencer',
      className: 'custom-class',
      onChange: handleChange,
      invalid: false,
      label: 'Test Label',
      defaultValue: 'Star Wars'
    }
    const { getByLabelText } = renderUi(<InputBase {...required} />)
    const input = getByLabelText(/Test Label/i)
    expect(input).toHaveValue('Star Wars')
  })

})
