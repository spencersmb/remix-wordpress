import { useEffect, useRef, useState } from "react";
import { LicenseEnum } from "~/enums/products";
import { ISetFontFunction } from "~/hooks/useFonts";
import { useProductLicense } from "~/hooks/useProductLicense";
import { getLicense } from "~/utils/posts";
import LicenseRadioSelect from "../forms/licenseRadioSelect";
import SelectBox from "../forms/licenseSelectDropdown";

interface IProps {
  product: IProduct
  previewFontHanlder: ISetFontFunction
}



const GumroadProductCard = ({ product, previewFontHanlder }: IProps) => {
  const hasFont = Boolean(product.details.font.name)
  const { licenseState, handleSelect } = useProductLicense(product.details.licences)

  return (
    <div key={product.slug}>
      {product.title}
      <div>
        {licenseState && <div>
          {/* {product.details.licences &&
            <SelectBox
              handleSelected={handleSelect}
              selected={licenseState.licenseType}
              data={product.details} />} */}
          <LicenseRadioSelect
            product={product}
            state={licenseState}
            handleSelected={handleSelect} />
        </div>}

      </div>
      {/* PRODUCT SELECT */}
      {licenseState && <div>
        <div>
          price: ${licenseState.price}
        </div>
      </div>}

      {/* FONT PREVIEW  */}
      <div>
        {hasFont && <button onClick={previewFontHanlder(product.details.font.name)}>Preview Font</button>}
      </div>

      {/* PRODUCT BUY NOW */}
      {licenseState && <a href={licenseState.url}>
        <span>Buy Now</span>
      </a>}
    </div>
  )
}

export default GumroadProductCard