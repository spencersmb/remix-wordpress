import React from 'react'
import { ActionFunction, Form, json, useActionData, useTransition } from 'remix'
import { validateEmail } from '~/utils/validation'
import { consoleHelper } from '~/utils/windowUtils'
import { ckFormIds } from '~/lib/convertKit/formIds'

type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
  };
  fields?: {
    email: string;
  }
  form?: string
};

function FooterPrimary () {
  const formRef: any = React.useRef()
  let actionData = useActionData<ActionData | undefined>();
  console.log('actionData footer', actionData)

  const transition = useTransition()
  return (
    <footer className="remix-app__footer">
      <div className="container remix-app__footer-content">

        <form ref={formRef} method='post' action='api/convertKit' className="mb-4" aria-describedby={
          actionData?.formError
            ? "form-error-message"
            : undefined
        }>
          <label htmlFor="email-input" className="leading-7 text-sm text-gray-600">
            Email:
            <input
              id="email-input"
              type="email"
              className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            {transition.state === 'idle' ? 'Sign Up' : '...Loading'}
          </button>
          {/*{loading ? <p>Loading...</p> : null  }*/}
        </form>

      </div>
    </footer>
  )
}

export default FooterPrimary
