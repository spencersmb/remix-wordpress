import React from 'react'
import { ActionFunction, Form, json, Link, LoaderFunction, MetaFunction, useActionData, useTransition } from 'remix'
import { lfmMiniCourseCookie } from '~/cookies.server';
import { ckFormIds } from '~/lib/convertKit/formIds';
import { getStaticPageMeta } from '~/utils/pageUtils';
import { getHtmlMetadataTags } from '~/utils/seo';
import { validateEmail } from '~/utils/validation';
import { consoleHelper } from '~/utils/windowUtils';

export let meta: MetaFunction = (rootData): any => {

  /*
  rootData gets passed in from the root metadata function
   */
  const { data, location, parentsData } = rootData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }
  const page = getStaticPageMeta({
    title: `Learn Font Making: Mini Course SignUp - Every Tuesday`,
    desc: `Learn Font Making: Mini Course SignUp!`,
    slug: `mini-course`
  })

  /*
  Build Metadata tags for the page
   */
  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: null,
    page,
    location
  })
};

export let loader: LoaderFunction = async ({ request }) => {
  return json({})
};

export let action: ActionFunction = async ({ request }): Promise<ActionData | Response> => {

  let form = await request.formData();
  let email = form.get('email')
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof email !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }

  let fields = { email };
  let fieldErrors = {
    email: validateEmail(email)
  };

  consoleHelper('fieldErrors', fieldErrors)
  const id = ckFormIds.miniCourse.signUp
  const url = `https://api.convertkit.com/v3/forms/${id}/subscribe`;

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };

  // Sign user up
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.CK_KEY,
        email,
      }),
    })

    return json({ form: 'success' })
  } catch (e) {
    return json({ form: 'fail' })
  }

}

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

function LfmMiniCourseSignUp() {
  let actionData = useActionData<ActionData | undefined>();
  const transition = useTransition()

  return (
    <div>
      MiniCourse Sign Up Page
      <Form method='post' className="mb-4" aria-describedby={
        actionData?.formError
          ? "form-error-message"
          : undefined
      }>
        <label htmlFor="email-input" className="leading-7 text-sm text-gray-600">
          email:
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
      </Form>
      {actionData?.form === 'success' && <div>
        <h2>Sucess</h2>
        <h3>Instructions</h3>
        <p>Accept email </p>
      </div>}
      <div>
        <Link to='/learn-font-making/mini-course/video1'>Video 1</Link>
      </div>
    </div>
  )
}

export default LfmMiniCourseSignUp
