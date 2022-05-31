import { LicenseEnum } from "@App/enums/products";
import { screen } from "@testing-library/react";
import { mockFeaturedImage } from "@TestUtils/mock-data/images";
import { mockPaidProduct } from "@TestUtils/mock-data/products";
import { renderUi } from "@TestUtils/renderUtils";
import LicenseRadioSelect from "../radio/licenseRadioSelect"

describe('License Radio Group', () => {
  const handleSelected = jest.fn();
  const defaultProps = {
    product: {
      ...mockPaidProduct
    },
    handleSelected,
    state: {
      licenseType: LicenseEnum.STANDARD,
      price: 12,
      url: 'https://google.com'
    }
  }
  const noLicenseprops = {
    product: {
      ...mockPaidProduct,
      productDetails: {
        font: {
          name: "Arial",
        },
        title: "Beautiful Lettering Brush Set",
        productContent: {
          description: "desc",
          productfeatureimage: {
            ...mockFeaturedImage
          },
          subtitle: "subtitle",
        },
        youtube: {
          url: ''
        },
      }
    },
    handleSelected,
    state: {
      licenseType: LicenseEnum.STANDARD,
      price: 12,
      url: 'https://google.com'
    }
  }
  it('Should render No Licenses Available', () => {

    // @ts-ignore
    const { parent } = renderUi(<LicenseRadioSelect {...noLicenseprops} />)
    // const noLicenses = getByText(/No Licenses Available/i)
    expect(parent).toHaveTextContent('No Licenses Available')
  })

  it('Should render 2 Licenses', () => {

    // @ts-ignore
    const { getAllByRole, getByLabelText } = renderUi(<LicenseRadioSelect {...defaultProps} />)
    const inputs = getAllByRole('button')
    const extended = getByLabelText(/Extended \$30/i)
    const standard = getByLabelText(/Standard \$15/i)
    expect(inputs).toHaveLength(2)
    expect(extended).toBeInTheDocument()
    expect(standard).toBeInTheDocument()
  })
})
