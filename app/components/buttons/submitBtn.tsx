import TwSpinnerOne from "../svgs/spinners/twSpinnerOne"
interface IProps {
  state: string
  btnText?: string
  className?: string
}
function SubmitBtn(props: IProps) {
  const { className, state, btnText = 'My Button' } = props
  return (
    <button
      disabled={state === "submitting" || state === "loading"}
      aria-disabled={state === "submitting" || state === "loading"}
      type='submit'
      className={` ${className ? className : 'btn'}`}>
      {(state === "submitting" || state === "loading") && <TwSpinnerOne />}
      {state === "submitting" || state === "loading" ? 'Processing...' : btnText}
    </button>
  )
}

export default SubmitBtn