import { useEffect } from "react"

const useRemixFormReset = (
  { completed }: { completed: boolean | undefined },
  formRef: null | HTMLFormElement) => {
  useEffect(() => {
    if (completed) {
      formRef?.reset()
    }
  }, [formRef, completed])
}

export default useRemixFormReset