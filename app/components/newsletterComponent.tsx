import React from 'react'
import { Form } from 'remix'

const NewsletterComponent = () => {
  return (
    <div>
      <Form method="post" action="/newsletter">
        <label htmlFor="email-input" className="leading-7 text-sm text-gray-600">
          Email:
          <input
            id="email-input"
            type="email"
            className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name="email"
          />
        </label>
        <button
          type='submit'
          className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Sign Up
        </button>
      </Form>
    </div>
  )
}

export default NewsletterComponent
