import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import MakersSignUpFetcherForm from "./makersSignUpFetcherForm";

interface IWrapperProps {
  setConfirmation: (confirmation: boolean) => void
}
const MakersFetcherWrapper = ({ setConfirmation }: IWrapperProps) => {
  const tuesdayMakersSignUp = useFetcher();
  useEffect(() => {
    if (tuesdayMakersSignUp.type === "done" && tuesdayMakersSignUp.data?.pass) {
      // show step 2
      // Check email, after your done, click ok
      setConfirmation(true);
      // step 3 log them in using the email they entered in the sign up form
      // step 4 Do not redirect them to resource library
      // step 5 close modal
    }
  }, [tuesdayMakersSignUp.type, tuesdayMakersSignUp.data, setConfirmation]);

  return (
    <MakersSignUpFetcherForm
      Form={tuesdayMakersSignUp.Form}
      type={tuesdayMakersSignUp.type}
      state={tuesdayMakersSignUp.state}
      data={tuesdayMakersSignUp.data}
    />
  )
}

export default MakersFetcherWrapper