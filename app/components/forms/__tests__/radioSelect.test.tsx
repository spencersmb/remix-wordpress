import { LicenseEnum } from "@App/enums/products";
import { fireEvent } from "@testing-library/react";
import { renderUi } from "@TestUtils/renderUtils";
import SelectRadio from "../radio/radioSelect";

describe('Radio Select for License Select Group', () => {
  const handleSelected = jest.fn();
  const defaultProps = {
    index: 1,
    name: 'License',
    license: {
      licenseType: LicenseEnum.STANDARD,
      url: 'https://google.com',
      price: 12
    },
    checked: false,
    handleSelected
  }

  const checkedProps = {
    ...defaultProps,
    checked: true
  }

  it('Should have type Radio', () => {
    const { getByLabelText } = renderUi(<SelectRadio {...defaultProps} />)
    const input = getByLabelText(/Standard \$12/i)

    expect(input).toHaveProperty('type', 'radio')
    expect(input).toHaveProperty('name', 'radio-License')
    expect(input).toHaveProperty('id', 'box1-License')
  })

  it('Should have checked property', () => {
    const { getByLabelText } = renderUi(<SelectRadio {...checkedProps} />)
    const input = getByLabelText(/Standard \$12/i)
    expect(input).toHaveProperty('checked', true)
  })

  it('Should call handleSelected on click', () => {
    const { getByLabelText } = renderUi(<SelectRadio {...defaultProps} />)
    const input = getByLabelText(/Standard \$12/i)
    fireEvent.click(input)
    expect(handleSelected).toHaveBeenCalledWith({
      index: 1,
      license: {
        ...defaultProps.license,
      }
    })
  })
})