import type { Transition } from "@remix-run/react/transition"
import TwSpinnerOne from "../svgs/spinners/twSpinnerOne"
interface IProps {
  transition: Transition
  btnText?: string
  className?: string
  spinnerColors?: {
    bg: string
    fg: string
  },
}

/**
 * Submit Button with a spinner
 * 
 * @tested - 8/22/2022
 *
 */
function SubmitBtn(props: IProps) {
  const { className, transition, spinnerColors, btnText = 'My Button' } = props
  // console.log('transition', transition);
  if (!transition) {
    return null;
  }

  /*
    Check if page is loading when someone uses the forward or back button 
    so we don't change the button state briefly
  */
  const isPending =
    transition.state === "loading" &&
    transition.location
  const text =
    transition.state === "submitting"
      ? 'Processing...'
      : transition.state === "loading" && Boolean(!isPending)
        ? "Completed!"
        : btnText;

  return (
    <button
      data-testid="submit-button"
      disabled={transition.state === "submitting" || transition.state === "loading"}
      aria-disabled={transition.state === "submitting" || transition.state === "loading"}
      type='submit'
      className={` ${className ? className : 'btn'}`}>
      {(transition.state === "submitting" && Boolean(!isPending)) && <TwSpinnerOne loaderColors={spinnerColors} />}
      <span className={transition.state === "submitting" && Boolean(!isPending) ? 'ml-3' : ''}>
        {text}
      </span>
    </button>
  )
}

export default SubmitBtn