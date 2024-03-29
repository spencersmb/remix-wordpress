
import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import { createResourceUserSession, getResourceUser } from "@App/utils/resourceLibrarySession.server";
import { getBasicPageMetaTags, mdxPageMetaV2 } from "@App/utils/seo";
import { validateEmail } from "@App/utils/validation";
import InputBase from "@App/components/forms/input/inputBase";
import { ArrowRightIcon, XCircleIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@App/components/layoutTemplates/layout";
import { classNames } from "@App/utils/appUtils";
import type { MutableRefObject } from "react";
import { useEffect, useRef, useState } from "react";
import AccentHeaderText from "@App/components/layout/accentHeaderText";
import BellSvg from "@App/components/svgs/bellSvg";
import useSite from "@App/hooks/useSite";
import GeneralMessageModal from "@App/components/modals/generalMessageModal";
import BasicSubmitBtn from "@App/components/buttons/basicSubmitBtn";
import BackgroundImage from "@App/components/images/backgroundImage";
import NavPaddingLayout from "@App/components/layoutTemplates/navPaddingLayout";
import RedWreathSvg from "@App/components/svgs/redWreathSvg";
import { siteLoginUrls } from "@App/lib/wp/site";
import { getStaticPageMeta, navStyles } from "@App/utils/pageUtils";
import { consoleHelper } from "@App/utils/windowUtils";
import { spinnerColors } from "@App/components/spinners/spinnerColors";
import LinkCard from "@App/components/cards/linkCard";


const page = getStaticPageMeta({
  title: `Tuesday Makers: Login`,
  desc: 'First to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!',
  slug: `tuesday-makers/login`
})
// export let meta = mdxPageMetaV2

export let loader: LoaderFunction = async ({ request }) => {
  const user = await getResourceUser(request)

  if (user) {
    return redirect('/tuesday-makers/members')
  }
  return json({ page })
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
  let honeyPot = form.get('password')
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next! 
  if (
    typeof email !== "string" ||
    typeof honeyPot !== "string" ||
    honeyPot.length !== 0
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

function useOldTuesdayMakersPassword(formRef: MutableRefObject<HTMLFormElement | null>) {

  const { openModal, closeModal } = useSite()
  const [inputVaue, setInputValue] = useState<null | string>(null)
  const usedOldPassword = false

  useEffect(() => {
    if (inputVaue === 'TUESDAYHUSTLERS') {

      openModal({
        template: <GeneralMessageModal
          closeModal={closeModal}
          header={'No More Passwords'}
          message={'Please use your email associated with Every-Tuesday. If you don\'t have one, create a new account. If you need help please email us.'}
        />
      })

      if (formRef.current) {
        const searchInput: HTMLInputElement = Array.from(formRef.current.elements)
          .find((input: any) => input.type === 'email') as HTMLInputElement

        searchInput.blur();
        formRef.current.reset()
      }

    }
  }, [inputVaue, formRef, openModal, closeModal])

  return {
    usedOldPassword,
    inputVaue,
    setInputValue
  }

}

const ResourceLibraryLogin = () => {
  let actionData = useActionData<ActionData | undefined>();
  const transition = useTransition()
  // const { openModal, closeModal } = useSite()
  // const [inputVaue, setInputValue] = useState<null | string>(null)
  // const [usedOldPassword, setUsedOldPassword] = useState(false)
  const formRef = useRef<null | HTMLFormElement>(null)
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { value } = e.target;
    setInputValue(value)
  }
  consoleHelper('actionData', actionData, 'tuesdayMakers/login.tsx')

  const { inputVaue, usedOldPassword, setInputValue } = useOldTuesdayMakersPassword(formRef)

  return (
    <section className={`relative z-2 grid grid-flow-row row-auto bg-cream-100 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop`}>

      {/* RIGHT */}
      <div className={`${navStyles} relative row-start-2 col-span-full bg-emerald-700 z-3 laptop:col-start-7 laptop:row-start-1 laptop:h-full laptop:flex laptop:items-end `}>

        <div className="p-4 px-6 pt-0 pb-20 laptop:w-full laptop:px-12 laptop:pt-20 laptop:pb-20 desktop:pt-12 ">

          <div className="flex flex-col gap-8 mx-auto text-white tablet:col-start-3 tablet:col-span-10 laptop:ml-0 laptop:flex-col laptop:gap-0 laptop:max-w-[650px] desktop:max-w-[650px]">

            {/* NO PASSWORDS */}
            <div className="flex-1 tablet:flex-[1_0_50%] tablet:max-w-[500px] laptop:max-w-none">
              <div className="mb-4 text-4xl font-sentinel__SemiBoldItal tablet:text-4xl laptop:text-5xl">
                No More Passwords!
              </div>

              <p className="text-lg tablet:text-base laptop:text-xl">
                A password is no longer required to log into the Resource Library. Instead, just use your email associated with Every-Tuesday.
              </p>
            </div>

            {/* ALT LOGIN */}
            <div className="laptop:mt-16 laptop:flex laptop:flex-col desktop:ml-0">
              <p className="mb-8 text-lg laptop:text-base font-sentinel__SemiBoldItal">
                Looking for another login?
              </p>

              {/* LINKS */}
              <div className="grid grid-cols-1 gap-10 max-w-[621px] tablet:grid-cols-2">

                {/* COURSES */}
                <LinkCard
                  title={'Teach:able'}
                  subTitle={'Your Courses'}
                  desciption={'Access the courses you’re currently enrolled in'}
                  link={{
                    url: siteLoginUrls.teachable,
                    text: 'Login'
                  }}
                />

                {/* GUMROAD */}
                <LinkCard
                  title={'Gumroad'}
                  subTitle={'Your Products'}
                  desciption={'Access the digital products you’re bought'}
                  link={{
                    url: siteLoginUrls.gumroad,
                    text: 'Login'
                  }}
                />
              </div>
            </div>

          </div>
        </div>

      </div>


      {/* LEFT */}
      <div className={`${navStyles} col-span-2 col-start-2 tablet:col-start-4 tablet:col-span-8 laptop:col-start-2 laptop:col-span-5 laptop:row-start-1 desktop:col-start-2 desktop:col-span-5 desktop:mr-0 `}>

        <div className="relative px-3 py-12 tablet:py-12 tablet:pb-16 tablet:px-12 laptop:px-6 laptop:pb-20 laptop:pt-12 max-w-[448px] w-full mx-auto rounded-lg">

          <div className="laptop:w-[125px] laptop:h-[125px] bg-tangerine-50 mx-auto"></div>

          <div className="relative flex flex-col items-center z-3">

            <div className="flex flex-col w-full text-center">
              <h1 className="relative flex flex-col text-3xl laptop:text-4xl text-sage-700 font-sentinel__SemiBoldItal">
                {/* <span className="mb-4 text-[44px] laptop:text-[54px] italic font-light font-bonVivant">Tuesday Makers</span> */}
                Tuesday Makers Login
              </h1>
              <p className="pt-1 pb-4 text-lg">The ultimate resource library for procreate.</p>
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
                  className="mt-3 overflow-hidden text-red-800 bg-red-200 rounded-xl">
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

            {/*Invalid Email type SUBMISSION*/}
            {/* @ts-ignore */}
            <AnimatePresence>
              {actionData?.fieldErrors && transition.state === 'idle' &&
                <motion.div
                  key={'fieldError'}
                  id="fieldError"
                  initial={containerMotion.closed}
                  animate={containerMotion.open}
                  exit={containerMotion.closed}
                  className="mt-3 overflow-hidden text-red-800 bg-red-200 rounded-xl">
                  <div className="flex flex-row items-center justify-center p-3 ">
                    <div className="max-w-[24px] w-full mr-2">
                      <XCircleIcon fill={'#7F1D1D'} />
                    </div>
                    <p>
                      {actionData?.fieldErrors?.email}
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
                  className="mt-2 mb-5 bg-white ring ring-offset-0 ring-offset-cream-100 ring-grey-300 hover:ring-blue-300 hover:ring-offset-4 focus:ring-blue-300 focus:ring-offset-4 input-field-xl"
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

                {/* HONEYPOT */}
                <label className="inpot" htmlFor="password"></label>
                <input
                  tabIndex={-1}
                  className="inpot"
                  autoComplete="off"
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Enter Password" />

                <BasicSubmitBtn
                  loading={(transition.state !== 'idle' && !!inputVaue) || usedOldPassword}
                  loadingText={'Loading'}
                  text={'Sign In'}
                  spinnerColors={spinnerColors.sageSolid}
                  className="btn btn-secondary btn-xl btn-secondary-ring ring-offset-cream-100"
                />

              </Form>
            </div>

            <div className="w-full z-[1] relative flex flex-col items-center justify-center text-center">
              <div className="italic">
                {/* <span className="z-[1] absolute top-[50%] translate-y-[-50%] h-[1px] bg-black w-full left-0" /> */}
                <div className="p-4 bg-cream-100 relative z-[2]">Don’t have an account?</div>
              </div>
            </div>

            <div className="flex flex-row relative z-[2] w-full">
              <Link
                prefetch={'intent'}
                className="btn btn-outline btn-flex btn-xl-ring"
                to="/tuesday-makers">
                Sign Up For Free
              </Link>
            </div>

            {/* HAVING ISSUES */}
            {/* <p className="mt-4">
            Having issues?
          </p>
          <p className="">
            <Link className="font-bold underline underline-offset-4" to={'/contact'} prefetch={'intent'}>Contact us for help</Link>.
          </p> */}

          </div>
        </div>

      </div>
      {/* FORM */}


      {/* ALERT */}
      {/* <div className="col-span-2 col-start-2 my-4 tablet:mb-8 tablet:col-start-3 tablet:col-span-10 laptop:my-0 laptop:col-start-2 laptop:col-span-6 laptop:row-start-1 desktop:col-start-3 desktop:col-span-5 desktop:mr-10">
        <div className="bg-sage-200 p-4 max-w-[725px] mx-auto tablet:p-8 ">
          <div className="flex flex-col items-start justify-center my-4 tablet:mx-4">

            <div>
              <div className="mb-4 text-3xl text-center text-sage-800 font-sentinel__SemiBoldItal tablet:mb-8">
                No more passwords!
              </div>

              <p className="text-lg tablet:text-xl">
                A password is no longer required to log into the Resource Library. Instead, just use your email associated with Every Tuesday.
              </p>
            </div>

            <div className="flex flex-col mt-4">

              <ul className="ml-4 text-lg">
                <li className="mb-4 list-disc">
                  If you don’t have an active email account with Every Tuesday, you’ll need to <Link to={"/tuesday-makers"} className="font-semibold underline text-sage-800">
                    Sign up for free
                  </Link>.
                </li>

                <li className="mb-4 list-disc last:mb-0">
                  Still having issues? <Link to={"/contact"} className="font-semibold underline text-sage-800">
                    Contact us for help
                  </Link>!
                </li>
              </ul>

            </div>

          </div>
        </div>
      </div> */}

    </section>
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

