import { useEffect, useState } from "react";

export function useProductLicense(productLicences: ILicense[] | null) {

  const firstLicense = productLicences && productLicences.length > 0 ? {
    price: productLicences[0].price,
    licenseType: productLicences[0].licenseType,
    url: productLicences[0].url
  } : null

  const [state, setState] = useState<useProductLicenseState | null>(firstLicense)

  // onLoad Select first license
  // useEffect(() => {
  // const script = document.querySelector('#remix-gumroad-script');
  // script?.addEventListener('load', function (e: any) {
  //   console.log('loaded', window.GumroadOverlay);
  // });

  // }, [])

  const handleSelect = async (item: { index: number, license: ILicense }) => {
    if (!window.GumroadOverlay) return
    let lastItem = state
    setState({
      price: item.license.price,
      licenseType: item.license.licenseType,
      url: item.license.url
    })

    // if (lastItem?.url !== item.license.url) {
    //   await window.GumroadOverlay.resetLinks()
    //   await window.GumroadOverlay.reload()
    // }
  }

  return {
    handleSelect,
    licenseState: state,
  }
}