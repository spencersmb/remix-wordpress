import { LicenseEnum, ShopPlatformEnum } from "@App/enums/products"
import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { getLicense } from "../posts"
import { getProductStdPrice } from "../productPageUtils"

describe('Utils: Product Page', () => {
  it('Should show product price of zero', () => {
    const productPrice = getProductStdPrice(mockPaidProduct, ShopPlatformEnum.SENDOWL)
    expect(productPrice).toBe(0)
  })
  it('Should show product price', () => {
    const productPrice = getProductStdPrice(mockPaidProduct, ShopPlatformEnum.GUMROAD)
    const standardLicense = getLicense(mockPaidProduct.productDetails.licences, LicenseEnum.STANDARD)
    if(standardLicense){
      expect(productPrice).toBe(standardLicense.price)
    }
  })
})