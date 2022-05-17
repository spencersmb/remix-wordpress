
import {
  getPreviewRedirectUrlFromParams,
  getPreviewUrlParams,
} from '../utils/loaderHelpers'
import { logUserInJWT } from '../utils/fetch'
import { createUserSession, setFutureDate } from '../utils/session.server'
import { getHtmlMetadataTags } from '../utils/seo'
import Layout from '~/components/layoutTemplates/layout'
import { ActionFunction, LoaderFunction, MetaFunction, redirect } from '@remix-run/node'
import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react'

export let meta: MetaFunction = (metaData): any => {
  const { data, location, parentsData } = metaData

  // hardcoded Page
  // TODO: REPLACE PAGE
  const page: IPage = {
    id: '24',
    title: 'Login',
    author: {
      id: '23',
      name: 'Teela',
      avatar: {
        url: '',
        width: 24,
        height: 24
      },
      slug: 'login'
    },
    slug: 'login',
    content: '',
    date: '',
    seo: {
      title: 'Login - Every Tuesday',
      metaDesc: 'Login Page for Every-Tuesday.com',
      fullHead: '',
      opengraphModifiedTime: '',
      opengraphPublishedTime: '',
      readingTime: '1min'
    }
  }

  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data'
    }
  }

  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: data.post,
    page,
    location
  })
}

export let loader: LoaderFunction = async ({ request }): Promise<IDataType> => {
  const { id, postType, url } = getPreviewUrlParams(request)

  return {
    params: {
      id,
      postType,
      url
    }
  }
}

export let action: ActionFunction = async ({ request }): Promise<ActionData | Response> => {
  let form = await request.formData();
  let password = form.get('password')
  let username = form.get('username')
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof password !== "string" ||
    typeof username !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }

  let fields = { password, username };
  let fieldErrors: { password: string | undefined, username: string | undefined } = {
    password: undefined,
    username: undefined
  };

  if (password.length < 4) {
    fieldErrors = {
      password: `Password length too small`,
      username: undefined
    };
    return { fieldErrors, fields };
  }

  try {
    const response = await logUserInJWT({ username, password })
    const serverRes = await response.json()

    if (serverRes.errors) {
      return {
        fields,
        formError: `Username/Password combination is incorrect`
      };
    }

    let token: IAuthToken = {
      expires: setFutureDate(),
      token: String(serverRes.data.login.authToken),
      refresh: String(serverRes.data.login.refreshToken),
      cmid: String(serverRes.data.login.clientMutationId)
    }

    let user: IUser = serverRes.data.login.user

    const sessionStorage = createUserSession(user.id, token)
    const customHeaders = new Headers()
    customHeaders.append('Set-Cookie', await sessionStorage)
    const { id, postType } = getPreviewUrlParams(request)

    if (!id || !postType) {
      return redirect(process.env.WORDPRESS_DB || '/', {
        headers: customHeaders
      })
    }

    const redirectUrl = getPreviewRedirectUrlFromParams(postType, id)

    return redirect(redirectUrl, {
      headers: customHeaders
    })
  } catch (e) {
    return { formError: `Form error: ${e}` };
  }
}

interface IDataType {
  params: {
    id: string | undefined
    postType: string | null
    url: URL
  }
}
type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    username: string;
    password: string;
  };
};

const Login = () => {
  let actionData = useActionData<ActionData | undefined>();
  let { params } = useLoaderData<IDataType>()
  let transition = useTransition();
  let action = params.postType ? `/login?postType=${params.postType}&postId=${params.id}` : '/login'

  return (
    <Layout>
      <div className="w-5/12 p-8 m-auto mt-10 bg-gray-100 rounded-lg login-form md:ml-auto md:mt-12">
        <h4 className="block mb-5 text-lg font-medium text-gray-900 title-font">Login</h4>
        {actionData?.formError && (
          <div
            className="text-red-600"
            dangerouslySetInnerHTML={{ __html: actionData.formError || '' }}
          />
        )}
        <Form method='post'
          action={action}
          aria-disabled={transition.state !== 'idle'}
          className="mb-4"
          aria-describedby={
            actionData?.fieldErrors?.username || actionData?.fieldErrors?.password
              ? "form-error-message"
              : undefined
          }>
          <div>
            <label className="text-sm leading-7 text-gray-600" htmlFor="username-input">Username</label>
            <input
              className="w-full px-3 py-1 mb-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              type="text"
              id="username-input"
              name="username"
              defaultValue={actionData?.fields?.username}
              aria-invalid={Boolean(
                actionData?.fieldErrors?.username
              )}
              aria-describedby={
                actionData?.fieldErrors?.username
                  ? "username-error"
                  : undefined
              }
            />
            {actionData?.fieldErrors?.username ? (
              <p
                className="text-red-500 form-validation-error"
                role="alert"
                id="username-error"
              >
                {actionData?.fieldErrors.username}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="password-input" className="text-sm leading-7 text-gray-600">
              Password:
            </label>
            <input
              id="password-input"
              type="password"
              className="w-full px-3 py-1 mb-8 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
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
            {actionData?.fieldErrors?.password ? (
              <p
                className="text-red-500 form-validation-error"
                role="alert"
                id="password-error"
              >
                {actionData?.fieldErrors.password}
              </p>
            ) : null}
          </div>
          <button
            disabled={transition.state !== 'idle'}
            aria-disabled={transition.state !== 'idle'}
            type='submit'
            className="px-8 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
            {transition.state === 'idle' ? 'Login' : '...Loading'}
          </button>
        </Form>
      </div>
    </Layout>
  )
}

export default Login
