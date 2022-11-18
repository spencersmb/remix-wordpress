import useSite from '@App/hooks/useSite';
import { Form, useActionData, useTransition } from '@remix-run/react'
import { AnimatePresence } from 'framer-motion';
import InputBase from '../forms/input/inputBase';
import FormErrorMessage from '../forms/messages/ErrorMessage';

interface Props {
  params: {
    id: string | undefined
    postType: string | null
    url: URL
  }
}
type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    username: string;
    password: string;
  };
};
function AdminLoginTemplate(props: Props) {
  const { params } = props
  const { state: { user } } = useSite()
  let actionData = useActionData<ActionData | undefined>();
  let transition = useTransition();
  let action = params.postType ? `/login?postType=${params.postType}&postId=${params.id}` : '/login'
  const backendUrl = process.env.NODE_ENV === 'production' ? 'https://api.every-tuesday.com/wp-admin' : 'https://etheadless.local/wp-admin/'

  return (
    <div className='bg-[#F7F6F7] grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>
      <div className="col-span-2 col-start-2 px-3 py-16 my-16 bg-white shadow-et_2_lg tablet:px-12 tablet:col-start-4 tablet:col-span-8 laptop:col-start-5 laptop:col-span-6 max-w-[525px] w-full mx-auto rounded-lg">
        <div className="flex flex-col items-center pt-8">

          <div className="flex flex-col items-center mb-8 text-center">
            <h1 className="mb-4 text-5xl text-sage-700 font-sentinel__SemiBoldItal">
              {user.wpAdmin ? 'Welcome back, Teela' : 'Admin Login '}
            </h1>
          </div>

          {/*ERROR SUBMISSION*/}
          {/* @ts-ignore */}
          <AnimatePresence>
            {actionData?.formError && transition.state === 'idle' &&
              <FormErrorMessage
                id={'subscriberError'}
                message={actionData.formError || ''} />
            }
            {actionData?.fieldErrors?.password && transition.state === 'idle' &&
              <FormErrorMessage
                id={'passwordError'}
                message={actionData?.fieldErrors.password} />
            }
          </AnimatePresence>

          {/*LOGIN FORM*/}
          {!user.wpAdmin && <div className="login_form relative z-[2] mt-2 w-full">
            <Form method='post'
              action={action}
              aria-disabled={transition.state !== 'idle'}
              className="flex flex-col"
              aria-describedby={
                actionData?.fieldErrors?.username || actionData?.fieldErrors?.password
                  ? "form-error-message"
                  : undefined
              }>

              <InputBase
                type="text"
                id="username-input"
                name="username"
                label="Username"
                labelCss="text-sm text-grey-600 font-semibold"
                className="mt-2 mb-5 bg-grey-100"
                defaultValue={actionData?.fields?.username}
                invalid={Boolean(
                  actionData?.fields?.username
                ) || undefined}
                required={true}
                placeholder='Username'
              />

              {/* HONEYPOT */}
              <label className="inpot" htmlFor="email"></label>
              <input
                tabIndex={-1}
                className="inpot"
                autoComplete="off"
                type="text"
                id="email"
                name="email"
                placeholder="Enter Email" />

              <InputBase
                name="password"
                id="password-input"
                type="password"
                label="Password"
                labelCss="text-sm text-grey-600 font-semibold"
                className="mt-2 mb-5 bg-grey-100"
                invalid={Boolean(
                  actionData?.fieldErrors?.password
                ) || undefined}
                required={true}
                placeholder='Password'
              />

              <button
                disabled={transition.state !== 'idle'}
                aria-disabled={transition.state !== 'idle'}
                type='submit'
                className="mt-2 btn btn-primary btn-lg btn-flex btn-primary-ring">
                {transition.state === 'idle' ? 'Log In' : '...Loading'}
              </button>
            </Form>
          </div>}

          {user.wpAdmin && <div className='flex flex-row'>
            <div className='mr-2'>
              <a
                rel='noopener noreferrer'
                href={backendUrl}
                className='btn btn-outline'
                target={'_blank'}>
                Visit CMS
              </a>
            </div>
            <div className='ml-2'>
              <form action="/logout" method="post">
                <button type="submit" className="btn btn-sage-600">
                  Logout
                </button>
              </form>
            </div>
          </div>}


        </div>
      </div>
    </div>
  )
}

export default AdminLoginTemplate
