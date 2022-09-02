import TwSpinnerOne from "../svgs/spinners/twSpinnerOne"
interface IProps {
  btnText?: string
  className?: string
  state: FetcherState
  spinnerColors?: {
    bg: string
    fg: string
  }
}

/**
 * Submit Fetcher Form Button with a spinner
 * 
 * @tested - 5/27/2022 
 *  
 */

function SubmitFetcherBtn(props: IProps) {
  const { className, state, spinnerColors, btnText = 'My Button' } = props
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
      {(state === "submitting" || state === "loading") && <span className="mr-2">
        <TwSpinnerOne loaderColors={spinnerColors} />
      </span>}
      {text}
    </button>
  )
}

export default SubmitFetcherBtn