import { Form, useActionData, useTransition } from '@remix-run/react';
import InputBase from '../input/inputBase';

interface Props { }

function ContactUsForm(props: Props) {
  const { } = props
  let actionData = useActionData<ContactActionData | undefined>();
  const transition = useTransition()

  return (
    <Form method='post' className="flex flex-col" aria-describedby={
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
            actionData?.fieldErrors?.message
              ? `message-error`
              : undefined
          }
        />
      </label>


      <div className='mt-2'>
        <button
          disabled={transition.state !== 'idle'}
          aria-disabled={transition.state !== 'idle'}
          type='submit'
          className="btn btn-sage-600">
          {transition.state === 'idle' ? 'Submit' : '...Sending'}
        </button>
      </div>

    </Form>
  )
}

export default ContactUsForm
