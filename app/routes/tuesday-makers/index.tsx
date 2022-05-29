
import { getResourceUserToken } from '../../utils/resourceLibrarySession.server'
import * as React from 'react'
import { useEffect } from 'react'
import { fetchAPIClientSide } from '../../utils/fetch.cleint'
import { GetAllFreebiesQuery } from '../../lib/graphql/queries/resourceLibrary'
import { consoleHelper } from '../../utils/windowUtils'
import { getGraphQLString } from '../../utils/graphqlUtils'
import { getBasicPageMetaTags, getHtmlMetadataTags } from '@App/utils/seo'
import { ckFormIds } from '@App/lib/convertKit/formIds'
import { validateEmail } from '@App/utils/validation'
import SubmitBtn from '@App/components/buttons/submitBtn'
import ProcreateMenuLayout from '@App/components/cards/tuesdayMakers/procreateMenuLayout'
import SpecialDeals from '@App/components/layout/specialDeals'
import TuesdayMakersBulletCards from '@App/components/layout/tuesdayMakersBulletCards'
import useSite from '@App/hooks/useSite'
import SignUpInstructionsPopUp from '@App/components/modals/signUpInstructionsPopUp'
import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useLoaderData, useTransition } from '@remix-run/react'
import { fetchConvertKitSignUp } from '@App/utils/fetch.server'
import { ckSignUpCookie } from '@App/cookies.server'
import { getCKFormId } from '@App/utils/resourceLibraryUtils'
import InputBase from '@App/components/forms/input/inputBase'


export let meta: MetaFunction = (metaData): any => {

  /*
  rootData gets passed in from the root metadata function
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
    title: `Tuesday Makers: SignUp`,
    desc: `First to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!`,
    slug: `tuesday-makers`
  })
};

// REDO LOADER WITH NEW HELPERS
export let loader: LoaderFunction = async ({ request }) => {

  // Check for Resource User Cookie
  // If found redirect them to /members
  const user = await getResourceUserToken(request)

  if (user) {
    return redirect('/tuesday-makers/members')
  }

  const page = {
    title: 'Tuesday Makers',
    slug: 'tuesday-makers',
    description: 'First to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!',
    seo: {
      title: 'Tuesday Makers',
      opengraphModifiedTime: '',
      metaDesc: 'First to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!'
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
  const customHeaders = new Headers()
  let form = await request.formData();
  let email = form.get('email')
  let formType = form.get('type') as string
  const ckId = getCKFormId(formType)
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

    const fetch = await fetchConvertKitSignUp({ email, id: ckId })
    customHeaders.append('Set-Cookie', await ckSignUpCookie.serialize({
      userID: fetch.subscription.subscriber.id,
      email,
    }))
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

  React.useEffect(() => {
    if (actionData?.form === 'success') {
      openModal({
        template: <SignUpInstructionsPopUp
          closeModal={closeModal}
        />
      })
    }
  }, [actionData])

  const { openModal, closeModal } = useSite()


  return (
    <>
      <div className='pt-5 bg-neutral-50 grid-container grid-resource-header tablet:pt-8 laptop:pt-0'>

        <div className='col-start-2 col-span-2 mt-[50px] tablet:col-start-2 tablet:col-end-[14] tablet:mt-24 tablet:px-5 laptop:px-0 laptop:col-start-2 laptop:col-end-8 laptop:ml-[25px] laptop:mb-0 desktop:col-start-2 desktop:col-span-5 laptop:justify-center flex flex-col'>

          {/* HEADER TITLE */}
          <div className='flex flex-col mt-0 mb-5 tablet:mb-12 tablet:flex-row laptop:flex-col'>
            <h1 style={{ color: '#404764' }} className='relative flex mb-3 text-4xl tablet:text-5xl font-sentinel__SemiBoldItal tablet:mr-4 tablet:flex-1 tablet:text-right laptop:text-left laptop:justify-end laptop:text-6xl desktop:text-7xl'>
              <span className='relative z-10'>
                Join Tuesday Makers
              </span>
            </h1>
            <p className='relative z-10 tablet:flex-1 tablet:ml-4 laptop:ml-0'>
              When you’re part of Tuesday Makers, you’re the first to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!
            </p>
          </div>

          {/* SIGNUP FORM */}
          {/* <div className='flex flex-col max-w-[500px] w-full mx-auto laptop:mx- laptop:w-auto laptop:max-w-none'> */}
          <div className=''>

            {/* FORM */}
            <div className="login-form">
              {actionData?.formError && typeof actionData.formError === 'string' && (
                <div className="mb-4 text-red-600">
                  {actionData.formError}
                </div>
              )}
              <Form ref={formRef} method='post' className="mb-4" aria-describedby={
                actionData?.formError
                  ? "form-error-message"
                  : undefined
              }>
                <div className='flex flex-col form_inner'>
                  <div className='flex flex-col input_wrapper'>
                    <div className='flex-1 mb-4 '>
                      <InputBase
                        id='email-input'
                        name='email'
                        type='email'
                        required={true}
                        placeholder='email@gmail.com'
                        invalid={Boolean(
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

                    <div>
                      <input type="text" name='type' value='landing-page' readOnly className='hidden' />
                    </div>

                    <SubmitBtn
                      className='flex-none btn btn-primary'
                      transition={transition}
                      btnText={'Sign Up'}
                      key={'form-submit-btn'}
                    />
                  </div>
                  <div className='flex flex-row justify-center mt-6 signup_wrapper laptop:justify-start'>
                    <div className='mr-3'>Already a member?</div>
                    <Link prefetch='intent' to={'/tuesday-makers/login'} className={'btn btn-primary btn-outlined p-0 text-xs uppercase px-2 rounded-md flex-none border-[1px] ring-2 ring-offset-1 leading-none'} >
                      Login
                    </Link>
                  </div>
                </div>
              </Form>

              {/* {actionData?.form === 'success' && <div>
              <h2>Sucess</h2>
              <h3>Instructions</h3>
              <p>Accept email </p>
            </div>} */}
            </div>
          </div>
        </div>

        <div className='max-w-[220px] mx-auto z-10 relative col-start-2 col-span-2 row-start-1 tablet:flex tablet:col-start-4 tablet:col-end-[12] tablet:w-full tablet:max-w-[415px] tablet:mx-auto laptop:max-w-[350px] laptop:ml-[120px] laptop:row-start-1 laptop:col-start-8 laptop:col-end-[14] laptop:mx-[40px] laptop:mt-20 laptop:mb-24 desktop:col-start-9 desktop:col-end-[14] desktop:ml-[0] flex-col'>
          <ProcreateMenuLayout />
        </div>

        <div className='col-start-1 col-span-4 tablet:col-start-2 tablet:col-end-[14]'>
          <SpecialDeals />
        </div>

        <TuesdayMakersBulletCards />

      </div>
    </>

  )
}

export default ResourceLibraryHome
