import { useFetcher, useTransition } from "@remix-run/react";
import { useEffect, useState } from "react";
import MakersSignUpFetcherForm from "../forms/makersSignUpFetcherForm";

interface IProps {
  closeModal: () => void
}

const TuesdayMakersSignUpModal = (props: IProps) => {
  const tuesdayMakersSignUp = useFetcher();
  const tuesdayMakerLogin = useFetcher();
  const tuesdayMakerTransition = useTransition();
  const transition = useTransition()
  const [confirm, setConfirm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (tuesdayMakersSignUp.type === "done" && tuesdayMakersSignUp.data?.pass) {
      // show step 2
      // Check email, after your done, click ok
      setShowConfirmation(true);
      // step 3 log them in using the email they entered in the sign up form
      // step 4 Do not redirect them to resource library
      // step 5 close modal
    }
  }, [tuesdayMakersSignUp.type, tuesdayMakersSignUp.data, props]);

  useEffect(() => {
    // if they've confirmed, then sign them in.
    if (confirm) {
      // log user in wi
      // closeModal
    }
  }, [confirm])

  function handleConfirm() {
    // Log them in
    // close modal
    // 
  }

  return (
    <div className="bg-white">
      {showConfirmation && <div>
        <p>Check your email and confirm, once your done, come back here and click ok.</p>
        <button onClick={handleConfirm}>I've confirmed my email</button>
      </div>}
      {!showConfirmation && <MakersSignUpFetcherForm
        Form={tuesdayMakersSignUp.Form}
        type={tuesdayMakersSignUp.type}
        state={tuesdayMakersSignUp.state}
        data={tuesdayMakersSignUp.data}
      />}
    </div>
  )
}

export default TuesdayMakersSignUpModal