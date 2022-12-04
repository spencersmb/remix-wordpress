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

interface IuseSuccessModal {
  status: boolean | undefined
  modalMessage?: string
}
export function useSuccessModal({
  status = false,
  modalMessage,
}: IuseSuccessModal) {

  const { openModal, closeModal } = useSite()
  const defaultMessage = 'Check your email and click the link inside to complete the signup process!'
  useEffect(() => {
    if (status) {
      openModal({
        template: <SignUpSuccess
          message={modalMessage || defaultMessage}
          closeModal={closeModal} />
      })
      //@ts-ignore
      // ref.current.reset();
    }
  }, [closeModal, openModal, status, modalMessage]);
}
interface IuseResetForm {
  status: boolean
  formRef: React.RefObject<any>
}

export function useResetForm({
  status,
  formRef
}: IuseResetForm) {
  useEffect(() => {
    if (status) {
      formRef.current?.reset()
    }
  }, [formRef, status])
}