import React from 'react'
import GumroadProductCard from '../products/gumroadProductCard'
import LicenseSelectSection from '../products/licenseSelectSection'
import ModalLayoutWrapperWhite from './modalWrapper-white'

interface Props {
  closeModal: () => void
  product: IProduct
}

// TODO: TEST THIS
function ProductModal(props: Props) {
  const { product } = props
  return (
    <GumroadProductCard
      key={product.slug}
      product={product}
    />
  )
}

export default ProductModal
