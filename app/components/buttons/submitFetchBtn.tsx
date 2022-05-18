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

  /*
    Check if page is loading when someone uses the forward or back button 
    so we don't change the button state briefly
  */
  // const isPending =
  //   state === "loading"

  // const text =
  //   state === "submitting"
  //     ? 'Processing...'
  //     : state === "loading" && Boolean(!isPending)
  //       ? "Completed!"
  //       : btnText;
  const text =
    state === "submitting" || state === "loading"
      ? 'Processing...'
      : btnText;

  return (
    <button
      disabled={state === "submitting" || state === "loading"}
      aria-disabled={state === "submitting" || state === "loading"}
      type='submit'
      className={` ${className ? className : 'btn'}`}>
      {/* {(state === "submitting" && Boolean(!isPending)) && <TwSpinnerOne />} */}
      {(state === "submitting" || state === "loading") && <TwSpinnerOne />}
      {text}
    </button>
  )
}

export default SubmitFetcherBtn