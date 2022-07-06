import { Form, useActionData, useTransition } from "@remix-run/react"
import type { Transition } from "@remix-run/react/transition";
import { AnimatePresence } from "framer-motion";
import InputBase from "../input/inputBase";
import FormErrorMessage from "../messages/ErrorMessage";
type ActionData = {
  formError?: {
    [key: string]: string
  }
  subscriberError?: string
  fieldErrors?: {
    email: string | undefined;
  };
  fields?: {
    email: string;
  }
  form?: {
    [key: string]: string
  }
};

interface Props {
  inputBg?: string
  type: string
}
// THIS FORM WILL ONLY SUBMIT WHEN AN INDEX PAGE HAS AN ACTION
// TODO: TEST
const LfmMiniCourseSignUpForm = (props: Props) => {
  const { inputBg, type = 'default' } = props
  let actionData = useActionData<ActionData | undefined>();
  const transition = useTransition()

  return (
    <>
      {/*ERROR SUBMISSION*/}
      {/* @ts-ignore */}
      <AnimatePresence>
        {actionData?.formError?.[`${type}`] && transition.state === 'idle' &&
          <FormErrorMessage
            id={'subscriberError'}
            message={actionData?.formError?.[`${type}`] || ''} />
        }
        {actionData?.fieldErrors?.email && transition.state === 'idle' &&
          <FormErrorMessage
            id={'passwordError'}
            message={actionData?.fieldErrors.email} />
        }
      </AnimatePresence>
      <div className="login_form relative z-[2] mt-2 w-full">
        <Form method='post' className="flex flex-col desktop:flex-row desktop:items-end" aria-describedby={
          actionData?.formError?.[`${type}`]
            ? "form-error-message"
            : undefined
        }>

          <InputBase
            label="Email"
            wrapperCss="desktop:flex-[1_1_45%]"
            labelCss="text-sm text-grey-600 font-semibold"
            className={`mt-2 mb-5 desktop:mb-0 ${inputBg}`}
            invalid={Boolean(
              actionData?.fieldErrors?.email
            ) || undefined}
            id={`email-${type}`}
            name={`email`}
            type='email'
            required={true}
            placeholder='Enter your email'
          />
          <input type="hidden" name="_action" value={type} />
          <button
            disabled={transition.state !== 'idle'}
            aria-disabled={transition.state !== 'idle'}
            type='submit'
            className="btn btn-sage-600 bg-lfm-blue-700 hover:bg-lfm-blue-700 hover:ring-lfm-blue-700 active:ring-4 active:bg-lfm-blue-700 desktop:max-h-[56px] desktop:ml-4 desktop:flex-1">
            {transition.state === 'idle' ? 'Start Now' : '...Loading'}
          </button>
        </Form>
      </div>
      {actionData?.form?.[`${type}`] === 'success' && <div>
        <h2>Sucess</h2>
        <h3>Instructions</h3>
        <p>Accept email </p>
      </div>}
    </>
  )
}

export default LfmMiniCourseSignUpForm