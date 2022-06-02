import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import MakersFetcherWrapper from "../forms/layout/makersFetcherConfirmationWrapper";
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
      className="bg-white">
      {/* @ts-ignore */}
      <AnimatePresence>
        {showConfirmation &&
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="relative flex flex-col items-center px-3 mt-12">

            {/* ICON */}
            <div className="relative rounded-xl bg-navy-100 w-[57px] h-[58px] px-3 flex justify-center items-center mb-2">
              <div className="text-navy-50 font-medium text-sm text-center absolute w-[22px] h-[22px] top-[-11px] right-[-11px] rounded-[4px] bg-navy-700">1</div>
              <svg viewBox="0 0 34 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.7" y="7" width="34" height="22" rx="5" fill="#879ABD" />
                <g style={{
                  mixBlendMode: "multiply"
                }} opacity="0.7">
                  <path d="M1.48941 4.18765C0.229481 2.92772 1.12181 0.773438 2.90362 0.773438H16.8491H30.7945C32.5763 0.773438 33.4686 2.92772 32.2087 4.18765L18.2633 18.1331C17.4822 18.9141 16.2159 18.9141 15.4348 18.1331L1.48941 4.18765Z" fill="#ECC06F" />
                </g>
              </svg>
            </div>

            {/* CONTENT */}
            <div className="max-w-[300px] text-center mb-8">
              <h2 className="mb-4 text-5xl text-navy-700 font-sentinel__SemiBoldItal">
                Success!
              </h2>
              <p className="text-navy-900">
                Check your email and click the link inside to confirm your new account.
              </p>
            </div>

            <div>
              <button className="btn" onClick={closeModal}>Got it!</button>
            </div>

          </motion.div>}
        {!showConfirmation &&
          <>
            <div className="max-w-[372px] text-center mb-8">
              <h2 className="mt-8 max-w-[360px] mx-auto mb-4 text-5xl text-navy-700 font-sentinel__SemiBoldItal">
                Join the Tuesday Makers
              </h2>
              <p className="text-navy-900 max-w-[360px]">
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

