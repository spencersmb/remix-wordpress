export function getStandardLicense(product: IProduct): ILicense{
  const licenses = product.details.licences || []
  return licenses.reduce((previousValue: any, currentValue: any) => {
    if(currentValue.licenseType === 'standard'){
      return currentValue
    }
  },{})
}

export function getProductStdPrice (product: IProduct, shopPlatform: string): number{

  if(shopPlatform === 'sendowl'){
    return 0
  }

  // default is gumroad
  const productLic = getStandardLicense(product)
  return productLic.price ? productLic.price : 0

}