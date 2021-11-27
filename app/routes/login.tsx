import { ActionFunction, createCookie, Form, json, LoaderFunction, redirect, useActionData } from 'remix'
import { Document, Layout } from '../root'
import * as React from 'react'
import {getViewerClientSide, logUserInClient, logUserInServer } from '../lib/api/fetch'


export let action: ActionFunction = async ({request}): Promise<any> => {
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
  let fieldErrors = {};

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };

  const response = await logUserInServer({username, password})
  let testCookie = createCookie("cookie-name", {
    // all of these are optional defaults that can be overridden at runtime
    domain: "localhost",
    // expires: new Date(Date.now() + 60),
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cret1"],
    secure: true
  });
  const wpCookies = response.headers.get('Set-Cookie') // Has 3 cookies in it
  const parsed = wpCookies?.split(',')
  const customHeaders = new Headers()
  parsed?.forEach((item, index) => {
    if(item.length === 0){
      return
    }
    customHeaders.append('Set-Cookie', item.trim() )
  })

  customHeaders.append('Set-Cookie', await testCookie.serialize(''))

  return redirect('/preview',{
    headers:customHeaders
  })
}

const Login = () => {
  let actionData = useActionData<any | undefined>();
  console.log('actionData', actionData)

  async function sendLogin(){
    const res = await logUserInClient({username: 'teelac', password: 'Sparkles0626311?!'})
    console.log('res', res)
  }

  async function getUser(){
    const res = await getViewerClientSide()
    console.log('res', await res.json())
  }

  return (
    <Layout>
      <div className="login-form bg-gray-100 rounded-lg p-8 md:ml-auto mt-10 md:mt-12 w-5/12 m-auto">
        <h4 className="text-gray-900 text-lg font-medium title-font mb-5 block">Login</h4>
        {/*{! isEmpty( errorMessage ) && (*/}
        {/*  <div*/}
        {/*    className="text-red-600"*/}
        {/*    dangerouslySetInnerHTML={{ __html: sanitize( errorMessage ) }}*/}
        {/*  />*/}
        {/*)}*/}
        <Form method='post' className="mb-4" aria-describedby={
          actionData?.formError
            ? "form-error-message"
            : undefined
        }>
          <div>
            <label htmlFor="username-input">Username</label>
            <input
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
                className="form-validation-error"
                role="alert"
                id="username-error"
              >
                {actionData?.fieldErrors.username}
              </p>
            ) : null}
          </div>
          <div>
          <label htmlFor="password-input" className="leading-7 text-sm text-gray-600">
            Password:
          </label>
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
          {actionData?.fieldErrors?.password ? (
            <p
              className="form-validation-error"
              role="alert"
              id="password-error"
            >
              {actionData?.fieldErrors.password}
            </p>
          ) : null}
          </div>
          <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Login
          </button>

          {/*{loading ? <p>Loading...</p> : null  }*/}
        </Form>
        <button onClick={sendLogin}>Client Side</button>
        <button onClick={getUser}>Get User</button>
      </div>
    </Layout>
  )
}

export default Login
