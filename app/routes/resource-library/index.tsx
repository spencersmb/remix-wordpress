import { ActionFunction, Form, json, LoaderFunction, useActionData } from 'remix'
import * as React from 'react'
import { Layout } from '../../root'

export let loader: LoaderFunction = async ({ params }) => {
  const page = {
    title: 'Resource Library',
    slug: 'resource-library',
    description: 'A jam packed resource library of design + lettering files',
    seo:{
      title: 'Resource Library - Every Tuesday',
      opengraphModifiedTime: '',
      metaDesc: 'When you join the Tuesday Tribe, you’ll receive instant access to the Resource Library, filled with textures, fonts, vectors, stationery, graphics, cheat sheets and more.'
    }
  }
  return json({page}, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate" } })
};

type ActionData = {
  formError?: string;
  fieldErrors?: {
    password: string | undefined;
  };
  fields?: {
    password: string;
  };
};

export let action: ActionFunction = async ({request}): Promise<ActionData | Response> => {
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
    password: password !== process.env.RESOURCE_LIBRARY_PW ?  `Incorrect Password` : undefined
  };

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };

  return { formError: `Form not submitted correctly.` };

}

const CustomNav = () => {
  return(
    <nav>
      <li>Nav</li>
    </nav>
  )
}
const ResourceLibrarySignUp = () => {
  let actionData = useActionData<ActionData | undefined>();
  return (
      <Layout alternateNav={<CustomNav/>}>
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
          {/*{loading ? <p>Loading...</p> : null  }*/}
        </Form>
      </div>
    </Layout>
  )
}

export default ResourceLibrarySignUp
