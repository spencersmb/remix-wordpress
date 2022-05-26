import { useEffect, useState } from "react";
import { LicenseEnum } from "@App/enums/products";

interface IState {
  price: number
  licenseType: LicenseEnum
  url: string
}
export function useProductLicense(productLicences: ILicense[] | null) {

  const firstLicense = productLicences ? {
    price: productLicences[0].price,
    licenseType: productLicences[0].licenseType,
    url: productLicences[0].url
  } : null

  const [state, setState] = useState<IState | null>(firstLicense)

  // onLoad Select first license
  // useEffect(() => {

  // }, [])

  const handleSelect = (item: { index: number, license: ILicense }) => {
    setState({
      price: item.license.price,
      licenseType: item.license.licenseType,
      url: item.license.url
    })
  }

  return {
    handleSelect,
    licenseState: state,
  }
}