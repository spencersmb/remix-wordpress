import { Form, useActionData, useTransition } from "@remix-run/react"
import type { Transition } from "@remix-run/react/transition";
type ActionData = {
  formError?: string;
  subscriberError?: string
  fieldErrors?: {
    email: string | undefined;
  };
  fields?: {
    email: string;
  }
  form?: string
};

// THIS FORM WILL ONLY SUBMIT WHEN AN INDEX PAGE HAS AN ACTION
// TODO: TEST
const LfmMiniCourseSignUpForm = (props: any) => {
  let actionData = useActionData<ActionData | undefined>();
  const transition = useTransition()

  return (
    <>
      <Form method='post' className="mb-4" aria-describedby={
        actionData?.formError
          ? "form-error-message"
          : undefined
      }>
        <label htmlFor="email-input" className="text-sm leading-7 text-gray-600">
          email:
          <input
            id="email-input"
            type="email"
            className="w-full px-3 py-1 mb-8 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            name="email"
            aria-invalid={
              Boolean(
                actionData?.fieldErrors?.email
              ) || undefined
            }
            aria-describedby={
              actionData?.fieldErrors?.email
                ? "email-error"
                : undefined
            }
          />
        </label>
        {actionData?.fieldErrors?.email ? (
          <p
            className="form-validation-error"
            role="alert"
            id="email-error"
          >
            {actionData?.fieldErrors.email}
          </p>
        ) : null}

        <button
          disabled={transition.state !== 'idle'}
          aria-disabled={transition.state !== 'idle'}
          type='submit'
          className="px-8 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
          {transition.state === 'idle' ? 'Sign Up' : '...Loading'}
        </button>
      </Form>
      {actionData?.form === 'success' && <div>
        <h2>Sucess</h2>
        <h3>Instructions</h3>
        <p>Accept email </p>
      </div>}
    </>
  )
}

export default LfmMiniCourseSignUpForm