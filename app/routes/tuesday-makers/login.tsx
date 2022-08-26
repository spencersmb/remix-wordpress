
import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import { createResourceUserSession, getResourceUser } from "@App/utils/resourceLibrarySession.server";
import { getBasicPageMetaTags } from "@App/utils/seo";
import { validateEmail } from "@App/utils/validation";
import InputBase from "@App/components/forms/input/inputBase";
import { XCircleIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import { cacheControl } from "@App/lib/remix/loaders";
import Layout from "@App/components/layoutTemplates/layout";
import { classNames } from "@App/utils/appUtils";
import { useEffect, useRef, useState } from "react";
import AccentHeaderText from "@App/components/layout/accentHeaderText";
import BellSvg from "@App/components/svgs/bellSvg";
import useSite from "@App/hooks/useSite";
import GeneralMessageModal from "@App/components/modals/generalMessageModal";
import BasicSubmitBtn from "@App/components/buttons/basicSubmitBtn";

export let meta: MetaFunction = (metaData): any => {

  /*
  metaData gets passed in from the root metadata function
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

export let loader: LoaderFunction = async ({ request }) => {
  const user = await getResourceUser(request)

  if (user) {
    return redirect('/tuesday-makers/members')
  }

  const page = {
    title: 'Tuesday Makers: Login',
    slug: 'tuesday-makers/login',
    description: 'First to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!',
    seo: {
      title: 'Tuesday Makers Login',
      opengraphModifiedTime: '',
      metaDesc: 'First to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!'
    }
  }
  return json({ page }, { headers: { ...cacheControl } })
};

type ActionData = {
  formError?: string;
  subscriberError?: string
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

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };

  // Fetch Subscriber
  const url = `https://api.convertkit.com/v3/subscribers?api_secret=${process.env.CK_SECRET}&email_address=${email}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const result = await res.json()

  if (result.total_subscribers === 0 || result.subscribers[0].state !== 'active') {
    return { subscriberError: `Sorry, Email invalid.` };
  }

  // Get subscriber Tags and create session
  let userId = result.subscribers[0].id
  // const urlTags = `https://api.convertkit.com/v3/subscribers/${userId}/tags?api_secret=${process.env.CK_SECRET}`;

  // const resTag = await fetch(urlTags, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // })
  // const tagResults = await resTag.json()
  const user = {
    id: userId,
    tags: []
    // tags: tagResults.tags.map((tag: { id: string, name: string, created_at: string }) => tag.name)
  }


  let sessionStorage = createResourceUserSession(user)
  const customHeaders = new Headers()
  customHeaders.append('Set-Cookie', await sessionStorage)

  // Wait to redirect here, pass down the logged in user, so I can add it to context, then redirect.
  return redirect('/tuesday-makers/members', {
    headers: customHeaders,
  })

  // return json({
  //   user
  // }, {
  //   headers: customHeaders
  // })

}

const ResourceLibraryLogin = () => {
  let actionData = useActionData<ActionData | undefined>();
  const transition = useTransition()
  const { openModal, closeModal } = useSite()
  const [inputVaue, setInputValue] = useState<null | string>(null)
  const [usedOldPassword, setUsedOldPassword] = useState(false)
  const formRef = useRef<null | HTMLFormElement>(null)
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { value } = e.target;
    setInputValue(value)
  }

  useEffect(() => {
    if (inputVaue === 'TUESDAYHUSTLERS') {
      openModal({
        template: <GeneralMessageModal
          closeModal={closeModal}
          header={'Old password'}
          message={'You\'re trying to use the old password. Please use your email associated with Every-Tuesday. If you don\'t have one create a new account. If you need help please email us.'}
        />
      })

      if (formRef.current) {
        const searchInput: HTMLInputElement = Array.from(formRef.current.elements)
          .find((input: any) => input.type === 'email') as HTMLInputElement

        searchInput.blur();
        formRef.current.reset()
      }

    }
  }, [inputVaue, formRef])



  return (
    <div className={classNames('', 'pt-[var(--nav-top-sm)] laptop:pt-[var(--nav-top-lg)]')}>
      <div className='bg-[#F7F6F7] grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>


        {/* FORM */}
        <div className="col-span-2 col-start-2 px-3 py-8 tablet:py-12 mt-8 mb-4 tablet:mt-8 tablet:mb-8 bg-white shadow-et_2_lg tablet:px-12 tablet:col-start-4 tablet:col-span-8 laptop:col-start-5 laptop:col-span-6 max-w-[525px] w-full mx-auto rounded-lg">
          <div className="flex flex-col items-center px-4">

            <div className="flex flex-col items-center mb-8 text-center">
              <h1 className="relative flex flex-col text-3xl laptop:text-5xl text-sage-700 font-sentinel__SemiBoldItal">
                <span className="mb-4 text-[44px] laptop:text-[54px] italic font-light font-bonVivant">Tuesday Makers</span>
                Login
              </h1>
            </div>

            {/*ERROR SUBMISSION*/}
            {/* @ts-ignore */}
            <AnimatePresence>
              {actionData?.subscriberError && transition.state === 'idle' &&
                <motion.div
                  key={'subscriberError'}
                  id="subscriberError"
                  initial={containerMotion.closed}
                  animate={containerMotion.open}
                  exit={containerMotion.closed}
                  className="overflow-hidden text-red-800 bg-red-200 rounded-xl">
                  <div className="flex flex-row items-center justify-center p-3 ">
                    <div className="max-w-[24px] w-full mr-2">
                      <XCircleIcon fill={'#7F1D1D'} />
                    </div>
                    <p>
                      No user found, please sign up below.
                    </p>
                  </div>
                </motion.div>}
            </AnimatePresence>


            <div className="login_form relative z-[2] mt-4 w-full">
              <Form ref={formRef} method='post' className="flex flex-col" aria-describedby={
                actionData?.formError
                  ? "form-error-message"
                  : undefined
              }>

                <InputBase
                  label="Email"
                  labelCss="text-sm text-grey-600 font-semibold"
                  className="mt-2 mb-5 bg-grey-100"
                  invalid={Boolean(
                    actionData?.fieldErrors?.email
                  ) || undefined}
                  id='email-input'
                  name='email'
                  type='email'
                  required={true}
                  placeholder='Enter your email'
                  onChange={handleInputChange}
                />

                <BasicSubmitBtn
                  loading={(transition.state !== 'idle' && transition.state === 'submitting') || usedOldPassword}
                  loadingText={'Loading'}
                  text={'Sign In'}
                  className="btn-lg btn-primary-ring"
                />

              </Form>
            </div>

            <div className="w-full z-[1] relative flex flex-col items-center justify-center text-center">
              <div className="italic">
                <span className="z-[1] absolute top-[50%] translate-y-[-50%] h-[1px] bg-black w-full left-0" />
                <div className="p-4 bg-white relative z-[2]">Don’t have an account?</div>
              </div>
            </div>

            <div className="flex flex-row relative z-[2] w-full">
              <Link
                prefetch={'intent'}
                className="btn btn-outline btn-flex btn-lg"
                to="/tuesday-makers">
                Sign Up
              </Link>
            </div>

            {/* <div className={'text-center'}>
              <h3 className={'font-semibold'}>Having trouble?</h3>
              <p className={'text-sm'}><Link prefetch={'intent'} to="/contact" className={'font-semibold underline underline-offset-4 text-primary-500'}>Contact Us</Link></p>
            </div> */}

          </div>
        </div>

        {/* ALERT */}
        <div className="bg-sage-200 p-4 max-w-[725px] mx-auto mb-8 col-span-2 col-start-2 tablet:p-8 tablet:mb-16 tablet:col-start-2 tablet:col-span-12 laptop:col-start-4 laptop:col-span-8 desktop:col-start-5 desktop:col-span-6">
          <div className="flex flex-row items-start justify-center">
            {/* ICON BELL */}
            <div className="flex items-center justify-center mb-5 mr-4 tablet:mr-8 tablet:mb-0">
              <div className="rounded-full bg-sage-100 p-[9px] w-[39px] h-[39px] tablet:w-[66px] tablet:h-[66px] tablet:p-[15px]">
                <BellSvg fill="var(--sage-500)" />
              </div>
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col">
              <p className="mb-4 text-sage-600 tablet:text-xl">
                An active Tuesday Makers account is required to login. If you don’t have an account, signup for one today.
              </p>

              <div className="flex flex-row tablet:text-xl">
                <Link to={"/contact"} className="font-semibold underline text-sage-800">
                  Help
                </Link>
                <Link to={"/contact"} className="ml-4 font-semibold underline text-sage-800">
                  Sign Up
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default ResourceLibraryLogin

const containerMotion = {
  closed: {
    height: 0,
    y: '-15%'
  },
  open: {
    height: 'auto',
    y: 0
  }
}