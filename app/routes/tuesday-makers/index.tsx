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
import StrokeOneSvg from '~/components/svgs/strokes/stroke-1'
import FormInputBasic from '~/components/forms/formInput--base'


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
    // const res = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     api_key: process.env.CK_KEY,
    //     email,
    //   }),
    // })

    return json({ form: 'success' })
  } catch (e) {
    return json({ form: 'fail' })
  }

}

const ResourceLibraryHome = () => {
  let data = useLoaderData()
  consoleHelper(data);
  let actionData = useActionData<ActionData | undefined>();
  console.log('actionData', actionData);


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
    <div className='bg-neutral-50 grid-container grid-resource-header py-16 laptop:pb-16 laptop:pt-0'>

      <div className='mb-8 col-start-2 col-span-2 tablet:row-start-1 tablet:col-start-4 tablet:col-end-[12] tablet:mb-16 laptop:col-start-2 laptop:col-end-8 laptop:ml-[25px] laptop:mb-0 desktop:col-start-2 desktop:col-end-[8] laptop:justify-center flex flex-col'>
        <div className='mt-0 mb-16 tablet:mb-20 laptop:mt-0 laptop:mb-24 flex flex-col'>
          <h1 style={{ color: '#404764' }} className='mb-6 relative font-sentinel__SemiBoldItal text-5xl laptop:text-6xl  desktop:text-7xl'>
            <span className='relative z-10'>
              Join Tuesday Makers
            </span>
            <span className='absolute bottom-[5px] w-full max-w-[481px] left-0 laptop:bottom-[-70px] '>
              <StrokeOneSvg fill="#FECACA" opacity={'1'} />
            </span>
          </h1>
          <p>
            When you’re part of Tuesday Makers, you’re the first to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!
          </p>
        </div>
        <div className='flex flex-col'>

          <div className="login-form">
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
              <FormInputBasic
                id='email-input'
                type='email'
                placeholder='Enter Email'
                actionDataError={Boolean(
                  actionData?.fieldErrors?.email
                ) || undefined}
              />
              {/* <input
                id="email-input"
                type="email"
                placeholder='Enter Email'
                className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
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
              /> */}
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
        </div>
      </div>

      <div className='z-10 mb-16 relative col-start-2 col-span-2 row-start-2 tablet:flex tablet:col-start-4 tablet:col-end-[12]  laptop:row-start-1 laptop:col-start-8 laptop:col-end-[14] laptop:mx-[40px] laptop:mt-20 laptop:mb-24 desktop:col-start-8 desktop:col-end-[14] desktop:mx-0 flex-col'>
        cards
      </div>



    </div>
  )
}

export default ResourceLibraryHome
