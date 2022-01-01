import { ActionFunction, Form, json, useActionData, useTransition } from 'remix'
import { ckFormIds } from '~/lib/convertKit/formIds'
import { validateEmail } from '~/utils/validation'
import { fetchConvertKitSignUp } from '~/utils/fetch'
import React from 'react'
import { commitSession, getSession } from '~/sessions.server'

function getFormId(type: string | null): string{
  switch (type){
    case 'footer':
      return ckFormIds.resourceLibrary.footer
    default:
      return ckFormIds.resourceLibrary.landingPage
  }
}

export let action: ActionFunction = async ({request, params}) => {
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

  try{
    const fetch = await fetchConvertKitSignUp({email, id: ckId})

    const session = await getSession(
      request.headers.get('Cookie')
    )

    session.flash(
      "globalMessage",
      `Project successfully archived`
    );

    return json({
      pass: true,
      fetch,
    }, {
      headers: {
        "Set-Cookie": await commitSession(session)
      },
    })
  }catch (e){
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
          <label className="leading-7 text-sm text-gray-600" htmlFor="email-input">Email</label>
          <input
            className="mb-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
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
