import TwSpinnerOne from "../svgs/spinners/twSpinnerOne"
interface IProps {
  btnText?: string
  className?: string
  state: FetcherState
}
function SubmitFetcherBtn(props: IProps) {
  const { className, state, btnText = 'My Button' } = props
  // console.log('transition', transition);
  if (!state) {
    return null;
  }

  const text =
    state === "submitting" || state === "loading"
      ? 'Processing...'
      : btnText;

  return (
    <button
      data-testid="submit-fetcher-button"
      disabled={state === "submitting" || state === "loading"}
      aria-disabled={state === "submitting" || state === "loading"}
      type='submit'
      className={` ${className ? className : 'btn'}`}>
      {(state === "submitting" || state === "loading") && <TwSpinnerOne />}
      {text}
    </button>
  )
}

export default SubmitFetcherBtn