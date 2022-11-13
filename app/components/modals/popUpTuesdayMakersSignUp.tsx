import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import MakersFetcherWrapper from "../forms/layout/makersFetcherConfirmationWrapper";
import EnvelopeFlowers from "../svgs/florals/envelopeFlowers";
import ModalLayoutWrapperWhite from "./modalWrapper-white";

interface IProps {
  closeModal: () => void
}
/**
 * @Component TuesdayMakersSignUpModal
 * @tested - 6/2/2022
 * 
 * Tuesday Makers sign up modal with confirmation using CK form and useFetcher
 *
 */
const TuesdayMakersSignUpModal = ({ closeModal }: IProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  function test() {
    setShowConfirmation(!showConfirmation);
  }

  return (
    <ModalLayoutWrapperWhite
      data-testid="test-tuesdayMakersSignUpModal"
      showFlorals={!showConfirmation}
      closeModal={closeModal}
      className="bg-white">
      {/* @ts-ignore */}
      <AnimatePresence>
        {showConfirmation &&
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

          </motion.div>}
        {!showConfirmation &&
          <>
            <div className="max-w-[372px] text-center mb-8">
              <h2 className="mt-8 max-w-[360px] mx-auto mb-4 text-5xl text-grey-600 font-sentinel__SemiBoldItal">
                Join Tuesday Makers
              </h2>
              <p className="text-grey-600 max-w-[360px] text-lg">
                Get access to all the tutorial downloads for free. Plus, access our incredible library with over 200 assets!
              </p>
            </div>
            {process.env.NODE_ENV !== 'test' &&
              <MakersFetcherWrapper
                setConfirmation={setShowConfirmation}
              />}

          </>}
      </AnimatePresence>
      {process.env.NODE_ENV === 'test' && <button onClick={test}>Test Animation</button>}
    </ModalLayoutWrapperWhite>
  )
}

export default TuesdayMakersSignUpModal

