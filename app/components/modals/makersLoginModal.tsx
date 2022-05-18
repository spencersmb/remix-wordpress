import { useFetcher } from "@remix-run/react";
import useSite from "~/hooks/useSite";
import MakersLoginFetcherForm from "../forms/makersLoginFetcherForm";

interface IProps {
  closeModal: () => void
}

const TuesdayMakersLoginModal = (props: IProps) => {
  const tuesdayMakersLogin = useFetcher();
  const { resourecLibraryLogin } = useSite()

  function formOnComplete(data: FetcherData | undefined) {
    console.log('data completed', data);
    if (data && data.user) {
      resourecLibraryLogin({ user: data.user })
    }
    if (data?.pass) {
      props.closeModal()
    }
  }

  return (
    <div>
      <MakersLoginFetcherForm
        Form={tuesdayMakersLogin.Form}
        type={tuesdayMakersLogin.type}
        state={tuesdayMakersLogin.state}
        data={tuesdayMakersLogin.data}
        onComplete={formOnComplete}
      />
    </div>
  )
}

export default TuesdayMakersLoginModal