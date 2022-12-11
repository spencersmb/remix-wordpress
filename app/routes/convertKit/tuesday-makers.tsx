import { validateEmail } from '@App/utils/validation'
import { fetchConvertKitSignUp } from '@App/utils/fetch.server'
import React from 'react'
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import { Form, useActionData, useTransition } from '@remix-run/react'
import { ckSignUpCookie } from '@App/cookies.server'
import { getCKFormId } from '@App/utils/resourceLibraryUtils';
import { useResetForm } from '@App/hooks/formHooks';


export let action: ActionFunction = async ({ request, params }) => {
  const customHeaders = new Headers()
  let form = await request.formData();
  let email = form.get('email')
  let formType = form.get('type') as string
  let honeyPot = form.get('firstName') as string
  const ckId = getCKFormId(formType)

  if (
    typeof email !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }

  if (
    typeof honeyPot !== "string" ||
    honeyPot.length !== 0
  ) {
    return { formError: `First name not filled out properly.` };
  }

  let fields = { email };
  let fieldErrors = {
    email: validateEmail(email)
  };

  if (Object.values(fieldErrors).some(Boolean))
    return {
      fieldErrors, fields,
      pass: false
    }

  try {

    // Sign user up to ConvertKit with Form ID - to determin which form to use
    const fetch = await fetchConvertKitSignUp({ email, id: ckId })

    // Add temporary cookie to browser to process on thankyou page
    customHeaders.append('Set-Cookie', await ckSignUpCookie.serialize({
      userID: fetch.subscription.subscriber.id,
      email,
    }))

    /**
     * 
     * Session Flash message setup
     */
    // const session = await getSession(
    //   request.headers.get('Cookie')
    // )
    // session.flash(
    //   "globalMessage",
    //   `Project successfully archived`
    // );

    return json({
      pass: true,
      fetch,
    }, {
      headers: customHeaders
      // headers: {
      //   "Set-Cookie": await commitSession(session)
      // },
    })
  } catch (e) {
    return { formError: `Form not submitted correctly. ${e}` };
  }

}
type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
  };
  fields?: {
    email: string;
  }
  pass?: boolean
};

const TuesdayMakersFormNoJS = () => {
  const actionData = useActionData<ActionData>()
  const transition = useTransition()
  const formRef: any = React.useRef()

  useResetForm({
    formRef,
    status: transition.state === 'submitting'
  })

  return (
    <div>
      <Form
        method="post"
        className="mb-4"
        action="/convertkit/tuesday-makers"
      >
        <div>
          <label className="text-sm leading-7 text-gray-600" htmlFor="email-input">Email</label>
          <input
            className="w-full px-3 py-1 mb-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            type="email"
            id="email-input"
            name="email"
            required
            aria-invalid={Boolean(
              actionData?.fieldErrors?.email
            )}
            aria-describedby={
              actionData?.fieldErrors?.email
                ? "username-error"
                : undefined
            }
          />
          {actionData?.fieldErrors?.email ? (
            <p
              className="form-validation-error"
              role="alert"
              id="email-error"
            >
              {actionData?.fieldErrors?.email}
            </p>
          ) : null}
        </div>
        <div>
          <input type="text" name='type' value='footer' readOnly className='hidden' />
        </div>
        <div>
          <button
            disabled={transition.state !== 'idle'}
            aria-disabled={transition.state !== 'idle'}
            type='submit'
            className="px-8 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
            {transition.state === 'idle' ? 'Subscribe' : '...Loading'}
          </button>
        </div>
        {(
          actionData?.pass ? (
            <p>Thanks for subscribing!</p>
          ) : actionData?.formError ? (
            <p data-error>{actionData?.formError}</p>
          ) : null
        )}
      </Form>
    </div>
  )
}

export default TuesdayMakersFormNoJS
