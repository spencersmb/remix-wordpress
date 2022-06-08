import type { ShopPlatformEnum } from "@App/enums/products";
import { LicenseEnum } from "@App/enums/products"
import { getLicense } from "./posts"

/**
 * @function getProductStdPrice
 * @tested - 6/7/2022
 * @description Get the standard Price of a product license
 * 
 *
 *
 **/
export function getProductStdPrice (product: IProduct, shopPlatform: ShopPlatformEnum): number{

  if(shopPlatform === 'sendowl'){
    return 0
  }

  // default is gumroad
  const productLic = getLicense(product.productDetails.licences, LicenseEnum.STANDARD)
  return productLic ? productLic.price : 0

} 