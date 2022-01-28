import { ActionFunction, Form, json, LoaderFunction, MetaFunction, redirect, useActionData, useLoaderData, useTransition } from 'remix'
import { getResourceUserToken } from '../../utils/resourceLibrarySession.server'
import * as React from 'react'
import { useEffect } from 'react'
import { fetchAPIClientSide } from '../../utils/fetch'
import { GetAllFreebiesQuery } from '../../lib/graphql/queries/resourceLibrary'
import { consoleHelper } from '../../utils/windowUtils'
import { getGraphQLString } from '../../utils/graphqlUtils'
import { getHtmlMetadataTags } from '~/utils/seo'
import { ckFormIds } from '~/lib/convertKit/formIds'
import { validateEmail } from '~/utils/validation'


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

  // TODO: Replace with Page component
  const page: IPage = {
    id: '24',
    title: 'Resource Library',
    author: {
      id: '22',
      name: 'Teela',
      avatar: {
        url: '',
        width: 24,
        height: 24
      },
      slug: 'resource-library'
    },
    slug: 'resource-library',
    content: '',
    date: '',
    seo: {
      title: 'Resource Library - Every Tuesday',
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

//TODO make api call to convertkit to check for email_subscriber
// IF valid subscriber then log them in

export let loader: LoaderFunction = async ({ request }) => {

  // Check for Resource User Cookie
  // If found redirect them to /members
  const user = await getResourceUserToken(request)

  if (user) {
    return redirect('/tuesday-makers/members')
  }

  // TODO: ADD THIS TO ALL PAGES FOR JSLONLD CONTENT EXAMPLE BELOW
  const page = {
    title: 'Resource Library',
    slug: 'resource-library',
    description: 'A jam packed resource library of design + lettering files',
    seo: {
      title: 'Resource Library - Every Tuesday',
      opengraphModifiedTime: '',
      metaDesc: 'When you join the Tuesday Tribe, you’ll receive instant access to the Resource Library, filled with textures, fonts, vectors, stationery, graphics, cheat sheets and more.'
    }
  }
  return json({ page }, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate" } })
};

type ActionData = {
  formError?: string;
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

  consoleHelper('fieldErrors', fieldErrors)
  const id = ckFormIds.resourceLibrary.landingPage
  const url = `https://api.convertkit.com/v3/forms/${id}/subscribe`;

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };

  try {
    // Sign user up
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.CK_KEY,
        email,
      }),
    })

    return json({ form: 'success' })
  } catch (e) {
    return json({ form: 'fail' })
  }

}

const ResourceLibraryHome = () => {
  let data = useLoaderData()
  consoleHelper(data);
  let actionData = useActionData<ActionData | undefined>();

  /*
  ON page load prefetch data query to speed things up
   */
  useEffect(() => {
    async function prefetchData() {
      await fetchAPIClientSide(getGraphQLString(GetAllFreebiesQuery))
    }
    prefetchData().catch()
  }, [])

  const formRef: any = React.useRef()
  const transition = useTransition()

  React.useEffect(() => {
    if (transition.state === 'submitting') {
      formRef.current?.reset()
    }
  }, [transition])
  consoleHelper('data.form !==', data.form)
  return (
    <div className="login-form bg-gray-100 rounded-lg p-8 md:ml-auto mt-10 md:mt-12 w-5/12 m-auto">
      <h4 className="text-gray-900 text-lg font-medium title-font mb-5 block">Tuesday Makers Sign Up</h4>
      {/*{! isEmpty( errorMessage ) && (*/}
      {/*  <div*/}
      {/*    className="text-red-600"*/}
      {/*    dangerouslySetInnerHTML={{ __html: sanitize( errorMessage ) }}*/}
      {/*  />*/}
      {/*)}*/}
      {actionData?.form !== 'success' && <Form ref={formRef} method='post' className="mb-4" aria-describedby={
        actionData?.formError
          ? "form-error-message"
          : undefined
      }>
        <label htmlFor="email-input" className="leading-7 text-sm text-gray-600">
          Email:
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
          {transition.state === 'idle' ? 'Sign Up' : '...Loading'}
        </button>
        {/*{loading ? <p>Loading...</p> : null  }*/}
      </Form>}

      {actionData?.form === 'success' && <div>
        <h2>Sucess</h2>
        <h3>Instructions</h3>
        <p>Accept email </p>
      </div>}
    </div>
  )
}

export default ResourceLibraryHome
