
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
  const urlTags = `https://api.convertkit.com/v3/subscribers/${userId}/tags?api_secret=${process.env.CK_SECRET}`;

  const resTag = await fetch(urlTags, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const tagResults = await resTag.json()
  const user = {
    id: userId,
    tags: tagResults.tags.map((tag: { id: string, name: string, created_at: string }) => tag.name)
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

  return (
    <div className='bg-[#F7F6F7] grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>

      <div className="col-span-2 col-start-2 px-3 py-16 my-16 bg-white shadow-et_2_lg tablet:px-12 tablet:col-start-4 tablet:col-span-8 laptop:col-start-5 laptop:col-span-6 max-w-[525px] w-full mx-auto rounded-lg">
        <div className="flex flex-col items-center pt-8">

          <div className="flex flex-col items-center mb-8 text-center">
            <h1 className="mb-4 text-5xl text-sage-700 font-sentinel__SemiBoldItal">
              Welcome back!
            </h1>
            <h2 className="text-lg text-grey-500">Login to the Tuesday Tribe to access over 200+ design assets.</h2>

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
            <Form method='post' className="flex flex-col" aria-describedby={
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
              />

              {/*ERROR EMAIL*/}
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
                className="btn btn-sage-600">
                {transition.state === 'idle' ? 'Sign In' : '...Loading'}
              </button>

            </Form>
          </div>

          <div className="w-full z-[1] relative flex flex-col items-center justify-center text-center">
            <div className="italic">
              <span className="z-[1] absolute top-[50%] translate-y-[-50%] h-[1px] bg-black w-full left-0" />
              <div className="p-4 bg-white relative z-[2]">Don???t have an account?</div>
            </div>
          </div>

          <div className="flex flex-row relative z-[2] mb-8 w-full">
            <Link
              prefetch={'intent'}
              className="btn btn-outline"
              to="/tuesday-makers">
              Sign Up
            </Link>
          </div>

          <div className={'text-center'}>
            <h3 className={'font-semibold'}>Having trouble?</h3>
            <p className={'text-sm'}><Link prefetch={'intent'} to="/contact" className={'font-semibold underline underline-offset-4 text-primary-500'}>Contact Us</Link></p>
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