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
      // show step 2 conirmation for email pop-up signup
      setConfirmation(true);

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