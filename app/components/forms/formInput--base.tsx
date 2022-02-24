import React from 'react'

interface Props {
  id: string
  type: string
  placeholder?: string
  actionDataError: boolean | undefined
}

function FormInputBasic(props: Props) {
  const { placeholder, id, type, actionDataError } = props

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="mb-4 w-full bg-neutral-200 rounded-lg border border-neutral-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
      name="email"
      aria-invalid={actionDataError}
      aria-describedby={
        actionDataError
          ? `${type}-error`
          : undefined
      }
    />
  )
}

export default FormInputBasic
