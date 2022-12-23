import LazyImgix from '@App/components/images/lazyImgix'
import PaidProductPopUp from '@App/components/modals/paidProductPopUp'
import ProductModal from '@App/components/modals/productModal'
import useSite from '@App/hooks/useSite'
import { ArrowRightIcon } from '@heroicons/react/solid'
import { motion, useAnimation } from 'framer-motion'
import React from 'react'

interface Props {
  title: string
  description: string
  url?: string
  btnText: string
  external?: boolean
  product?: IProduct
}

const variants = {
  hover: {
    x: 10,
  },
  initial: {
    x: 0,
  }
};

function ResourceDownloadLink(props: Props) {
  const { title, description, btnText, external, url, product } = props
  const { openModal, closeModal } = useSite()

  function openProductModal() {
    product && openModal({
      template: <ProductModal
        closeModal={closeModal}
        product={product} />
    })
  }
  const controls = useAnimation();

  function handleMouseEnterControls() {
    controls.start("hover");
  }

  function handleMouseLeaveControls() {
    controls.start("initial");
  }

  return (

    <div className='tablet:flex-[1_0_47%]'>

      {/* CONTENT */}
      <div className='flex flex-col items-start'>

        {/* TITLE */}
        <div className='flex flex-col mb-4'>
          <h4 className='mb-1 text-base font-bold text-emerald-900'>
            {title}
          </h4>
          <p className='text-grey-500'>
            {description}
          </p>
        </div>

        {/* BUTTON */}
        <div className=''>
          {external && url && <motion.a
            onMouseEnter={handleMouseEnterControls}
            onMouseLeave={handleMouseLeaveControls}
            aria-label='Download Resource'
            rel='noopener noreferrer'
            target={'_blank'}
            className='flex flex-row items-center font-semibold text-tangerine-700'
            href={props.url}>
            <span>{btnText}</span>
            <motion.span
              variants={variants}
              animate={controls}
              className='relative flex w-4 ml-2'>
              <ArrowRightIcon fill={'currentColor'} />
            </motion.span>
          </motion.a>}

          {product &&
            <button
              onMouseEnter={handleMouseEnterControls}
              onMouseLeave={handleMouseLeaveControls}
              onClick={openProductModal}
              className='flex flex-row items-center font-semibold text-tangerine-700'>
              <span>View Item</span>
              <motion.span
                variants={variants}
                animate={controls}
                className='relative flex w-4 ml-2'>
                <ArrowRightIcon fill={'currentColor'} />
              </motion.span>
            </button>}
        </div>

      </div>

    </div>

  )
}

export default ResourceDownloadLink
