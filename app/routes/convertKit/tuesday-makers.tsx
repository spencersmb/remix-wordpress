import { ckFormIds } from '~/lib/convertKit/formIds'
import { validateEmail } from '~/utils/validation'
import { fetchConvertKitSignUp } from '~/utils/fetch.server'
import React from 'react'
import { commitSession, getSession } from '~/sessions.server'
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import { Form, useActionData, useTransition } from '@remix-run/react'
import { ckSignUpCookie } from '~/cookies.server'

/**
 * 
 * CONVERITK FORM SIGNUP API END POINT 
 * 
 */

function getFormId(type: string | null): string {
  switch (type) {
    case 'footer':
      return ckFormIds.resourceLibrary.footer
    default:
      return ckFormIds.resourceLibrary.landingPage
  }
}

export let action: ActionFunction = async ({ request, params }) => {
  const customHeaders = new Headers()
  let form = await request.formData();
  let email = form.get('email')
  let formType = form.get('type') as string
  const ckId = getFormId(formType)

  if (
    typeof email !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
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
    const fetch = await fetchConvertKitSignUp({ email, id: ckId })
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

  React.useEffect(() => {
    if (transition.state === 'submitting') {
      formRef.current?.reset()
    }
  }, [transition])

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
