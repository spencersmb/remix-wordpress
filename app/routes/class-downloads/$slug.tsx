import { Layout } from "~/root"
import { ActionFunction, Form, json, LoaderFunction, MetaFunction, redirect, useActionData, useLoaderData, useTransition } from "remix"
import { findCookie } from "~/utils/loaderHelpers"
import { getlockedPageMetaTags, getLockedPageRedirectMembersPath } from "~/utils/lockedPagesUtils";
import { createLockedPageCookie } from "~/server/lockedPages.server";
import { gql } from "@apollo/client";
import { fetchAPI } from "~/utils/fetch";
import { getGraphQLString } from "~/utils/graphqlUtils";

export let meta: MetaFunction = (rootData) => (getlockedPageMetaTags(rootData))

export let loader: LoaderFunction = async ({ request, params }) => {

  const lookUpSlug = params.slug;

  if (!lookUpSlug) {
    throw new Response("Not Found", {
      status: 404
    });
  }

  let { downloadGridBy } = await fetchAPI(getGraphQLString(query), {
    variables: {
      slug: lookUpSlug
    }
  })

  if (!downloadGridBy) {
    throw new Response("Not Found", {
      status: 404
    });
  }

  const getCookie = createLockedPageCookie(downloadGridBy.page.cookie.name)

  const { hasCookie } = await findCookie(request, getCookie)

  if (hasCookie) {
    return redirect(getLockedPageRedirectMembersPath(lookUpSlug))
  }

  return json({
    ...downloadGridBy
  })
}

export let action: ActionFunction = async ({ request, params }) => {
  const lookUpSlug = params.slug;
  if (!lookUpSlug) {
    return { formError: `No Url Parameter` };
  }

  let form = await request.formData();
  let password = form.get('password')
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof password !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }
  let { downloadGridBy } = await fetchAPI(getGraphQLString(query), {
    variables: {
      slug: lookUpSlug
    }
  })
  // const serverPw = skillshareClass.password
  // if (!serverPw) {
  //   return { formError: `Server Password Not Found.` };
  // }

  let fields = { password };
  let fieldErrors = {
    password: password !== downloadGridBy.page.password ? `Incorrect Password` : undefined
  };

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };

  const customHeaders = new Headers()
  const createPageCookie = createLockedPageCookie(downloadGridBy.page.cookie.name)
  customHeaders.append('Set-Cookie', await createPageCookie.serialize({
    [downloadGridBy.page.cookie.key]: true
  }))
  const membersPath = getLockedPageRedirectMembersPath(lookUpSlug)
  return redirect(membersPath, {
    headers: customHeaders,
  })
}

const LockePageLogin = () => {
  let data = useLoaderData();
  console.log('locked page data', data);
  let transition = useTransition()
  let actionData = useActionData<PasswordActionData | undefined>();

  return (
    <Layout>
      Locked Page Template
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
          <button
            disabled={transition.state !== 'idle'}
            aria-disabled={transition.state !== 'idle'}
            type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            {transition.state === "idle" ? 'Login' : '...loading'}
          </button>
        </Form>
      </div>
    </Layout>
  )
}

export default LockePageLogin

const query = gql`
  query LockedPageQuery($slug: String!) {
    downloadGridBy(slug: $slug) {
      title
      slug
      modified
      page {
        password
        cookie {
          key
          name
        }
      }
    }
  }
`