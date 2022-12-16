
import {
  getPreviewRedirectUrlFromParams,
  getPreviewUrlParams,
} from '../utils/loaderHelpers'
import { logUserInJWT } from '../utils/fetch.server'
import { createUserSession, setFutureDate } from '../utils/session.server'
import { mdxPageMetaV2 } from '../utils/seo'
import Layout from '@App/components/layoutTemplates/layout'
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getStaticPageMeta } from '@App/utils/pageUtils'
import { cacheControl } from '@App/lib/remix/loaders'
import AdminLoginTemplate from '@App/components/pageTemplates/adminLoginTemplate'

const page = getStaticPageMeta({
  title: `Login Page`,
  desc: `Login Page for Every-Tuesday`,
  slug: `login`,
})
export let meta = mdxPageMetaV2


export let loader: LoaderFunction = async ({ request }) => {
  const { id, postType, url } = getPreviewUrlParams(request)

  return json({
    page,
    params: {
      id,
      postType,
      url
    }
  }, {
    headers: {
      // ...cacheControl
    }
  })
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
export let action: ActionFunction = async ({ request }): Promise<ActionData | Response> => {
  let form = await request.formData();
  let password = form.get('password')
  let username = form.get('username')
  let honeyPot = form.get('email')
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof password !== "string" ||
    typeof username !== "string" ||
    typeof honeyPot !== "string" ||
    honeyPot.length !== 0
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

const Login = () => {

  let { params } = useLoaderData<typeof loader>()

  return (
    <Layout>
      <AdminLoginTemplate params={params} />
    </Layout>
  )
}

export default Login

