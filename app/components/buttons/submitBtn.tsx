import TwSpinnerOne from "../svgs/spinners/twSpinnerOne"
interface IProps {
  state: string
  btnText?: string
  classes?: string
}
function SubmitBtn(props: IProps) {
  const { classes, state, btnText = 'My Button' } = props
  return (
    <button
      disabled={state === "submitting" || state === "loading"}
      aria-disabled={state === "submitting" || state === "loading"}
      type='submit'
      className={`text-primary-600 font-semibold px-5 py-4 rounded-lg hover:ring focus:ring ring-offset-4 text-base outline-none duration-200 ease-in-out flex flex-1 flex-row justify-center items-center disabled:bg-neutral-500 disabled:ring disabled:ring-neutral-500 ${classes ? classes : 'bg-secondary-400 hover:ring-secondary-400 hover:bg-secondary-400 ring-offset-primary-600 focus:ring-primary-600 active:bg-secondary-500 active:scale-[.98]'}`}>
      {(state === "submitting" || state === "loading") && <TwSpinnerOne />}
      {state === "submitting" || state === "loading" ? '...processing' : btnText}
    </button>
  )
}

export default SubmitBtn