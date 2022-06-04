import { siteInitialState } from "@App/hooks/useSite"
import UseSiteProvider from "@App/hooks/useSite/useSiteProvider"
import { render, screen } from "@testing-library/react"
import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { MemoryRouter } from "react-router-dom"
import ProductCardSM from "../productCard--sm"

describe('Product Card SM', () => {
  const defualtProps = {
    index: 1,
    product: mockPaidProduct,
    multipleProducts: false
  }
  const setup = (props: any = {}) => {
    const setupProps = { ...defualtProps, ...props }
    render(
      <MemoryRouter>
        <UseSiteProvider defaultState={siteInitialState}>
          <ProductCardSM {...setupProps} />
        </UseSiteProvider>
      </MemoryRouter>
    )
    return {
      card: screen.getByTestId('ProductCard__sm')
    }
  }

  //license-radio
  it('Should have correct css for first item and multiple products', () => {
    const { card } = setup({
      index: 0,
      multipleProducts: true
    })
    expect(card).toHaveClass('tablet:mr-4')
  })

  it('Should have correct css for 2nd item and multiple products', () => {
    const { card } = setup({
      index: 1,
      multipleProducts: true
    })
    expect(card).toHaveClass('tablet:ml-4')
  })

  it('Should have correct css for single product', () => {
    const { card } = setup()
    expect(card).toHaveClass('tablet:ml-4')
  })

  it('Should show product title', () => {
    const { card } = setup()
    expect(card).toHaveTextContent('Beautiful Lettering Brush Set')
  })

  it('Should show License Select component', () => {
    const { card } = setup()
    expect(card).toHaveTextContent('License Type')
    expect(card).toHaveTextContent('Buy Now')
  })

  it('Should not License Select component', () => {
    const { card } = setup({
      product: {
        ...mockPaidProduct,
        productDetails: {
          licenses: []
        }
      }
    })
    expect(card).not.toHaveTextContent('Buy Now')
  })
})