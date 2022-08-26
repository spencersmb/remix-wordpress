
import {
  getPreviewRedirectUrlFromParams,
  getPreviewUrlParams,
} from '../utils/loaderHelpers'
import { logUserInJWT } from '../utils/fetch.server'
import { createUserSession, setFutureDate } from '../utils/session.server'
import { getBasicPageMetaTags } from '../utils/seo'
import Layout from '@App/components/layoutTemplates/layout'
import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node'
import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react'
import { AnimatePresence } from "framer-motion";
import InputBase from '@App/components/forms/input/inputBase'
import useSite from '@App/hooks/useSite'
import FormErrorMessage from '@App/components/forms/messages/ErrorMessage'

export let meta: MetaFunction = (metaData): any => {

  /*
  metaData gets passed in from the root metadata function
   */
  const { data, location, parentsData } = metaData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  /*
  Build Metadata tags for the page
   */
  return getBasicPageMetaTags(metaData, {
    title: `Tuesday Admin`,
    desc: `Admin Page for Every-Tuesday Preview Pages`,
    slug: `/login`
  }, {
    googleIndex: false
  })
};

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
      expires: setFutureDate(5 * 60000),
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
    console.log('redirectURL', redirectUrl);

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
  const { state: { user } } = useSite()
  let actionData = useActionData<ActionData | undefined>();
  let { params } = useLoaderData<IDataType>()
  let transition = useTransition();
  let action = params.postType ? `/login?postType=${params.postType}&postId=${params.id}` : '/login'
  const backendUrl = process.env.NODE_ENV === 'production' ? 'https://api.every-tuesday.com/wp-admin' : 'https://etheadless.local/wp-admin/'
  return (
    <Layout>
      <div className='bg-[#F7F6F7] grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>
        <div className="col-span-2 col-start-2 px-3 py-16 my-16 bg-white shadow-et_2_lg tablet:px-12 tablet:col-start-4 tablet:col-span-8 laptop:col-start-5 laptop:col-span-6 max-w-[525px] w-full mx-auto rounded-lg">
          <div className="flex flex-col items-center pt-8">

            <div className="flex flex-col items-center mb-8 text-center">
              <h1 className="mb-4 text-5xl text-sage-700 font-sentinel__SemiBoldItal">
                {user.wpAdmin ? 'Welcome back, Teela' : 'Admin Login '}
              </h1>
            </div>

            {/*ERROR SUBMISSION*/}
            {/* @ts-ignore */}
            <AnimatePresence>
              {actionData?.formError && transition.state === 'idle' &&
                <FormErrorMessage
                  id={'subscriberError'}
                  message={actionData.formError || ''} />
              }
              {actionData?.fieldErrors?.password && transition.state === 'idle' &&
                <FormErrorMessage
                  id={'passwordError'}
                  message={actionData?.fieldErrors.password} />
              }
            </AnimatePresence>

            {/*LOGIN FORM*/}
            {!user.wpAdmin && <div className="login_form relative z-[2] mt-2 w-full">
              <Form method='post'
                action={action}
                aria-disabled={transition.state !== 'idle'}
                className="flex flex-col"
                aria-describedby={
                  actionData?.fieldErrors?.username || actionData?.fieldErrors?.password
                    ? "form-error-message"
                    : undefined
                }>

                <InputBase
                  type="text"
                  id="username-input"
                  name="username"
                  label="Username"
                  labelCss="text-sm text-grey-600 font-semibold"
                  className="mt-2 mb-5 bg-grey-100"
                  defaultValue={actionData?.fields?.username}
                  invalid={Boolean(
                    actionData?.fields?.username
                  ) || undefined}
                  required={true}
                  placeholder='Username'
                />

                <InputBase
                  name="password"
                  id="password-input"
                  type="password"
                  label="Password"
                  labelCss="text-sm text-grey-600 font-semibold"
                  className="mt-2 mb-5 bg-grey-100"
                  invalid={Boolean(
                    actionData?.fieldErrors?.password
                  ) || undefined}
                  required={true}
                  placeholder='Password'
                />

                <button
                  disabled={transition.state !== 'idle'}
                  aria-disabled={transition.state !== 'idle'}
                  type='submit'
                  className="mt-2 btn btn-primary btn-lg btn-flex btn-primary-ring">
                  {transition.state === 'idle' ? 'Log In' : '...Loading'}
                </button>
              </Form>
            </div>}

            {user.wpAdmin && <div className='flex flex-row'>
              <div className='mr-2'>
                <a
                  rel='noopener noreferrer'
                  href={backendUrl}
                  className='btn btn-outline'
                  target={'_blank'}>
                  Visit CMS
                </a>
              </div>
              <div className='ml-2'>
                <form action="/logout" method="post">
                  <button type="submit" className="btn btn-sage-600">
                    Logout
                  </button>
                </form>
              </div>
            </div>}


          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Login

