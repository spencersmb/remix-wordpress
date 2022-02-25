import { ActionFunction, Form, json, Link, LoaderFunction, MetaFunction, redirect, useActionData, useLoaderData, useTransition } from 'remix'
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
import SubmitBtn from '~/components/buttons/submitBtn'
import OutlinedButton from '~/components/buttons/outlinedButton'
import ProcreateTitleCard from '~/components/cards/tuesdayMakers/procreateTitleCard'
import ProcreateMenu1 from '~/components/cards/tuesdayMakers/procreateMenu1'
import ProcreateMenu2 from '~/components/svgs/procreateMenu/procreateMenuTwoSvg'
import ProcreateMenu3 from '~/components/cards/tuesdayMakers/procreateMenu3'
import ProcreateMenu4Svg from '~/components/svgs/procreateMenu/procreateMenuFourSvg'
import LazyImageBase from '~/components/images/lazyImage-base'
import ProcreateMenuLayout from '~/components/cards/tuesdayMakers/procreateMenuLayout'


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
    return { formError: `Please enter an email address.` };
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

    return json({ form: 'success', email })
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
    <div className='py-16 bg-neutral-50 grid-container grid-resource-header laptop:pb-16 laptop:pt-0'>

      <div className='col-start-2 col-span-2 tablet:row-start-1 tablet:col-start-4 tablet:col-end-[12] tablet:mx-4 laptop:col-start-2 laptop:col-end-8 laptop:ml-[25px] laptop:mb-0 desktop:col-start-2 desktop:col-end-[7] laptop:justify-center flex flex-col'>
        <div className='flex flex-col mt-0 mb-8'>
          <h1 style={{ color: '#404764' }} className='relative mb-6 text-5xl font-sentinel__SemiBoldItal laptop:text-6xl desktop:text-7xl'>
            <span className='relative z-10'>
              Join Tuesday Makers
            </span>
            <span className='absolute bottom-[5px] w-full max-w-[481px] left-0 '>
              <StrokeOneSvg fill="#FECACA" opacity={'1'} />
            </span>
          </h1>
          <p className='relative z-10'>
            When you’re part of Tuesday Makers, you’re the first to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!
          </p>
        </div>
        <div className='flex flex-col'>

          {/* FORM */}
          <div className="login-form">
            {actionData?.formError && typeof actionData.formError === 'string' && (
              <div className="mb-4 text-red-600">
                {actionData.formError}
              </div>
            )}
            {actionData?.form !== 'success' && <Form ref={formRef} method='post' className="mb-4" aria-describedby={
              actionData?.formError
                ? "form-error-message"
                : undefined
            }>
              <div className='flex flex-col'>
                <div className='flex flex-col laptop:flex-row'>
                  <div className='flex-1 mb-4 laptop:mb-0 laptop:mr-3'>
                    <FormInputBasic
                      id='email-input'
                      type='email'
                      placeholder='Enter Email'
                      actionDataError={Boolean(
                        actionData?.fieldErrors?.email
                      ) || undefined}
                    />
                  </div>

                  {actionData?.fieldErrors?.email ? (
                    <p
                      className="form-validation-error"
                      role="alert"
                      id="email-error"
                    >
                      {actionData?.fieldErrors.email}
                    </p>
                  ) : null}
                  <SubmitBtn
                    className='flex-none btn btn-primary'
                    state={transition.state}
                    btnText={'Sign Up'}
                    key={'form-submit-btn'}
                  />
                </div>
                <div className='flex flex-row justify-center mt-6 laptop:justify-start'>
                  <div className='mr-3'>Already a member?</div>
                  <Link prefetch='intent' to={'/tuesday-makers/login'} className={'btn btn-primary btn-outlined p-0 text-xs uppercase px-2 rounded-md flex-none border-[1px] ring-2 ring-offset-1 leading-none'} >
                    Login
                  </Link>
                </div>
              </div>
            </Form>}

            {actionData?.form === 'success' && <div>
              <h2>Sucess</h2>
              <h3>Instructions</h3>
              <p>Accept email </p>
            </div>}
          </div>
        </div>
      </div>

      <div className='hidden z-10 relative col-start-2 col-span-2 row-start-2 tablet:mt-20 tablet:flex tablet:col-start-4 tablet:col-end-[12] tablet:w-full tablet:max-w-[490px] tablet:mx-auto laptop:max-w-[350px] laptop:ml-[120px] laptop:row-start-1 laptop:col-start-8 laptop:col-end-[14] laptop:mx-[40px] laptop:mt-20 laptop:mb-24 desktop:col-start-8 desktop:col-end-[14] desktop:ml-[150px] flex-col'>
        <ProcreateMenuLayout />
      </div>



    </div>
  )
}

export default ResourceLibraryHome
