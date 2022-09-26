import LazyImageBase from '@App/components/images/lazyImage-base'
import LicenseSelectSection from '@App/components/products/licenseSelectSection'
import { ImageSizeEnums } from '@App/enums/imageEnums'
import { classNames } from '@App/utils/appUtils'
import { defaultImages, loadImageSrc } from '@App/utils/imageHelpers'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { motion } from 'framer-motion'
import React from 'react'

interface Props {
  index: number
  product: IProduct
  description?: string
  selected?: boolean
  handleClick: ({ index, product }: { index: number | null, product: IProduct | null }) => void
}

function ResourceProduct(props: Props) {
  const { description, index, product, selected, handleClick } = props

  const handleButtonClick = (e: any) => {
    if (!selected) {
      handleClick({ index, product })
    }
  }

  const close = () => {
    if (selected) {
      handleClick({ index: null, product: null })
    }
  }

  const handleSecond = (e: any) => {
    e.stopPropagation();
    console.log('click');
  }

  const productImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.WP_THUMBNAIL,
    imageObject: product.featuredImage.node,
    fallbackSize: ImageSizeEnums.MEDIUM,
    fallbackImage: defaultImages.thumbnail
  })

  return (

    <div
      onClick={handleButtonClick}
      className={classNames(selected ? 'bg-grey-100 hover:bg-grey-100' : 'hover:bg-grey-100 hover:cursor-pointer', 'group tr-wrapper tablet:!items-start')}>

      <div className='tr-index font-bonVivant font-swap'>
        0{index + 1}
      </div>

      {/* CONTENT */}
      <div className='flex-[2] flex-col flex tablet:flex-row tablet:items-center tablet:max-w-[400px] laptop:max-w-[450px]'>

        {/* IMAGE */}
        <div className='tr-imageWrapper'>
          <div className='relative transition-all duration-300 tr-imageWrapper--inner group-hover:border-gray-600'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[66px]'>
              <LazyImageBase
                testId='feature-image'
                id={`resource-course-${props.index}`}
                image={productImage}
                disableSrcSet={true}
              />
            </div>
          </div>
        </div>

        {/* TITLE */}
        <div className='flex flex-col tablet:flex-[1.5]'>
          <div className='tr-title font-sentinel__SemiBoldItal laptop:text-2xl'>
            {product.title}
          </div>
          <p className='text-sm laptop:text-base'>
            {description}
          </p>
        </div>

      </div>

      {/* BUTTON */}
      <div className='flex tablet:flex-[1] tablet:justify-end tablet:items-center tablet:mt-0 tablet:ml-0 '>
        <button
          aria-label='toggle product details'
          onClick={close}
          className={classNames(selected ? '' : ' group-hover:border-gray-600', 'btn btn-sm btn-outlineFill')}>
          <ChevronDownIcon
            className={`${selected ? 'rotate-180' : ''}
                  h-5 w-5 text-success-700 group-hover:fill-sage-700 transition ease-in-out duration-300`}
            aria-hidden="true"
          />
        </button>
      </div>

      <motion.div
        className='flex flex-[1_0_100%] bg-grey-100 overflow-hidden'
        key={`product-${index}`}
        variants={variants}
        initial='hidden'
        animate={selected ? "visible" : "hidden"}
      >
        <div className='flex flex-1 py-4 max-w-[450px] mx-auto'>
          <LicenseSelectSection product={product} />
        </div>
      </motion.div>

    </div>

  )
}

export default ResourceProduct

const variants = {
  initial: {
    opacity: 0,
    height: 0,
  },
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: 'auto',
  }
}
