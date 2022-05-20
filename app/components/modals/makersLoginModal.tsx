import { useFetcher } from "@remix-run/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import useSite from "~/hooks/useSite";
import useTuesdayMakersClientSideLogin from "~/hooks/useTuesdayMakersClientSideLogin";
import MakersLoginFetcherForm from "../forms/makersLoginFetcherForm";
import ModalLayoutWrapperWhite from "./modalWrapper-white";

interface IProps {
  closeModal: () => void
  openSignUpModal: () => void
}

const TuesdayMakersLoginModal = (props: IProps) => {
  const tuesdayMakersLogin = useFetcher();
  const { resourecLibraryLogin } = useSite()

  function formOnComplete(data: FetcherData | undefined) {

    if (data && data.user) {
      localStorage.setItem('makers_login', 'login' + Math.random());
      resourecLibraryLogin({ user: data.user })
    }
    if (data?.pass) {
      props.closeModal()
    }
  }

  function createAccount() {
    setTimeout(() => {
      props.openSignUpModal()
    }, 400)
    props.closeModal()
  }

  return (
    <ModalLayoutWrapperWhite
      className="bg-white">

      <div className="relative flex flex-col items-center px-3 mt-12">

        {/* CONTENT */}
        <div className="max-w-[300px] text-center mb-4">
          <h2 className="mb-4 text-5xl text-navy-700 font-sentinel__SemiBoldItal">
            Welcome Back!
          </h2>
          <p className="text-navy-900">
            The Tuesday Makers Library is constantly growing with new assets uploaded weekly.
          </p>
        </div>
      </div>

      {tuesdayMakersLogin.type === "done"
        && tuesdayMakersLogin.data
        && !tuesdayMakersLogin.data.pass &&
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          className="max-w-[300px] text-center ">
          <p className="pb-4 italic text-red-400">
            Sorry that email is not a current subscriber.
          </p>
        </motion.div>
      }
      <MakersLoginFetcherForm
        Form={tuesdayMakersLogin.Form}
        type={tuesdayMakersLogin.type}
        state={tuesdayMakersLogin.state}
        data={tuesdayMakersLogin.data}
        onComplete={formOnComplete}
      />

      <div className="mt-4 text-center text-navy-900">
        Not a subscriber? <button className="font-semibold underline text-navy-700 underline-offset-4" type='button' onClick={createAccount}>Create an account!</button>
      </div>
    </ModalLayoutWrapperWhite>
  )
}

export default TuesdayMakersLoginModal

function resourecLibraryLogin(arg0: { user: any; }) {
  throw new Error("Function not implemented.");
}
