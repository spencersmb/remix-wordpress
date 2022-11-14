import { AnimatePresence, motion } from 'framer-motion'
import EnvelopeFlowers from '../svgs/florals/envelopeFlowers'
import ModalLayoutWrapperWhite from './modalWrapper-white'

interface Props {
  closeModal: () => void
  message: string
}

// TODO: TEST THIS
function SignUpSuccess(props: Props) {
  const { closeModal, message } = props

  return (
    <ModalLayoutWrapperWhite
      data-testid="test-tuesdayMakersSignUpModal"
      showFlorals={true}
      closeModal={closeModal}
      className="bg-white">
      {/* @ts-ignore */}
      <AnimatePresence>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          className="relative flex flex-col items-center mt-12">

          {/* ICON */}
          <div className="relative mb-2 max-w-[200px] w-full">
            <EnvelopeFlowers />
          </div>

          {/* CONTENT */}
          <div className="max-w-[330px] text-center mb-8">
            <h2 className="mb-4 text-5xl text-grey-600 font-sentinel__SemiBoldItal">
              Success!
            </h2>
            <p className="text-lg text-grey-600">
              Check your email and click the link inside to confirm your new account.
            </p>
          </div>

          <div>
            <button className="btn btn-primary btn-xl" onClick={closeModal}>
              Got it!
            </button>
          </div>

        </motion.div>
      </AnimatePresence>
    </ModalLayoutWrapperWhite>
  )
}

export default SignUpSuccess
