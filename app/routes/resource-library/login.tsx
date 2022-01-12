import { ActionFunction, Form, json, Link, LoaderFunction, MetaFunction, redirect, useActionData, useMatches, useTransition } from "remix";
import { v4 } from "uuid";
import { createResourceUserSession, getResourceUserToken } from "~/utils/resourceLibrarySession.server";
import { getHtmlMetadataTags } from "~/utils/seo";
import { validateEmail } from "~/utils/validation";

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
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const result = await res.json()

  if (result.total_subscribers === 0 || result.subscribers[0].state !== 'active') {
    return { subscriberError: `Sorry, Email invalid.` };
  }

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

  // Wait to redirect here, pass down the logged in user, so I can add it to context, then redirect.
  return redirect('/resource-library/members', {
    headers: customHeaders,
  })

  // return json({
  //   user
  // }, {
  //   headers: customHeaders
  // })

}

const ResourceLibraryLogin = () => {
  let actionData = useActionData<ActionData | undefined>();
  const transition = useTransition()
  return (
    <div>
      <h1>Tuesday Makers Login</h1>
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