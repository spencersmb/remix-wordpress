import { Transition } from "@remix-run/react/transition"
import TwSpinnerOne from "../svgs/spinners/twSpinnerOne"
interface IProps {
  transition: Transition
  btnText?: string
  className?: string
}
function SubmitBtn(props: IProps) {
  const { className, transition, btnText = 'My Button' } = props
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
      disabled={transition.state === "submitting" || transition.state === "loading"}
      aria-disabled={transition.state === "submitting" || transition.state === "loading"}
      type='submit'
      className={` ${className ? className : 'btn'}`}>
      {(transition.state === "submitting" && Boolean(!isPending)) && <TwSpinnerOne />}
      {text}
    </button>
  )
}

export default SubmitBtn