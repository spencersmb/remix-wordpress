import Layout from "@App/components/layoutTemplates/layout"
import { findCookie } from "@App/utils/loaderHelpers"
import { getlockedPageMetaTags, getLockedPageRedirectMembersPath } from "@App/utils/lockedPagesUtils";
import { createLockedPageCookie } from "@App/server/lockedPages.server";
import gql from 'graphql-tag';
import { fetchAPI } from "@App/utils/fetch.server";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { lockedPagesMeta } from "@App/lib/lockedPages/classDownloads";
import { consoleHelper } from "@App/utils/windowUtils";
import InputBase from "@App/components/forms/input/inputBase";
import { AnimatePresence } from "framer-motion";
import FormErrorMessage from "@App/components/forms/messages/ErrorMessage";

export let meta: MetaFunction = (rootData) => (getlockedPageMetaTags(rootData))

export let loader: LoaderFunction = async ({ request, params }) => {

  const lookUpSlug = params.slug;

  if (!lookUpSlug) {
    throw new Response("Not Found", {
      status: 404
    });
  }

  const lockedMeta = lockedPagesMeta[lookUpSlug]

  if (!lockedMeta) {
    return {
      title: '404',
      description: 'error: No Locked Data found',
    }
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

  // PAGE coming from the server needs to be renamed so that JSONLD doesn't get crossed with wrong data
  const response = {
    ...downloadGridBy,
    serverPage: downloadGridBy.page,
    page: lockedMeta.page
  }
  return json({
    ...response
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
  let { page } = data;
  consoleHelper('locked page data', data);
  let transition = useTransition()
  let actionData = useActionData<PasswordActionData | undefined>();

  return (
    <Layout>
      <div className='bg-[#F7F6F7] grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>
        <div className="col-span-2 col-start-2 px-3 py-16 my-16 bg-white shadow-et_2_lg tablet:px-12 tablet:col-start-4 tablet:col-span-8 laptop:col-start-5 laptop:col-span-6 max-w-[525px] w-full mx-auto rounded-lg">
          <div className="flex flex-col items-center">

            {/* HEADER */}
            <div className="flex flex-col items-center mb-8 text-center">
              <h1 className="mb-4 text-5xl text-sage-700 font-sentinel__SemiBoldItal">
                {page.title}
              </h1>
              <h2 className="text-lg text-grey-500">Login below using the password provided to you in the class.</h2>
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

            {/* FORM */}
            <div className="login_form relative z-[2] mt-4 w-full">
              <Form
                method='post'
                className="flex flex-col"
                aria-describedby={
                  actionData?.formError
                    ? "form-error-message"
                    : undefined
                }>

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
                  className="btn btn-primary btn-lg">
                  {transition.state === 'idle' ? 'Log In' : '... Loading'}
                </button>

              </Form>
            </div>

          </div>
        </div>
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