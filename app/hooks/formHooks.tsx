import SignUpSuccess from "@App/components/modals/signUpSuccess";
import { useEffect } from "react";
import useSite from "./useSite";

interface IuseSignUpEmailSuccessModal {
  type: FetcherTypes
  dataPass: boolean | undefined
}

export function useSignUpEmailSuccessModal({
  type,
  dataPass,
}: IuseSignUpEmailSuccessModal) {

  const { openModal, closeModal } = useSite()
  useEffect(() => {
    if (type === "done" && dataPass) {
      openModal({
        template: <SignUpSuccess
          message='Check your email and click the link inside to complete the signup process!'
          closeModal={closeModal} />
      })
      //@ts-ignore
      // ref.current.reset();
    }
  }, [closeModal, dataPass, openModal, type]);
}

interface IuseResetFormOnComplete {
  type: FetcherTypes
  dataPass: boolean | undefined
  formRef: React.RefObject<any>
}
export function useResetFormOnComplete({
  type,
  dataPass,
  formRef
}: IuseResetFormOnComplete) {
  useEffect(() => {
    if (type === "done" && dataPass && formRef.current) {
      formRef.current.reset();
    }
  }, [dataPass, type, formRef]);
}