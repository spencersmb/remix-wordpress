import { validateEmail } from '@App/utils/validation'
import React from 'react'
import { commitSession, getSession } from '@App/sessions.server'
import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node'
import { Form, useActionData, useTransition } from '@remix-run/react'
import { createResourceUserSession } from '@App/utils/resourceLibrarySession.server'

export let action: ActionFunction = async ({ request, params }) => {
  let form = await request.formData();
  let email = form.get('email')
  let redirectPage: string | null = form.get('url') as string
  const session = await getSession(
    request.headers.get('Cookie')
  )

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
    return { fieldErrors, fields };

  try {
    // Fetch Subscriber
    const url = `https://api.convertkit.com/v3/subscribers?api_secret=${process.env.CK_SECRET}&email_address=${email}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const result = await res.json()

    if (result.total_subscribers === 0 || result.subscribers[0].state !== 'active') {
      // return { subscriberError: `Sorry, Email invalid.` };
      return json({
        pass: false,
        user: null,
      })

    }

    // Get subscriber Tags and create session
    let userId = result.subscribers[0].id
    const urlTags = `https://api.convertkit.com/v3/subscribers/${userId}/tags?api_secret=${process.env.CK_SECRET}`;

    const resTag = await fetch(urlTags, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const tagResults = await resTag.json()
    const user = {
      id: userId,
      tags: tagResults.tags.map((tag: { id: string, name: string, created_at: string }) => tag.name)
    }

    let sessionStorage = createResourceUserSession(user)
    const customHeaders = new Headers()
    customHeaders.append('Set-Cookie', await sessionStorage)
    customHeaders.append('Set-Cookie', await commitSession(session))

    session.flash(
      "globalMessage",
      `Project successfully archived`
    );

    if (redirectPage && redirectPage.length > 0) {
      return redirect(redirectPage, {
        headers: customHeaders,
      })
    }

    return json({
      pass: true,
      user,
    }, {
      headers: customHeaders,
    })


  } catch (err) {
    console.error(err)
    return { formError: `Form Async error. ${err}` };
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

const TuesdayMakersLoginFormNoJS = () => {
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
        action="/convertkit/tuesday-makers-login"
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
      </Form>
    </div>
  )
}

export default TuesdayMakersLoginFormNoJS
