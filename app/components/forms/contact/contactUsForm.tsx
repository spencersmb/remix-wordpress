import useRemixFormReset from '@App/hooks/useRemixFormReset';
import { Form, useActionData, useTransition } from '@remix-run/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import InputBase from '../input/inputBase';

interface Props { }

function ContactUsForm(props: Props) {
  let actionData = useActionData<ContactActionData | undefined>();
  const transition = useTransition()
  const formRef = useRef(null);
  console.log('transition', transition);

  useRemixFormReset({
    completed: actionData?.sendEmail?.sent
  }, formRef.current);

  return (
    <Form ref={formRef} method='post' className="flex flex-col" aria-describedby={
      actionData?.formError
        ? "form-error-message"
        : undefined
    }>

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

      <label htmlFor={'message'}>
        <span className="text-sm font-semibold text-grey-600">Message</span>
        <textarea
          className="w-full px-5 py-4 mt-2 mb-5 text-base duration-200 ease-in-out transform rounded-lg outline-none bg-grey-100 text-primary-700 hover:ring focus:ring ring-offset-4 focus:ring-primary-300"
          rows={6}
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

      <div className='mt-2'>

        {/* @ts-ignore */}
        <AnimatePresence>

          {!actionData?.sendEmail?.sent && (
            <motion.div
              className="overflow-hidden"
              initial={buttonVarients.initial}
              animate={buttonVarients.animate}
              exit={buttonVarients.exit}
            >
              <button
                key={'email-btn'}
                disabled={transition.state !== 'idle'}
                aria-disabled={transition.state !== 'idle'}
                type='submit'
                className="m-2 btn btn-sage-600">
                {transition.state === 'idle' ? 'Submit' : '...Sending'}
              </button>
            </motion.div>
          )}


          {actionData?.sendEmail?.sent && (
            <motion.div
              className="overflow-hidden"
              key={'email-message'}
              initial={messageVarients.initial}
              animate={messageVarients.animate}
              exit={messageVarients.exit}
            >
              <p className="text-lg text-center text-sage-600 font-sentinel__SemiBoldItal">
                Message sent!
              </p>
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
    height: 'auto'
  },
  animate: {
    height: 'auto'
  },
  exit: {
    height: 0
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