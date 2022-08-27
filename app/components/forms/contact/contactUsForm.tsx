import BasicSubmitBtn from '@App/components/buttons/basicSubmitBtn';
import useRemixFormReset from '@App/hooks/useRemixFormReset';
import { XCircleIcon } from '@heroicons/react/solid';
import { Form, useActionData, useTransition } from '@remix-run/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import InputBase from '../input/inputBase';
import FormErrorMessage from '../messages/ErrorMessage';
import FormSuccessMessage from '../messages/SuccessMessage';

interface Props { }

function ContactUsForm(props: Props) {
  let actionData = useActionData<ContactActionData | undefined>();
  const transition = useTransition()
  const formRef = useRef(null);

  useRemixFormReset({
    completed: actionData?.sendEmail?.sent
  }, formRef.current);

  return (
    <Form ref={formRef} method='post' className="flex flex-col" aria-describedby={
      actionData?.formError
        ? "form-error-message"
        : undefined
    }>

      {/*ERROR SUBMISSION*/}
      {/* @ts-ignore */}
      <AnimatePresence>
        {actionData?.formError && transition.state === 'idle' &&
          <FormErrorMessage
            className='mb-4'
            message={actionData.formError}
            id={'subscriberError'} />
        }
      </AnimatePresence>


      {/*FAILED SUBMISSION*/}
      {/* @ts-ignore */}
      <AnimatePresence>
        {actionData?.sendEmail?.sent === false && transition.state === 'idle' &&
          <FormErrorMessage
            className='mb-4'
            message={actionData?.sendEmail?.message}
            id={'sendEmailError'} />}
      </AnimatePresence>

      {/*SUCCESS MESSAGE*/}
      {/* @ts-ignore */}
      <AnimatePresence>
        {actionData?.sendEmail?.sent && transition.state === 'idle' &&
          <FormSuccessMessage
            className='mb-4'
            message={'Your message has been sent!'}
            id={'subscriberError'} />
        }
      </AnimatePresence>

      <InputBase
        label="First Name"
        labelCss="text-sm text-grey-600 font-semibold"
        className="mt-2 mb-5 bg-grey-100"
        invalid={Boolean(
          actionData?.fieldErrors?.name
        ) || undefined}
        id='name-input'
        name='name'
        type='text'
        required={true}
        placeholder='First name'
      />

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
        placeholder='Email'
      />

      <InputBase
        label="Subject"
        labelCss="text-sm text-grey-600 font-semibold"
        className="mt-2 mb-5 bg-grey-100"
        invalid={Boolean(
          actionData?.fieldErrors?.subject
        ) || undefined}
        id='subject-input'
        name='subject'
        type='text'
        required={true}
        placeholder='Title'
      />

      {/* HONEYPOT */}
      <label className="inpot" htmlFor="lastName"></label>
      <input
        tabIndex={-1}
        className="inpot"
        autoComplete="off"
        type="text"
        id="lastName"
        name="lastName"
        placeholder="Your last name here" />

      {/* MESSAGE BODY */}
      <label htmlFor={'message'}>
        <span className="text-sm font-semibold text-grey-600">Message</span>
        <textarea
          className="w-full px-5 py-4 mt-2 text-base duration-200 ease-in-out transform rounded-lg outline-none bg-grey-100 text-primary-700 hover:ring focus:ring ring-offset-4 focus:ring-primary-300"
          rows={4}
          id='message-input'
          name='message'
          required={true}
          placeholder='...Add message'
          aria-describedby={
            actionData?.fieldErrors?.body
              ? `body-error`
              : undefined
          }
        />
      </label>

      {/* SUBMIT BUTTON */}
      <div className='flex flex-row items-center'>

        {/* @ts-ignore */}
        <AnimatePresence>

          {!actionData?.sendEmail?.sent && (
            <motion.div
              className="flex w-full "
              key={'email-message'}
              initial={buttonVarients.initial}
              animate={buttonVarients.animate}
              exit={buttonVarients.exit}
            >
              <BasicSubmitBtn
                key={'email-btn'}
                loading={transition.state !== 'idle' && transition.state === 'submitting'}
                className="max-w-[126px] mt-7 btn-flex ml-auto"
                text={'Send'}
                loadingText={'Sending...'}
              />
              {/* <button
                key={'email-btn'}
                disabled={transition.state !== 'idle'}
                aria-disabled={transition.state !== 'idle'}
                type='submit'
                className="btn btn-sage-600 max-w-[86px] mt-7" >
                {transition.state === 'idle' ? 'Submit' : '...Sending'}
              </button> */}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </Form>
  )
}

export default ContactUsForm
const buttonVarients = {
  initial: {
    opacity: 1,
    height: 'auto',
  },
  animate: {
    opacity: 1,
    height: 'auto',
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: 'hidden',
    transition: {
      height: {
        delay: .2
      }
    }
  }
}
const messageVarients = {
  initial: {
    height: 0
  },
  animate: {
    height: 'auto',
    transition: {
      height: {
        delay: .2
      }
    }
  },
  exit: {
    height: 0
  }
}

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