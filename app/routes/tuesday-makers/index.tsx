
import { getResourceUser } from '../../utils/resourceLibrarySession.server'
import * as React from 'react'
import { useEffect } from 'react'
import { fetchAPIClientSide } from '../../utils/fetch.cleint'
import { GetAllFreebiesQuery } from '../../lib/graphql/queries/resourceLibrary'
import { consoleHelper } from '../../utils/windowUtils'
import { getGraphQLString } from '../../utils/graphqlUtils'
import { getBasicPageMetaTags } from '@App/utils/seo'
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
import { cacheControl } from '@App/lib/remix/loaders'
import IpadHeader1 from '@App/components/layout/headers/ipadHeader1'
import TmSignupForm from '@App/components/forms/tuesdayMakers/tmSignupForm'
import IpadLongShadow from '@App/components/images/ipadLongShadow'
import LazyImgix from '@App/components/images/lazyImgix'
import WygSubscriber from '@App/components/forms/tuesdayMakers/wygSubscriber'


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
  const user = await getResourceUser(request)

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
  return json({ page }, {
    headers: {
      ...cacheControl,
    }
  })
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
  let formType = form.get('_action') as string
  let honeyPot = form.get('lastName')

  const ckId = getCKFormId(formType)


  if (!formType) {
    console.error('RemixSignUpAction: formType is null')
    return json({
      status: 500,
      message: 'No form type provided',
    })
  }

  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof email !== "string" ||
    typeof honeyPot !== "string" ||
    honeyPot.length !== 0
  ) {
    return json({
      formError: {
        [formType]: {
          message: 'No email provided',
          formId: 'error'
        }
      },
    })
  }

  let fields = { email };
  let fieldErrors = {
    email: validateEmail(email)
  };

  consoleHelper('fieldErrors', fieldErrors, '/routes/tuesday-makers/index.tsx', { bg: '#cc2c5c', text: '#fff' })

  if (Object.values(fieldErrors).some(Boolean))
    return json({ fieldErrors, fields });

  // Intercept the request and respond with a fake response when testing
  if (process.env.NODE_ENV === 'test') {
    return json({
      form: {
        [formType]: {
          message: 'success',
          formId: formType
        }
      }
    })
  }

  try {

    // Sign user up
    const fetch = await fetchConvertKitSignUp({ email, id: ckId })

    // Add temporary cookie to browser to process on thankyou page
    customHeaders.append('Set-Cookie', await ckSignUpCookie.serialize({
      userID: fetch.subscription.subscriber.id,
      email,
    }))

    return json({
      form: {
        [formType]: {
          message: 'success',
          email,
          formId: formType,
          // fetch
        }
      }
    })
  } catch (error: any) {
    console.error(error.message)
    console.error(error.response)
    return json({
      formError: {
        [formType]: {
          message: `Something went wrong. Please try again later. Error: ${error.message}`,
          formId: formType
        }
      }
    })
  }

}

const ResourceLibraryHome = () => {
  let data = useLoaderData()
  let actionData = useActionData<ActionData | undefined>();

  useEffect(() => {
    consoleHelper('data', data, 'tuesday-makers/index.tsx');
    consoleHelper('actionData', actionData, 'tuesday-makers/index.tsx');
  }, [actionData, data]);

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
  // consoleHelper('data.form !==', data.form, '/routes/tuesday-makers/index.tsx');

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
  const iPadArt = {
    width: 1400,
    height: 1049,
    alt: `Every Tuesday IPad Art`,
    src: 'https://et-teachable.imgix.net/procreate601/class-projects.jpg',
    placeholder: 'https://et-teachable.imgix.net/procreate601/class-projects.jpg?w=20&fit=clip'
  }
  const bgPaintStrokes = {
    width: 3046,
    height: 2456,
    alt: `Every Tuesday IPad Art`,
    src: 'https://et-website.imgix.net/et-website/images/tm-bg-1.jpg?auto=format',
    placeholder: 'https://et-website.imgix.net/et-website/images/tm-bg-1.jpg?auto=format&w=20&fit=clip'
  }
  return (
    <div className='bg-cream-100 pt-[68px] laptop:pt-[96px]'>
      <div className='relative et-grid-basic'>

        {/* BG PAINT */}
        <div className='absolute top-[-34px] w-full -translate-x-1/2 left-1/2 tablet:w-[930px] tablet:top-[-110px] desktop:w-[1540px] desktop:top-[-170px]'>
          <LazyImgix
            visibleByDefault={true}
            id={"iPadArt"}
            image={bgPaintStrokes} />
        </div>

        {/* IPAD HEADER */}
        <div className='mt-40 mb-40 col-start-2 col-span-2 tablet:mt-80 tablet:mb-60 tablet:col-start-2 tablet:col-end-[14] laptop:px-0 laptop:col-start-3 laptop:col-end-13 desktop:mt-[550px] desktop:mb-72 desktop:col-start-2 desktop:col-span-12 tablet:justify-center flex flex-col relative'>

          <IpadHeader1>

            <div className='w-full tablet:max-w-[678px] tablet:mx-auto'>
              {/* SIGNUP FORM */}
              <TmSignupForm formName={'landing-page'} inputBg={'bg-white hover:ring-offset-cream-100'} />

              {/* LOGIN LINK */}
              <div className='flex flex-row justify-center mt-6 signup_wrapper'>
                <div className='mr-3'>Already a member?</div>
                <Link prefetch='intent' to={'/tuesday-makers/login'} className={'btn btn-primary btn-outlined p-0 text-xs uppercase px-2 rounded-md flex-none border-[1px] ring-2 ring-offset-1 leading-none'} >
                  Login
                </Link>
              </div>
            </div>

          </IpadHeader1>

        </div>

        {/* DUAL IPADS */}
        <div className='relative col-span-2 col-start-2 tablet:col-span-full laptop:col-start-4 laptop:col-span-9 desktop:col-start-5 desktop:col-span-9'>
          <div className='relative z-1 left-20 tablet:left-40'>
            <IpadLongShadow image={iPadArt} />
          </div>
          <div className='absolute w-full top-[-20%] -left-1/2 z-2'>
            <IpadLongShadow image={iPadArt} />
          </div>
        </div>

        <div className='col-span-full bg-cream-300'>
          <WygSubscriber />
        </div>

      </div>
    </div>

  )
}

export default ResourceLibraryHome
