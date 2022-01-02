import { ActionFunction, Form, json, Link, LoaderFunction, MetaFunction, redirect, useActionData, useTransition } from "remix";
import { v4 } from "uuid";
import { createResourceUserSession, getResourceUserToken } from "~/utils/resourceLibrarySession.server";
import { getHtmlMetadataTags } from "~/utils/seo";
import { validateEmail } from "~/utils/validation";
import { consoleHelper } from "~/utils/windowUtils";

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
    id: '24',
    title: 'Resource Library: Login',
    author: {
      id: '22',
      name: 'Teela',
      avatar: {
        url: '',
        width: 24,
        height: 24
      },
      slug: 'resource-library-login'
    },
    slug: 'resource-library-login',
    content: '',
    date: '',
    seo: {
      title: 'Resource Library: Login - Every Tuesday',
      metaDesc: 'Resource Library members only access with over 200+ assets for free!',
      fullHead: '',
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

  const page = {
    title: 'Resource Library Login',
    slug: 'resource-library-login',
    description: 'A jam packed resource library of design + lettering files',
    seo: {
      title: 'Resource Library Login- Every Tuesday',
      opengraphModifiedTime: '',
      metaDesc: 'When you join the Tuesday Tribe, you’ll receive instant access to the Resource Library, filled with textures, fonts, vectors, stationery, graphics, cheat sheets and more.'
    }
  }
  return json({ page }, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate" } })
};

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

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };

  const url = `https://api.convertkit.com/v3/subscribers?api_secret=${process.env.CK_SECRET}&email_address=${email}`;
  console.log('converkitUrl', url)
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const result = await res.json()
  // return json({ form: result })

  if (result.total_subscribers === 0 || result.subscribers[0].state !== 'active') {
    return { subscriberError: `Sorry, Email invalid.` };
  }
  let userId = v4()
  let sessionStorage = createResourceUserSession(userId)
  const customHeaders = new Headers()
  customHeaders.append('Set-Cookie', await sessionStorage)

  return redirect('/resource-library/members', {
    headers: customHeaders,
  })

}

const ResourceLibraryLogin = () => {
  let actionData = useActionData<ActionData | undefined>();
  consoleHelper('actionData', actionData)
  const transition = useTransition()
  return (
    <div>
      <h1>SignUp for Learn Font Making Mini Course</h1>
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
          {transition.state === 'idle' ? 'Login' : '...Loading'}
        </button>
      </Form>
      {actionData?.subscriberError && <div><p>Sorry no user exists, please sign up for the Resouce Library <Link to={`/resource-library`}>here</Link></p></div>}
    </div>
  )
}

export default ResourceLibraryLogin