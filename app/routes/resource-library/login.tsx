import { ActionFunction, Form, json, LoaderFunction, MetaFunction, redirect, useActionData } from "remix";
import { v4 } from "uuid";
import { Layout } from "~/root"
import { createResourceUserSession, getResourceUserToken } from "~/utils/resourceLibrarySession.server";
import { getHtmlMetadataTags } from "~/utils/seo";
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



export let action: ActionFunction = async ({ request }): Promise<PasswordActionData | Response> => {
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
    password: password !== process.env.RESOURCE_LIBRARY_PW ? `Incorrect Password` : undefined
  };

  consoleHelper('fieldErrors', fieldErrors)

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };

  let userId = v4()
  let sessionStorage = createResourceUserSession(userId)
  const customHeaders = new Headers()
  customHeaders.append('Set-Cookie', await sessionStorage)

  return redirect('/resource-library/members', {
    headers: customHeaders,
  })

}

const ResourceLibraryLogin = () => {
  let actionData = useActionData<PasswordActionData | undefined>();
  return (
    <div>
      <h1>Login for Resource Library</h1>
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

export default ResourceLibraryLogin