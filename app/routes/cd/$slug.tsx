import { Layout } from "~/root"
import { ActionFunction, Cookie, createCookie, Form, json, LoaderFunction, MetaFunction, redirect, useActionData, useLoaderData } from "remix"
import { procreateBonusCookie } from "~/cookies.server"
import { findCookie } from "~/utils/loaderHelpers"
import { getStaticPageMeta } from "~/utils/pageUtils";
import { getHtmlMetadataTags } from "~/utils/seo";
import { getlockedPageMetaTags, lockedPagesMeta } from "~/utils/lockedPagesUtils";
import { lockedPageServer } from "~/server/lockedPages.server";

export let meta: MetaFunction = (rootData) => (getlockedPageMetaTags(rootData))

export let loader: LoaderFunction = async ({ request, params }) => {
  const lookUpSlug = params.slug;

  if (!lookUpSlug) {
    throw new Response("Not Found", {
      status: 404
    });
  }
  const skillshareClass = lockedPageServer[lookUpSlug]

  const { hasCookie } = await findCookie(request, skillshareClass.cookie.data)

  if (hasCookie) {
    return redirect(skillshareClass.membersPath)
  }

  return json({
    title: skillshareClass.title
  })
}

export let action: ActionFunction = async ({ request, params }) => {
  const lookUpSlug = params.slug;
  if (!lookUpSlug) {
    return { formError: `No Url Parameter` };
  }
  const skillshareClass = lockedPageServer[lookUpSlug]

  let form = await request.formData();
  let password = form.get('password')
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof password !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }
  const serverPw = skillshareClass.password
  if (!serverPw) {
    return { formError: `Server Password Not Found.` };
  }

  let fields = { password };
  let fieldErrors = {
    password: password !== serverPw ? `Incorrect Password` : undefined
  };

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };

  const customHeaders = new Headers()
  customHeaders.append('Set-Cookie', await skillshareClass.cookie.data.serialize({
    [skillshareClass.cookie.key]: true
  }))
  return redirect(skillshareClass.membersPath, {
    headers: customHeaders,
  })

}

const BeautifulLetteringBonuses = () => {
  let { title } = useLoaderData();
  let actionData = useActionData<PasswordActionData | undefined>();

  return (
    <Layout>
      Locked Page Template: {title}
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
    </Layout>
  )
}

export default BeautifulLetteringBonuses