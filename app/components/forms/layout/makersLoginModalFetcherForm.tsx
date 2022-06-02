import useSite from "@App/hooks/useSite";
import { useFetcher } from "@remix-run/react";
import { motion } from "framer-motion";
import MakersLoginFetcherForm from "./makersLoginFetcherForm";

const MakersLoginForm = (props: any) => {
  const { resourecLibraryLogin } = useSite()

  const tuesdayMakersLogin = useFetcher();

  function formOnComplete(data: FetcherData | undefined) {

    if (data && data.user) {
      localStorage.setItem('makers_login', 'login' + Math.random());
      resourecLibraryLogin({ user: data.user })
    }
    if (data?.pass) {
      props.closeModal()
    }
  }

  return (
    <>
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
    </>
  )
}

export default MakersLoginForm