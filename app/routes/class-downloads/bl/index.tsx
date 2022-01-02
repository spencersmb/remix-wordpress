import { ActionFunction, createCookie, Form, json, LoaderFunction, MetaFunction, redirect, useActionData } from "remix"
import { procreateBonusCookie } from "~/cookies.server"
import { findCookie } from "~/utils/loaderHelpers"
import { getHtmlMetadataTags } from "~/utils/seo";


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

  const page: IPage = {
    id: '25',
    title: 'Procreate 5x Bonus Downloads',
    author: {
      id: '25',
      name: 'Teela',
      avatar: {
        url: '',
        width: 24,
        height: 24
      },
      slug: 'teela'
    },
    slug: 'bl',
    content: '',
    date: '',
    seo: {
      title: 'Procreate 5x Bonus Downloads - Every Tuesday',
      metaDesc: 'Procreate 5x Bonus Downloads members only access!',
      opengraphModifiedTime: '',
      opengraphPublishedTime: '',
      readingTime: '3min'
    }
  }

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
  const { hasCookie } = await findCookie(request, procreateBonusCookie)
  if (hasCookie) {
    return redirect('/class-downloads/bl/members')
  }

  return json({})
}

export let action: ActionFunction = async ({ request }) => {

  let form = await request.formData();
  let password = form.get('password')
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof password !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }

  let fields = { password };
  let fieldErrors = {
    password: password !== process.env.PROCREATE_5X_PW ? `Incorrect Password` : undefined
  };

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };


  const customHeaders = new Headers()
  customHeaders.append('Set-Cookie', await procreateBonusCookie.serialize({
    procreateBonusLogin: true
  }))
  return redirect('/class-downloads/bl/members', {
    headers: customHeaders,
  })

}

const ProcreateBonusesLogin = () => {
  let actionData = useActionData<PasswordActionData | undefined>();
  return (
    <div>
      <Form method='post' className="mb-4" aria-describedby={
        actionData?.formError
          ? "form-error-message"
          : undefined
      }>
        <label htmlFor="password-input" className="leading-7 text-sm text-gray-600">
          Password:
          <input
            id="password-input"
            type="password"
            className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name="password"
            aria-invalid={
              Boolean(
                actionData?.fieldErrors?.password
              ) || undefined
            }
            aria-describedby={
              actionData?.fieldErrors?.password
                ? "password-error"
                : undefined
            }
          />
        </label>
        {actionData?.fieldErrors?.password ? (
          <p
            className="form-validation-error"
            role="alert"
            id="password-error"
          >
            {actionData?.fieldErrors.password}
          </p>
        ) : null}

        <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Login
        </button>
      </Form>
    </div>
  )
}

export default ProcreateBonusesLogin