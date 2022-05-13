import { useEffect, useRef, useState } from "react";
import { LicenseEnum } from "~/enums/products";
import useFontPreview from "~/hooks/useFontPreivew";
import { ISetFontFunction } from "~/hooks/useFonts";
import { useProductLicense } from "~/hooks/useProductLicense";
import { getLicense } from "~/utils/posts";
import LicenseRadioSelect from "../forms/licenseRadioSelect";
import SelectBox from "../forms/licenseSelectDropdown";
import LicenseSelectSection from "./licenseSelectSection";

interface IProps {
  product: IProduct
}

const GumroadProductCard = ({ product }: IProps) => {
  const { fontPreviewState, addFontToPreview } = useFontPreview()
  const hasFont = Boolean(product.details.font.name)

  return (
    <div key={product.slug}>
      {product.title}

      <LicenseSelectSection
        product={product}
        addFontToPreview={addFontToPreview}
      />

    </div>
  )
}

export default GumroadProductCard