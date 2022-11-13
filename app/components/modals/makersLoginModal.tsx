import { useFetcher } from "@remix-run/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import useSite from "@App/hooks/useSite";
import useTuesdayMakersClientSideLogin from "@App/hooks/useTuesdayMakersClientSideLogin";
import MakersLoginFetcherForm from "../forms/layout/makersLoginFetcherForm";
import ModalLayoutWrapperWhite from "./modalWrapper-white";
import MakersLoginForm from "../forms/layout/makersLoginModalFetcherForm";

interface IProps {
  closeModal: () => void
  openSignUpModal: () => void
}
/**
 * @Component TuesdayMakersLoginModal
 * @tested - 5/31/2022
 * 
 * A modal to log users into Tuesday Makers
 *
 *
 */
const TuesdayMakersLoginModal = (props: IProps) => {

  function createAccount() {
    setTimeout(() => {
      props.openSignUpModal()
    }, 400)
    props.closeModal()
  }

  return (
    <ModalLayoutWrapperWhite
      closeModal={props.closeModal}
      data-testid="test-tuesdayMakersLoginModal"
      showFlorals={true}
      className="bg-white">

      <div className="relative flex flex-col items-center px-3 mt-12">

        {/* CONTENT */}
        <div className="max-w-[300px] text-center mb-4">
          <h2 className="mb-4 text-5xl text-sage-700 font-sentinel__SemiBoldItal">
            Welcome Back!
          </h2>
          <p className="text-grey-700">
            The Tuesday Makers Library is constantly growing with new assets uploaded weekly.
          </p>
        </div>
      </div>

      {process.env.NODE_ENV !== 'test' && <MakersLoginForm closeModal={props.closeModal} />}

      <div className="mt-4 text-center text-grey-700">
        Not a subscriber? <button className="font-semibold underline text-sage-600 underline-offset-4 hover:text-sage-500" type='button' onClick={createAccount}>Create an account!</button>
      </div>
    </ModalLayoutWrapperWhite>
  )
}

export default TuesdayMakersLoginModal

// function resourecLibraryLogin(arg0: { user: any; }) {
//   throw new Error("Function not implemented.");
// }

